import {
  put, call, takeLatest, delay
} from 'redux-saga/effects';
import {
  GET_GAZETTE_CATEGORIES,
  SET_GAZETTE_CATEGORIES,
  GET_GAZETTE_POSTS,
  SET_GAZETTE_POSTS
} from '../../actions/actionConstants';

const categories = [
  {
    title: 'Comerciantes',
    description: 'Incluyendo mercados y locales comerciales',
    icon: 'money'
  },
  {
    title: 'Transporte',
    description: 'Urbano y departamental',
    icon: 'assignment'
  },
  { title: 'Propiedades', description: 'Alcance urbano', icon: 'gavel' }
];

const gazettePosts = [
  {
    avatar:
      'https://www.clipartwiki.com/clipimg/detail/135-1352353_avatar-profile-png-icon-gamer-avatar-png.png',
    nameAuthor: 'Fabyaspy Miranda',
    datePost: '23/10/2019',
    imagePost: 'https://www.eabolivia.com/images/stories/lp/minoristas.jpg',
    contentPost:
      'Ley contra el delito y la inmigracion, ademas que cubre otros puntos',
    likesPost: 12,
    disLikesPost: 7,
    sharesPost: 24,
    commentsPost: 2,
    id: 'ffasd8ads9fadsfa719',
    file: 'let1.pdf'
  },
  {
    avatar:
      'https://www.clipartwiki.com/clipimg/detail/135-1352353_avatar-profile-png-icon-gamer-avatar-png.png',
    nameAuthor: 'Adrian Torrez Miranda',
    datePost: '20/10/2019',
    imagePost: 'https://www.eabolivia.com/images/stories/lp/minoristas.jpg',
    contentPost: 'Lorem Ipsum de textos especimen.',
    likesPost: 12,
    disLikesPost: 7,
    sharesPost: 24,
    commentsPost: 13,
    id: 'ffasd8ads9fadsfa719',
    file: 'let1.pdf'
  },
  {
    avatar:
      'https://www.clipartwiki.com/clipimg/detail/135-1352353_avatar-profile-png-icon-gamer-avatar-png.png',
    nameAuthor: 'Diego',
    datePost: '28/11/2018',
    imagePost: 'https://www.eabolivia.com/images/stories/lp/minoristas.jpg',
    contentPost: 'Titulo de la ley',
    likesPost: 122,
    disLikesPost: 7,
    sharesPost: 24,
    commentsPost: 22,
    id: 'ffasd8ads9fadsfa719',
    file: 'let1.pdf'
  },
  {
    avatar:
      'https://www.clipartwiki.com/clipimg/detail/135-1352353_avatar-profile-png-icon-gamer-avatar-png.png',
    nameAuthor: 'Diego',
    datePost: '22/04/2018',
    imagePost: 'https://www.eabolivia.com/images/stories/lp/minoristas.jpg',
    contentPost: 'Titulo de la ley',
    likesPost: 122,
    disLikesPost: 7,
    sharesPost: 24,
    commentsPost: 22,
    id: 'ffasd8ads9fadsfa719',
    file: 'let1.pdf'
  },
  {
    avatar:
      'https://www.clipartwiki.com/clipimg/detail/135-1352353_avatar-profile-png-icon-gamer-avatar-png.png',
    nameAuthor: 'Diego',
    datePost: '22/05/2018',
    imagePost: 'https://www.eabolivia.com/images/stories/lp/minoristas.jpg',
    contentPost: 'Titulo de la ley',
    likesPost: 122,
    disLikesPost: 7,
    sharesPost: 24,
    commentsPost: 22,
    id: 'ffasd8ads9fadsfa719',
    file: 'let1.pdf'
  },
  {
    avatar:
      'https://www.clipartwiki.com/clipimg/detail/135-1352353_avatar-profile-png-icon-gamer-avatar-png.png',
    nameAuthor: 'Diego',
    datePost: '22/11/2015',
    imagePost: 'https://www.eabolivia.com/images/stories/lp/minoristas.jpg',
    contentPost: 'Titulo de la ley',
    likesPost: 122,
    disLikesPost: 7,
    sharesPost: 24,
    commentsPost: 22,
    id: 'ffasd8ads9fadsfa719',
    file: 'let1.pdf'
  },
  {
    avatar:
      'https://www.clipartwiki.com/clipimg/detail/135-1352353_avatar-profile-png-icon-gamer-avatar-png.png',
    nameAuthor: 'Diego',
    datePost: '22/11/2017',
    imagePost: 'https://www.eabolivia.com/images/stories/lp/minoristas.jpg',
    contentPost: 'Titulo de la ley',
    likesPost: 122,
    disLikesPost: 7,
    sharesPost: 24,
    commentsPost: 22,
    id: 'ffasd8ads9fadsfa719',
    file: 'let1.pdf'
  }
];

function* getCategories(municipalityId) {
  console.warn('Gazette saga enviando: ', municipalityId, categories);

  yield delay(1000);
  yield put({ type: SET_GAZETTE_CATEGORIES, categories });
}
function* getGazettePosts(municipalityId) {
  console.warn('Gazette saga enviando: ', municipalityId, categories);

  yield delay(1000);
  yield put({ type: SET_GAZETTE_POSTS, gazettePosts });
}

export default function* rootSaga() {
  yield takeLatest(GET_GAZETTE_CATEGORIES, function* test(param) {
    yield call(getCategories, param.value);
  });
  yield takeLatest(GET_GAZETTE_POSTS, function* test(param) {
    yield call(getGazettePosts, param.value);
  });
}
