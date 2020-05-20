import { fromJS } from 'immutable';
import {
  SET_POSTS,
  SET_POST,
  SET_POSTS_SUBCATEGORIES
} from '../../actions/actionConstants';
import {
  EVENT_CATEGORY, EVENT_POSTS, PROFILE_FIND_POSTS, POSTS_REQUESTING, POSTS_SUCCESS
} from '../../actions/post/constants';

const initialState = {
  subCategories: [],
  posts: [],
  postsProfile: [],
  post: [],
  categories: [],
  sending: false,
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case SET_POSTS_SUBCATEGORIES:
      return state.withMutations(mutableState => {
        mutableState.set('subCategories', action.subCategories);
      });
    case SET_POSTS:
      return state.withMutations(mutableState => {
        mutableState.set('posts', action.posts);
      });
    case SET_POST:
      return state.withMutations(mutableState => {
        mutableState.set('post', action.post);
      });
    case EVENT_POSTS:
      return state.withMutations(mutableState => {
        mutableState.set('subCategories', action.subCategories);
      });
    case EVENT_CATEGORY:
      return state.withMutations(mutableState => {
        mutableState.set('categories', action.response);
      });
    case PROFILE_FIND_POSTS:
      return state.withMutations(mutableState => {
        mutableState.set('postsProfile', action.posts);
      });
    case POSTS_REQUESTING:
      return state.withMutations(mutableState => {
        mutableState.set('sending', action.key);
      });
    case POSTS_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('sending', false);
      });
    default:
      return state;
  }
}
