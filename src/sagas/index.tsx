import { all, fork } from 'redux-saga/effects';
import {
  watchSignUpAsync,
  watchSignInAsync,
  watchFetchUserAsync,
  watchSignOutAsync,
  watchUpdateProfile,
} from './userSaga';
import { watchGetPosts, watchLoadMorePosts } from './postSaga';
import { watchAddCart, watchGetCarts, watchRemoveCart } from './cartSaga';

export default function*() {
  yield all([
    fork(watchSignUpAsync),
    fork(watchSignInAsync),
    fork(watchFetchUserAsync),
    fork(watchSignOutAsync),
    fork(watchUpdateProfile),
    fork(watchGetPosts),
    fork(watchLoadMorePosts),
    fork(watchAddCart),
    fork(watchGetCarts),
    fork(watchRemoveCart),
  ]);
}
