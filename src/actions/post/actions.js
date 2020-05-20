import {
  GET_CATEGORY, POSTS_REQUEST, POSTS_GET, POSTS_GET_BY_ID, GET_POST_TO_VIEW
} from './constants';

export const postsRequest = (posts) => ({
  type: POSTS_REQUEST,
  posts
});

export const getPostsCategories = () => ({
  type: GET_CATEGORY,
});

export const actionsGetPostToShow = (id, params) => ({
  type: GET_POST_TO_VIEW,
  id,
  params
});

export const actionsFind = (filter, param = null) => ({
  type: POSTS_GET,
  filter,
  param
});

export const actionsFindById = (id, filter = null, param = null) => ({
  type: POSTS_GET_BY_ID,
  id,
  filter,
  param
});
