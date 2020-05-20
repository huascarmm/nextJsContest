/* eslint-disable prefer-destructuring */
import { fromJS } from 'immutable';
import { GET_HIERARCHIES } from '../../actions/hierarchy/constants';

const initialState = {
  listHierarchy: []
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_HIERARCHIES:
      return state.withMutations(mutableState => {
        mutableState.set('listHierarchy', action.list);
      });
    default:
      return state;
  }
}
