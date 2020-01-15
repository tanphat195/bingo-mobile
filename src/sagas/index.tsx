import { all, fork } from 'redux-saga/effects';
import { watchAccessTokenAsync, watchRegisterAsync } from './userSaga';
import { watchGetCurrentRoomAsync } from './roomSaga';
import { watchGetCardsAsync } from './cardSaga';

export default function*() {
  yield all([fork(watchAccessTokenAsync)]);
  yield all([fork(watchRegisterAsync)]);
  yield all([fork(watchGetCurrentRoomAsync)]);
  yield all([fork(watchGetCardsAsync)]);
}
