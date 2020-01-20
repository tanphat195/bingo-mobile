import { combineReducers } from 'redux';

import user from './userReducer';
import room from './roomReducer';
import ticket from './ticketReducer';

export default combineReducers({
  user,
  room,
  ticket,
});
