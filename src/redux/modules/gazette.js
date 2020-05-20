import { fromJS } from 'immutable';
import {
  SET_GAZETTE_CATEGORIES,
  SET_GAZETTE_POSTS
} from '../../actions/actionConstants';

const initialState = {
  categories: [],
  gazettePosts: []
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case SET_GAZETTE_CATEGORIES:
      return state.withMutations(mutableState => {
        mutableState.set('categories', action.categories);
      });
    case SET_GAZETTE_POSTS:
      return state.withMutations(mutableState => {
        mutableState.set('gazettePosts', action.gazettePosts);
      });

    default:
      return state;
  }
}
