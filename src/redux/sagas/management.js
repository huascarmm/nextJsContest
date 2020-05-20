/* eslint-disable no-extra-boolean-cast */
import { takeLatest, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import {
  ON_INIT, ROLE_REQUESTING, SAVE_ROLES, LIST_HIERARCHY, LIST_MUNICIPAL_DEPARTMENT, LIST_USER, SAVE_HIERARCHIES, SAVE_GUIDE_TASKS, ON_GENERATE_LINK_INVITED, ON_FINISH
} from '../../actions/management/constants';
import UserApi from '../../api/services/user.service';
import ProfileApi from '../../api/services/profile.service';
import RoleApi from '../../api/services/role.service';
import HierarchyApi from '../../api/services/hierarchy.service';
import UserHierarchyApi from '../../api/services/user.hierarchy.service';
import MunicipalDepartmentApi from '../../api/services/municipal.department.service';
import FileStorageGuideTasksApi from '../../api/services/file.storage.guide.tasks.service';
import FileStorageApi from '../../api/services/file.storage.service';
import GuideTasksApi from '../../api/services/guide.tasks.service';
import AccessTokenApi from '../../api/services/access.token.service';
import jsonSchemaFileds from '../../utils/field.exclude.default';

function prepareObject(data) {
  const addAttributes = {};
  let hierarchies = [];
  if (data.userHierarchies !== undefined) {
    hierarchies = data.userHierarchies.map(item => item.hierarchy);
  }
  Object.assign(addAttributes, { hierarchies });
  const roles = {
    UserRRHH: false,
    PostsNews: false,
    PostsGazette: false,
    PostsFinances: false,
    PostsPoa: false,
    PostsProjects: false,
    Waybill: false,
  };
  if (data.userRols !== undefined) {
    data.userRols.forEach(item => {
      if (Boolean(item.roles.title.match(/UserRRHH/))) {
        Object.assign(roles, { UserRRHH: true });
      } else if (Boolean(item.roles.title.match(/PostsNews/))) {
        Object.assign(roles, { PostsNews: true });
      } else if (Boolean(item.roles.title.match(/PostsGazette/))) {
        Object.assign(roles, { PostsGazette: true });
      } else if (Boolean(item.roles.title.match(/PostsFinances/))) {
        Object.assign(roles, { PostsFinances: true });
      } else if (Boolean(item.roles.title.match(/PostsPoa/))) {
        Object.assign(roles, { PostsPoa: true });
      } else if (Boolean(item.roles.title.match(/PostsProjects/))) {
        Object.assign(roles, { PostsProjects: true });
      } else if (Boolean(item.roles.title.match(/Waybill/))) {
        Object.assign(roles, { Waybill: true });
      }
    });
  }
  Object.assign(addAttributes, { roles });
  return addAttributes;
}


function* onInit() {
  try {
    const filter = {
      fields: jsonSchemaFileds(['password']),
      include: [{
        relation: 'userRols',
        scope: {
          where: { status: true },
          order: ['lastUpdated DESC'],
          include: [{
            relation: 'roles'
          }]
        }
      }, {
        relation: 'municipalDepartment'
      }, {
        relation: 'userHierarchies',
        scope: {
          include: [{
            relation: 'hierarchy',
            scope: {
              include: [{
                relation: 'guideTasks'
              }]
            }
          }]
        }
      }]
    };
    const responseUser = yield UserApi.find(filter);
    yield responseUser.forEach(async (user) => {
      const avatar = await ProfileApi.getAvatar(user.id);
      Object.assign(user, { avatar });
      const addAttributes = await prepareObject(user);
      Object.assign(user, addAttributes);
      Object.assign(user, {
        new_hierarchies: [],
        new_municipalDepartment: {},
      });
    });
    const responseHierarchy = yield HierarchyApi.find({
      include: [{
        relation: 'guideTasks',
        scope: {
          include: [{
            relation: 'fileStorageGuideTasks'
          }]
        }
      }]
    });
    yield responseHierarchy.forEach(el => {
      Object.assign(el, { filestorage: el.guideTasks.fileStorageGuideTasks });
    });
    const responseMunicipalDepartment = yield MunicipalDepartmentApi.find();

    yield put({ type: LIST_USER, users: responseUser });
    yield put({ type: LIST_HIERARCHY, hierarchies: responseHierarchy });
    yield put({ type: LIST_MUNICIPAL_DEPARTMENT, municipalDepartments: responseMunicipalDepartment });
  } catch (error) {
    console.error(error);
  }
}

function* saveAssignRoles({ userId, optionRoles }) {
  yield put({ type: ROLE_REQUESTING, status: true });
  try {
    yield RoleApi.setAssignRoles(userId, optionRoles);
    yield put({ type: ROLE_REQUESTING, status: true });
    NotificationManager.success('La actualización se realizo con éxito!!!');
  } catch (error) {
    yield put({ type: ROLE_REQUESTING, status: true });
  }
}

function* saveAssignHierarchies({ id, hierarchies, user }) {
  yield UserApi.updateById(id, {
    municipalDepartmentId: user.municipalDepartmentId
  });
  yield hierarchies.map(async el => {
    await UserHierarchyApi.create({
      hierarchyId: el.id,
      userId: id
    });
  });
  NotificationManager.success('La actualización se realizo con exito!!!');
}

function* saveGuideTasks({ form }) {
  const { hierarchy: { parentId, ...hierarchyData }, guideTasks: { fileStorageGuideTasks, ...guideTasksData }, filestorage } = form;
  const formData = new FormData();
  formData.append('image', filestorage.upload);
  try {
    if (hierarchyData.id === undefined) {
      if (parentId !== null) {
        Object.assign(hierarchyData, { parentId });
      }
      yield HierarchyApi.create(hierarchyData);
    } else {
      yield HierarchyApi.updateById(hierarchyData.id, hierarchyData);
    }
    let _guideTasks = {};
    if (guideTasksData.id === undefined) {
      _guideTasks = yield GuideTasksApi.create(guideTasksData);
    } else {
      _guideTasks = yield GuideTasksApi.updateById(guideTasksData.id, guideTasksData);
    }
    if (fileStorageGuideTasks === undefined) {
      const _filestorage = yield FileStorageApi.upload('municipality_guide_tasks', formData);
      yield FileStorageGuideTasksApi.create({
        description: 'guidetasks',
        fileStorageId: _filestorage.id,
        guideTasksId: _guideTasks.id
      });
    }

    NotificationManager.success('La actualización se realizo con éxito!!!');
    yield put({ type: ON_FINISH, finish: true });
  } catch (error) {
    console.log(JSON.parse(JSON.stringify(error)));
    NotificationManager.error('Se produjo un error!');
    yield put({ type: ON_FINISH, finish: false });
  } finally {
    yield put({ type: ON_FINISH, finish: false });
  }
}

function* generateLinkInvited({ request, callback }) {
  yield put({ type: ROLE_REQUESTING, status: true });
  const response = yield AccessTokenApi.create(request);
  const data = yield UserApi.invited(response.token);
  callback(data);
}

export default function* rootSaga() {
  yield takeLatest(ON_INIT, onInit);
  yield takeLatest(ON_GENERATE_LINK_INVITED, generateLinkInvited);
  yield takeLatest(SAVE_ROLES, saveAssignRoles);
  yield takeLatest(SAVE_HIERARCHIES, saveAssignHierarchies);
  yield takeLatest(SAVE_GUIDE_TASKS, saveGuideTasks);
}
