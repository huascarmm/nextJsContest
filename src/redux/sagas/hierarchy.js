import {
  put,
  takeLatest,
} from 'redux-saga/effects';

import HierarchyApi from '../../api/services/hierarchy.service';
import ProfileApi from '../../api/services/profile.service';
import { GET_HIERARCHIES_SCHEMA, GET_HIERARCHIES } from '../../actions/hierarchy/constants';

function* prepareObject(parent) {
  yield parent.forEach(async child => {
    const userId = child.userHierarchies[0].user.id;
    const avatar = await ProfileApi.getAvatar(userId);
    Object.assign(child.userHierarchies[0].user, { avatar });
    if (child.hierarchies) {
      await prepareObject(child.hierarchies);
    }
  });
}

function* geHierarchiesSchema() {
  const filter = {
    where: { level: '1' },
    include: [{
      relation: 'hierarchies',
      scope: {
        include: [{
          relation: 'hierarchies',
        }, {
          relation: 'userHierarchies',
          scope: {
            include: [{
              relation: 'user'
            }]
          }
        }]
      }
    }, {
      relation: 'userHierarchies',
      scope: {
        include: [{
          relation: 'user'
        }]
      }
    }]
  };
  const listHierarchy = yield HierarchyApi.find(filter);
  yield prepareObject(listHierarchy);
  yield put({ type: GET_HIERARCHIES, list: listHierarchy });
}

export default function* rootSaga() {
  yield takeLatest(GET_HIERARCHIES_SCHEMA, geHierarchiesSchema);
}
