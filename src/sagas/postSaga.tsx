import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_POSTS_HOME, LOAD_MORE_POSTS_HOME } from '../../src/reducers/postReducer';
import REST from '../../src/utils/api';

export function* watchGetPosts() {
  yield takeLatest('WATCH_GET_POSTS', workerGetPosts);
}

function* workerGetPosts(action) {
  try {
    const data = yield call(requestGetPosts, action.payload);
    if (action.callback) action.callback(data);

    yield put({
      type: GET_POSTS_HOME,
      payload: data.posts,
    });
  } catch (err) {
    yield put({
      type: GET_POSTS_HOME,
      payload: [],
    });
  }
}

const requestGetPosts = payload => {
  const { page, per_page } = payload;
  return REST.get(`posts?page=${page}&per_page=${per_page}`)
    .then(res => res.data)
    .catch(() => ({}));
};

///////////////////////////////////////////////////////

export function* watchLoadMorePosts() {
  yield takeLatest('WATCH_LOAD_MORE_POSTS', workerLoadMorePosts);
}

function* workerLoadMorePosts(action) {
  try {
    const data = yield call(requestGetPosts, action.payload);
    if (action.callback) action.callback(data);

    yield put({
      type: LOAD_MORE_POSTS_HOME,
      payload: data.posts,
    });
  } catch (err) {
    yield put({
      type: LOAD_MORE_POSTS_HOME,
      payload: [],
    });
  }
}
