import { takeLatest, call, put } from 'redux-saga/effects';
import REST from '../../src/utils/api';
import { UPDATE_USER } from '../../src/reducers/userReducer';

export function* watchSignUpAsync() {
  yield takeLatest('WATCH_SIGN_UP', workerSignUpAsync);
}

function* workerSignUpAsync(action) {
  try {
    const user = yield call(requestSignUp, action, action.callback);
    yield put({
      type: UPDATE_USER,
      payload: user,
    });
  } catch (error) {
    yield put({
      type: UPDATE_USER,
      payload: {},
    });
  }
}

const requestSignUp = (action, callback = (err, user) => {}) => {
  return REST.post('auth/sign_up', action.payload)
    .then(res => {
      callback(false, res.data.user);
      return res.data.user;
    })
    .catch(err => {
      callback(true, err.response.data.errors);
      return err.response.data.errors;
    });
};

///////////////////////////////////////////////////////

export function* watchSignInAsync() {
  yield takeLatest('WATCH_SIGN_IN', workerSignInAsync);
}

function* workerSignInAsync(action) {
  try {
    const user = yield call(requestSignIn, action, action.callback);
    yield put({
      type: UPDATE_USER,
      payload: user,
    });
  } catch (error) {
    yield put({
      type: UPDATE_USER,
      payload: {},
    });
  }
}

const requestSignIn = (action, callback = (err, user) => {}) => {
  return REST.post('auth/sign_in', action.payload)
    .then(res => {
      callback(false, res.data.user);
      return res.data.user;
    })
    .catch(error => {
      callback(true, error.response.data.errors);
      return {};
    });
};

export function* watchFetchUserAsync() {
  yield takeLatest('WATCH_FETCH_USER', workerFetchUserAsync);
}

///////////////////////////////////////////////////////

function* workerFetchUserAsync(action) {
  try {
    const user = yield call(requestFetchUser);
    yield put({
      type: UPDATE_USER,
      payload: user,
    });
    if (action.callback) {
      if (user.email) {
        action.callback(false, user);
      } else {
        action.callback(true, {});
      }
    }
  } catch (error) {
    yield put({
      type: UPDATE_USER,
      payload: {},
    });
  }
}

const requestFetchUser = () => {
  return REST.post('auth/fetch')
    .then(res => res.data.user)
    .catch(() => ({}));
};

///////////////////////////////////////////////////////

export function* watchSignOutAsync() {
  yield takeLatest('WATCH_SIGN_OUT', workerSignOutAsync);
}

function* workerSignOutAsync(action) {
  try {
    if (action.callback) {
      action.callback();
    }
    yield call(requestSignOut);
    yield put({
      type: UPDATE_USER,
      payload: {},
    });
  } catch (error) {
    yield put({
      type: UPDATE_USER,
      payload: {},
    });
  }
}

const requestSignOut = () => {
  return REST.get('auth/sign_out');
};

///////////////////////////////////////////////////////

export function* watchUpdateProfile() {
  yield takeLatest('WATCH_UPDATE_PROFILE', workerUpdateProfile);
}

function* workerUpdateProfile(action) {
  try {
    const user = yield call(requestUpdateProfile, action);
    if (action.callback) {
      action.callback(user);
    }
    yield put({
      type: UPDATE_USER,
      payload: user,
    });
  } catch (err) {
    yield put({
      type: UPDATE_USER,
      payload: {},
    });
  }
}

const requestUpdateProfile = action => {
  return REST.put('auth/update_profile', action.payload)
    .then(res => res.data.user)
    .catch(() => ({}));
};
