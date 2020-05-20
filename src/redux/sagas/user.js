/* eslint-disable no-unused-vars */
import {
  put,
  delay,
  takeLatest,
  cancelled,
  call
} from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { setClientToken } from '../../actions/user/actions';
import UserApi from '../../api/services/user.service';
import UserRolApi from '../../api/services/user.rol.service';
import HierarchyApi from '../../api/services/hierarchy.service';
import GuideTasksApi from '../../api/services/guide.tasks.service';
import ProfileApi from '../../api/services/profile.service';
import history from '../../utils/history';
import ChannelApi from '../../api/services/channel.service';
import UserChannelApi from '../../api/services/user.channel.service';
import FileStorageApi from '../../api/services/file.storage.service';
import ProfileFileStorageApi from '../../api/services/profile.file.storage.service';
import {
  USER_SET,
  LOGOUT,
  USER_REQUEST,
  AUTHENTICATE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  ACTION_CLEAR_PROFILE,
  CLEAR_PROFILE,
  USER_UPDATE_BY_ID,
  USER_ID,
  GET_USER_SETTINGS,
  SET_USER_EDIT,
  SET_PROFILE_EDIT,
  USER_UPDATE_ALL,
  PROFILE_UPDATE_ALL,
  GENERAL_UPDATE,
  LOGIN_REQUESTING,
  USER_AVATAR,
  CHANNEL_USER_CREATE,
  UPDATE_AVATAR,
  GET_USER_PROFILE,
  SET_USER_PROFILE,
  SET_CHANNEL_EDIT,
  LOGIN_ERROR
} from '../../actions/user/constants';
import jsonSchemaFileds from '../../utils/field.exclude.default';
import Storage from '../../utils/storage';
import { ON_ROLES } from '../../actions/login/actions';

let instance = false;

function* authenticate() {
  // if (Storage.getItem('token') !== null) {
  if (false) {
    // const token = Storage.getItem('token');
    try {
      const current = yield UserApi.me();
      const avatar = yield ProfileApi.getAvatar(current.id);
      const filter = {
        where: { username: current.username },
        include: [{
          relation: 'profile'
        }, {
          relation: 'userRols',
          scope: {
            where: { status: true },
            order: ['lastUpdated DESC'],
            include: [{
              relation: 'roles'
            }]
          }
        }]
      };
      const user = yield UserApi.findById(current.id, filter);
      Object.assign(user, { avatar });
      const roles = [];
      if (user.userRols) {
        yield user.userRols.forEach(userRol => {
          roles.push(userRol.roles);
        });
      }
      yield put({ type: USER_SET, user });
      yield put({ type: USER_ID, id: user.id });
      yield put({ type: ON_ROLES, list: roles });
    } catch (error) {
      NotificationManager.warning('Vuelva a iniciar sesión', 'Sesión expirada');
      Storage.removeItem('token');
      yield put(setClientToken(''));
      throw error;
    }
  }
}

function* signin({ user }) {
  if (!instance) {
    instance = true;
    try {
      const data = yield call([UserApi, 'login'], user);
      yield put(setClientToken(data.token));
      // localStorage.setItem('token', data.token);
      // eslint-disable-next-line no-restricted-globals
      // location.href = '/';
      yield put({ type: LOGIN_SUCCESS });
    } catch (error) {
      yield put({ type: LOGIN_ERROR, error: error.message });
      // NotificationManager.error(error.message, 'Se produjo un erro!');
      instance = false;
    }
  }
}

function* logout() {
  // yield localStorage.removeItem('token');
  yield put({ type: USER_SET, user: {} });
  yield put({ type: USER_ID, id: '' });
  yield put(setClientToken(''));
  // window.location = '/';
  // eslint-disable-next-line no-restricted-globals
  // location.href = '/';
}

function* signup({ user, params }) {
  if (!instance) {
    instance = true;
    try {
      yield UserApi.signup(user, params);
      // eslint-disable-next-line no-restricted-globals
      // location.href = '/';
      yield put({ type: LOGIN_SUCCESS });
      instance = false;
    } catch (error) {
      yield put({ type: LOGIN_ERROR, error: error.message });
      // NotificationManager.error(error.message, 'Se produjo un error!');
      instance = false;
    }
  }
}

function* clear() {
  yield put({ type: CLEAR_PROFILE });
}

function* getUserProfile({ username }) {
  try {
    if (username) {
      const user = yield UserApi.getProfile(username);
      const avatar = yield ProfileApi.getAvatar(user.id);
      yield Object.assign(user, { avatar });
      yield put({ type: SET_USER_PROFILE, user });
    }
  } catch (error) {
    if (error) console.error(error);
  }
}

function* updateById({ id, data }) {
  try {
    yield UserApi.updateById(id, data);
    NotificationManager.success('La actualización se realizo con éxito!!!');
  } catch (error) {
    NotificationManager.error('Ocurrió un problema en la actualización!!!');
    if (error) console.log(error);
  }
}

function* getUserSettings({ id }) {
  try {
    const filter = {
      fields: jsonSchemaFileds(['password', 'municipalityId', 'guideTasksId', 'birthday', 'municipalDepartmentId']),
      include: [{
        relation: 'profile',
        scope: {
          fields: jsonSchemaFileds(['guideTasksId'])
        }
      }, {
        relation: 'userChannels',
        scope: {
          include: [{
            relation: 'channel'
          }]
        }
      }]
    };
    const { profile, userChannels, ...user } = yield UserApi.findById(id, filter);

    const channels = {
      listSocialNetworks: [],
      listContacts: []
    };

    if (userChannels) {
      userChannels.forEach(_elem => {
        if (_elem.group === 'Red Social') {
          channels.listSocialNetworks.push(_elem.channel);
        } else if (_elem.group === 'Contacto') {
          channels.listContacts.push(_elem.channel);
        }
      });
    }

    yield put({ type: SET_USER_EDIT, user });
    yield put({ type: SET_PROFILE_EDIT, profile });
    yield put({ type: SET_CHANNEL_EDIT, channels });
  } catch (error) {
    console.log(error);
  }
}

function* updateAll({ data }) {
  yield put({ type: LOGIN_REQUESTING, status: true });
  try {
    yield UserApi.updateById(data.id, data);
    yield put({ type: SET_USER_EDIT, user: data });
    // yield put({ type: USER_SET, user: data });

    yield put({ type: LOGIN_REQUESTING, status: false });
  } catch (error) {
    console.log(error);
    NotificationManager.error('Se produjo un error');
    yield put({ type: LOGIN_REQUESTING, status: false });
  } finally {
    if (cancelled()) {
      NotificationManager.success('Actualización con éxito!');
      yield put({ type: LOGIN_SUCCESS, status: true });
    }
  }
}

function* profileUpdateAl({ data }) {
  yield put({ type: LOGIN_REQUESTING, status: true });
  try {
    yield ProfileApi.updateById(data.id, data);
    yield put({ type: SET_PROFILE_EDIT, profile: data });

    yield put({ type: LOGIN_REQUESTING, status: false });
  } catch (error) {
    console.log(error);
    NotificationManager.error('Se produjo un error');
    yield put({ type: LOGIN_REQUESTING, status: false });
  } finally {
    if (cancelled()) {
      NotificationManager.success('Actualización con éxito!');
      yield put({ type: LOGIN_SUCCESS, status: true });
    }
  }
}

function* generalUpdate({ user, profile }) {
  yield put({ type: LOGIN_REQUESTING, status: true });
  try {
    yield UserApi.updateById(user.id, user);
    yield ProfileApi.updateById(profile.id, profile);

    yield put({ type: LOGIN_REQUESTING, status: false });
    NotificationManager.success('Actualización con éxito!');
    yield put({ type: LOGIN_SUCCESS, status: true });
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN_REQUESTING, status: false });
  }
}

function* userChannel({ userId, data }) {
  const { socialNetworks, contacts } = data;
  const channels = [];
  if (socialNetworks !== undefined) {
    channels.push(...socialNetworks);
  }
  if (contacts !== undefined) {
    channels.push(...contacts);
  }
  yield put({ type: LOGIN_REQUESTING, status: true });
  try {
    yield channels.forEach(async channel => {
      const channelCRUD = await ChannelApi.create(channel);
      const userChannelData = {
        channelId: channelCRUD.id,
        userId
      };
      if (socialNetworks.find(obj => obj === channel)) {
        Object.assign(userChannelData, { group: 'Red Social' });
      } else if (contacts.find(obj => obj === channel)) {
        Object.assign(userChannelData, { group: 'Contacto' });
      }
      await UserChannelApi.create(userChannelData);
    });
    yield delay(500);
    NotificationManager.success('Actualización con éxito!');
  } catch (error) {
    yield put({ type: LOGIN_REQUESTING, status: false });
    NotificationManager.error('Se produjo un error!');
  } finally {
    yield put({ type: LOGIN_REQUESTING, status: false });
  }
}

function* updateAvatar({ userLogin, file }) {
  const formData = new FormData();
  formData.append('image', file);
  yield put({ type: LOGIN_REQUESTING, status: true });
  try {
    const data = yield FileStorageApi.upload('municipality_profiles', formData);
    yield ProfileFileStorageApi.create({
      tag: 'avatar',
      profileId: userLogin.profile.id,
      fileStorageId: data.id
    });
    const link = FileStorageApi.backendApi + [
      'file-storages',
      data.container,
      'download',
      data.name
    ].join('/');
    Object.assign(data, { link });
    const user = Object.assign(userLogin, { avatar: data });
    yield put({ type: USER_SET, user });
    yield put({ type: USER_AVATAR, avatar: user.avatar });
    NotificationManager.success('Se actualizo con exito!');
  } catch (error) {
    yield put({ type: LOGIN_REQUESTING, status: false });
    NotificationManager.error('Se produjo un error!');
  } finally {
    yield put({ type: LOGIN_REQUESTING, status: false });
  }
}

export default function* rootSaga() {
  yield takeLatest(ACTION_CLEAR_PROFILE, clear);
  yield takeLatest(AUTHENTICATE, authenticate);
  yield takeLatest(LOGIN_REQUEST, signin);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(USER_REQUEST, signup);
  yield takeLatest(GET_USER_PROFILE, getUserProfile);
  yield takeLatest(USER_UPDATE_BY_ID, updateById);
  yield takeLatest(GET_USER_SETTINGS, getUserSettings);
  yield takeLatest(USER_UPDATE_ALL, updateAll);
  yield takeLatest(PROFILE_UPDATE_ALL, profileUpdateAl);
  yield takeLatest(GENERAL_UPDATE, generalUpdate);
  yield takeLatest(CHANNEL_USER_CREATE, userChannel);
  yield takeLatest(UPDATE_AVATAR, updateAvatar);
}
