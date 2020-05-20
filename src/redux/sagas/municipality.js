import { put, call, takeLatest } from 'redux-saga/effects';
import {
  SET_MUNICIPALITY,
  MUNICIPALITY_DATA,
  GET_FEATURES,
  SET_FEATURES,
  GET_DEPARTMENTS,
  SET_DEPARTMENTS,
} from '../../actions/actionConstants';
import MunicipalityApi from '../../api/services/municipality.service';
import MunicipalitiesApi from '../../api/services/municipalities.service';

import { apiGet } from '../../api/apiRest/primary';
let cFeatures = 0;
let cDepartments = 0;

function* setMunicipality() {
  const municipality = yield call(
    [MunicipalityApi, 'hostingProgress'],
    window.location.hostname
  );
  yield put({ type: MUNICIPALITY_DATA, value: municipality });
}

function* getFeatures(municipalityId) {
  // const municipality = yield call(
  //   [MunicipalityApi, 'onInit'],
  //   municipalityId
  // );
  if (cFeatures === 0) {
    // lamada a la api
    let features1 = yield call(
      apiGet,
      `/municipalities/${municipalityId}/municipality-features`,
      { status: true },
      { description: true, featureId: true },
      [
        {
          relation: 'feature',
          scope: {
            fields: {
              name: true,
              category: true,
              link: true,
              icon: true,
              id: true,
            },
            where: { status: true },
          },
        },
      ]
    );
    // scheme
    features1 = features1.filter((f1) => f1.feature !== undefined);

    const features = features1.map((e) => ({
      name: e.feature.name,
      category: e.feature.category,
      link: e.feature.link,
      icon: e.feature.icon,
      shortDescription: e.description,
    }));
    // channels
    const channels1 = yield call(
      apiGet,
      `/municipalities/${municipalityId}/municipality-channels`,
      { status: true },
      { channelId: true },
      [
        {
          relation: 'channel',
          scope: {
            fields: {
              id: true,
              type: true,
              content: true,
            },
            where: { status: true },
          },
        },
      ]
    );

    const channels = channels1
      .filter((c) => c.channel !== undefined)
      .map((e) => ({
        type: e.channel.type,
        content: e.channel.content,
      }));
    yield put({ type: SET_FEATURES, features, channels });
  }
  cFeatures += 1;
}

function* getDepartments(municipalityId) {
  if (cDepartments === 0) {
    let departments = yield call(
      apiGet,
      `/municipalities/${municipalityId}/municipal-department-municipalities`,
      {},
      ['municipalDepartmentId'],
      [
        {
          relation: 'municipalDepartment',
          scope: {
            fields: ['id', 'name', 'description', 'icon'],
            where: { status: true },
          },
        },
      ]
    );

    departments = departments.filter(
      (f1) => f1.municipalDepartment !== undefined
    );
    yield put({ type: SET_DEPARTMENTS, departments });
  }
  cDepartments += 1;
}
export default function* rootSaga() {
  yield takeLatest(SET_MUNICIPALITY, setMunicipality);
  yield takeLatest(GET_FEATURES, function* test(param) {
    yield call(getFeatures, param.value);
  });
  yield takeLatest(GET_DEPARTMENTS, function* test(param) {
    yield call(getDepartments, param.value);
  });
  // yield takeLatest(GET_LAST_LAWS, function* test(param) {
  // yield call(getLastLaws, param.value);
  // });
}
