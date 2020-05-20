import {
  put, call, takeLatest
} from 'redux-saga/effects';
import { apiGet } from '../../api/apiRest/primary';
import { GET_CATEGORY, EVENT_CATEGORY } from '../../actions/post/constants';

function* getCategories() {
  const response = (yield call(
    apiGet,
    '/posts-categories',
    {},
    [],
    [{ relation: 'subCategories' }]
  ));
  yield put({ type: EVENT_CATEGORY, response });
}

export default function* rootSaga() {
  yield takeLatest(GET_CATEGORY, function* test() {
    yield call(getCategories);
  });
}
