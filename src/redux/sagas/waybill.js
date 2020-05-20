import {
  call, takeLatest, put
} from 'redux-saga/effects';
import WaybillApi from '@api/services/waybill.service';
import { NotificationManager } from 'react-notifications';
import { WAYBILL_REQUEST, WAYBILL_REQUESTING, WAYBILL_SUCCESS } from '../../actions/waybill/constasts';
let instance = false;

function* sendWaybill(form) {
  let waybill = null;
  yield put({ type: WAYBILL_REQUESTING });
  instance = true;
  if (instance) {
    try {
      waybill = yield WaybillApi.create(form);
      instance = false;
    } catch (error) {
      console.log(error);
    } finally {
      console.log(waybill);
      yield put({ type: WAYBILL_SUCCESS });
      NotificationManager.success('Solicitud de tramite exitoso');
    }
  }
}

export default function* rootSaga() {
  yield takeLatest(WAYBILL_REQUEST, function* test(param) {
    yield call(sendWaybill, param.waybill);
  });
}
