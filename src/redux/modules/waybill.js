import { fromJS } from 'immutable';
import { WAYBILL_REQUESTING, WAYBILL_SUCCESS } from '../../actions/waybill/constasts';

const initialState = {
  waybillSending: false,
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case WAYBILL_REQUESTING:
      return state.withMutations(mutableState => {
        mutableState.set('waybillSending', true);
      });
    case WAYBILL_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('waybillSending', false);
      });
    default:
      return state;
  }
}
