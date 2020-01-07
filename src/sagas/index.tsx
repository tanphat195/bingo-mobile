import { all, fork } from 'redux-saga/effects';
import { watchAccessTokenAsync } from './tokenSaga';

export default function*() {
  yield all([fork(watchAccessTokenAsync)]);
}
