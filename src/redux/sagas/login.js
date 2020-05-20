import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import { GET_RECORD_LOGINS, SET_RECORD_LOGINS } from '../../actions/login/actions';
import LoginApi from '../../api/services/login.service';

function* getRecords({ userId }) {
  const filter = {
    where: { userId },
    order: 'created DESC',
    limit: 20
  };
  try {
    const data = yield LoginApi.find(filter);
    yield put({ type: SET_RECORD_LOGINS, records: data });
  } catch (error) {
    if (error) console.error(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_RECORD_LOGINS, getRecords);
}
