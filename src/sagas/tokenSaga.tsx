import { takeLatest, call, put } from 'redux-saga/effects';
import REST from '../utils/api';
import { UPDATE_TOKEN } from '../reducers/tokenReducer';

export function* watchAccessTokenAsync() {
  yield takeLatest('WATCH_ACCESS_TOKEN', workerAccessTokenAsync);
}

function* workerAccessTokenAsync(action) {
  try {
    const token = yield call(requestAccessToken, action, action.callback);
    yield put({
      type: UPDATE_TOKEN,
      payload: token,
    });
  } catch (error) {
    yield put({
      type: UPDATE_TOKEN,
      payload: {},
    });
  }
}

const requestAccessToken = (action, callback = (err, user) => {}) => {
  return REST.post('access_token', action.payload)
    .then(res => {
      callback(false, res.data.token);
      return res.data.token;
    })
    .catch(err => {
      callback(true, err.response.data.errors);
      return err.response.data.errors;
    });
};

///////////////////////////////////////////////////////
