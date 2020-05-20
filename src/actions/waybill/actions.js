import { WAYBILL_REQUEST, WAYBILL_EXISTING } from './constasts';

export const waybillRequest = (waybill) => ({
  type: WAYBILL_REQUEST,
  waybill
});

export const existWaybill = (id) => ({
  type: WAYBILL_EXISTING,
  id
});
