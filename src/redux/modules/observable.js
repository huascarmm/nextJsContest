import { fromJS } from 'immutable';

const initialState = {
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case 'SUBSCRIBE':
      return state.withMutations(mutableState => {
        mutableState.set(action.key, action.subscribe);
      });
    default:
      return state;
  }
}
