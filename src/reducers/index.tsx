import { combineReducers } from 'redux';

import user from './userReducer';
import post from './postReducer';
import carts from './cartReducer';

export default combineReducers({
  user,
  post,
  carts,
});
