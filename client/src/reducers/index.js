import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import category from './category';
export default combineReducers({
  alert,
  auth,
  profile,
  category,
});
