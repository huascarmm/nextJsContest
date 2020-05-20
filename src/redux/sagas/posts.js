import {
  put, call, takeLatest, delay, all
} from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import {
  getSubcategories,
  getCompletePost,
  getSinglePost
} from '../../api/apiRest/secondary';
import {
  GET_POSTS,
  SET_POSTS,
  GET_POST,
  SET_POST,
  SET_POSTS_SUBCATEGORIES,
  GET_POSTS_SUBCATEGORIES,
  GET_LAST_LAWS,
  SET_LAST_LAWS,
  GET_LAST_NEWS,
  SET_LAST_NEWS
} from '../../actions/actionConstants';
import PostsApi from '../../api/services/posts.service';
import {
  POSTS_REQUEST,
  POSTS_GET,
  POSTS_GET_BY_ID,
  PROFILE_FIND_POSTS,
  POSTS_REQUESTING,
  GET_POST_TO_VIEW
} from '../../actions/post/constants';
import { apiPost } from '../../api/apiRest/primary';
import PostsCategoriesApi from '../../api/services/posts.categories.service';

let instance = false;

function* filterByType(filter) {
  const { municipalityId, postsCategoryId } = filter;
  switch (filter.filterType) {
    case 'all':
      return yield getCompletePost(municipalityId, postsCategoryId);
    case 'search':
      return yield getCompletePost(municipalityId, postsCategoryId, filter.query);
    case 'categories':
      return yield getCompletePost(
        municipalityId,
        postsCategoryId,
        false,
        filter.subCategory
      );
    default:
      return null;
  }
}

function* filterPosts(filter) {
  let posts = [];
  yield put({ type: SET_POSTS, posts });
  posts = yield call(filterByType, filter);
  yield put({ type: SET_POSTS, posts });
}

function* getCategories(values) {
  let subCategories = [];
  yield put({ type: SET_POSTS_SUBCATEGORIES, subCategories });
  subCategories = yield call(getSubcategories, values.categoryId);
  yield put({ type: SET_POSTS_SUBCATEGORIES, subCategories });
}

function* fileStorageSend(file) {
  const formData = new FormData();
  formData.append('image', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  const filestorage = yield call(
    apiPost,
    '/file-storages/municipality_posts/upload',
    formData,
    config
  );
  return filestorage;
}

function* postFileStorageSend(data) {
  const postFileStorage = yield call(apiPost, '/posts-file-storages', data);
  return postFileStorage;
}

function* fileStorageMap(file) {
  return yield call(fileStorageSend, file);
}

function* postFileStorageMap(data, posts) {
  return yield postFileStorageSend({
    tag: 'gallery',
    postsId: posts.id,
    fileStorageId: data.id
  });
}

function* postsSend(data) {
  yield put({ type: POSTS_REQUESTING, key: true });
  const {
    image, gallery, document, ...posts
  } = data.toJSON();
  if (!instance) {
    instance = true;
    try {
      let imageFormData;
      let pdfFormData;
      let galleryFormData;

      const resp = yield call(apiPost, '/posts', posts);

      /** START SAVING FILES */
      if (image !== undefined) imageFormData = yield fileStorageSend(image);
      if (gallery !== undefined) {
        galleryFormData = yield all(yield gallery.map(fileStorageMap));
      }
      if (document !== undefined) pdfFormData = yield fileStorageSend(document);
      /** END */

      /** START SAVING FILES RELATION */
      if (imageFormData !== undefined) {
        yield postFileStorageSend({
          tag: 'mainImage',
          postsId: resp.id,
          fileStorageId: imageFormData.id
        });
      }
      if (galleryFormData !== undefined) {
        yield postFileStorageSend({
          tag: 'mainImage',
          postsId: resp.id,
          fileStorageId: galleryFormData[0].id
        });
        yield all(
          yield galleryFormData.map(_data => postFileStorageMap(_data, resp))
        );
      }
      if (pdfFormData !== undefined) {
        yield postFileStorageSend({
          tag: 'pdf',
          postsId: resp.id,
          fileStorageId: pdfFormData.id
        });
      }
      /** END */

      yield NotificationManager.success(
        'La Publicación se guardo con éxito',
        'Publicación!'
      );
      yield delay(500);
      yield put({ type: POSTS_REQUESTING, key: false });
      instance = false;
    } catch (error) {
      yield NotificationManager.error(
        'Verifique sus datos',
        'Se produjo un error'
      );
      yield put({ type: POSTS_REQUESTING, key: false });
      instance = false;
      throw error;
    }
  }
}

function* getLastLaws(municipalityId) {
  const response = yield call([PostsCategoriesApi, 'findToPosts'],
    '916c337a-5d75-43f3-b548-7e4da698b82a',
    municipalityId,
  );
  const lastLaws = yield all(response);
  yield put({ type: SET_LAST_LAWS, lastLaws });
}

function* getLastNews(municipalityId) {
  const response = yield call([PostsCategoriesApi, 'findToPosts'],
    'a4b34b57-1696-457f-95b0-6186d32762ab',
    municipalityId,
  );
  const lastNews = yield all(response);
  yield put({ type: SET_LAST_NEWS, lastNews });
}

function* getPost(idPost) {
  const post = (yield call(getSinglePost, idPost))[0];
  yield put({ type: SET_POST, post });
}

function* find(filter, param) {
  const response = yield PostsApi.find(filter, param);
  yield put({ type: PROFILE_FIND_POSTS, posts: response });
}

function* findById(id, filter) {
  const response = yield PostsApi.findById(id, filter);
  yield put({ type: PROFILE_FIND_POSTS, posts: response });
}

// Funciones nuevas
function* sagaGetPostToView({ id, params }) {
  const post = yield call([PostsApi, 'getPostToShow'], id, params);
  yield put({ type: SET_POST, post });
}

export default function* rootSaga() {
  yield takeLatest(GET_POSTS_SUBCATEGORIES, function* test(param) {
    yield call(getCategories, param.value);
  });
  yield takeLatest(GET_POSTS, function* test(param) {
    yield call(filterPosts, param.value);
  });
  yield takeLatest(GET_POST, function* test(param) {
    yield call(getPost, param.value);
  });
  yield takeLatest(GET_LAST_LAWS, function* test(param) {
    yield call(getLastLaws, param.value);
  });
  yield takeLatest(GET_LAST_NEWS, function* test(param) {
    yield call(getLastNews, param.value);
  });
  yield takeLatest(POSTS_REQUEST, function* test(param) {
    yield call(postsSend, param.posts);
  });
  yield takeLatest(POSTS_GET, function* test(param) {
    yield call(find, param.filter, param.param);
  });
  yield takeLatest(POSTS_GET_BY_ID, function* test(param) {
    yield call(findById, param.id, param.filter);
  });
  // Funciones nuevas
  yield takeLatest(GET_POST_TO_VIEW, sagaGetPostToView);
}
