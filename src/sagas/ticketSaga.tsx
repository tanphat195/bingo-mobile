import { takeLatest, call, put } from 'redux-saga/effects';
import REST from '../utils/api';
import { UPDATE_TICKET } from '../reducers/ticketReducer';

export function* watchGetTicketsAsync() {
  yield takeLatest('WATCH_GET_TICKETS', workerGetTicketsAsync);
}

function* workerGetTicketsAsync(action) {
  try {
    const res = yield call(requestGetTickets);
    yield put({
      type: UPDATE_TICKET,
      payload: res.data.tickets,
    });
  } catch (error) {
    yield put({
      type: UPDATE_TICKET,
      payload: [],
    });
  } finally {
    if (action.callback) {
      action.callback();
    }
  }
}

const requestGetTickets = () => {
  return REST.get('/tickets');
};

///////////////////////////////////////////////////////
