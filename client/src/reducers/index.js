import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import category from './category';
import poll from './poll';

export default combineReducers({
  alert,
  auth,
  profile,
  category,
  poll,
});
