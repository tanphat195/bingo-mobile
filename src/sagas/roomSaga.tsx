import { takeLatest, call, put } from 'redux-saga/effects';
import REST from '../utils/api';
import { UPDATE_ROOM } from '../reducers/roomReducer';

export function* watchGetCurrentRoomAsync() {
  yield takeLatest('WATCH_GET_CURRENT_ROOM', workerGetCurrentRoomAsync);
}

function* workerGetCurrentRoomAsync() {
  try {
    const res = yield call(requestGetCurrentRoom);
    yield put({
      type: UPDATE_ROOM,
      payload: res.data.rooms,
    });
  } catch (error) {
    yield put({
      type: UPDATE_ROOM,
      payload: [],
    });
  }
}

const requestGetCurrentRoom = () => {
  return REST.post('room/current');
};

///////////////////////////////////////////////////////
