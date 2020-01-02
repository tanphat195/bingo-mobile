import { takeLatest, call, put } from 'redux-saga/effects';
import { addOrUpdateCart, removeCart, getCarts } from 'src/utils/storage';
import { ADD_CART, REMOVE_CART, GET_CARTS } from 'src/reducers/cartReducer';

export function* watchAddCart() {
  yield takeLatest('WATCH_ADD_CART', workerAddCart);
}

function* workerAddCart(action) {
  try {
    const cart = yield call(addCartToAsyncStorage, action.payload);
    yield put({
      type: ADD_CART,
      payload: cart,
    });
  } catch (err) {
    // yield put({
    //   type: ADD_CART,
    //   payload: {}
    // });
  }
}

const addCartToAsyncStorage = cart => {
  return addOrUpdateCart(cart);
};

///////////////////////////////////////////////////////

export function* watchRemoveCart() {
  yield takeLatest('WATCH_REMOVE_CART', workerRemoveCart);
}

function* workerRemoveCart(action) {
  try {
    const id = yield call(removeCartToAsyncStorage, action.payload);
    yield put({
      type: REMOVE_CART,
      payload: id,
    });
  } catch (err) {}
}

const removeCartToAsyncStorage = cart => {
  return removeCart(cart);
};

///////////////////////////////////////////////////////

export function* watchGetCarts() {
  yield takeLatest('WATCH_GET_CARTS', workerGetCarts);
}

function* workerGetCarts() {
  try {
    const carts = yield call(getCartAsyncStore);
    yield put({
      type: GET_CARTS,
      payload: carts,
    });
  } catch (err) {
    yield put({
      type: GET_CARTS,
      payload: [],
    });
  }
}

const getCartAsyncStore = () => {
  return getCarts();
};
