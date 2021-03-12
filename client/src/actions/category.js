import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  GET_CATEGORY,
  GET_CATEGORIES,
  CATEGORY_ERROR,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  REMOVE_FRIEND,
  UPDATE_PROFILE,
} from '../actions/types';

//Create catagory for user profile

export const createCategory = (categoryName, friends) => async (
  dispatch,
  getState
) => {
  dispatch({ type: CLEAR_CATEGORY });
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
  const body = {
    category_name: categoryName,
    friends: friends,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/category', body, config);
    const { profile } = getState().profile;

    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data,
    });
    const categoryItems = [...profile.categories, res.data._id];
    console.log(categoryItems);
    dispatch({
      type: UPDATE_PROFILE,
      payload: { ...profile, categories: categoryItems },
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all Categories for current user
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/category');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET category by id
export const getCategory = (categoryId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/category/${categoryId}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Category

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      categoryId: categoryId,
    },
  };

  try {
    const res = await axios.delete('/api/category', config);
    const { profile } = getState().profile;
    dispatch({
      type: DELETE_CATEGORY,
      payload: res.data,
    });
    const categoryItems = profile.categories.filter(
      (category) => category !== res.data._id
    );
    console.log(categoryItems);
    dispatch({
      type: UPDATE_PROFILE,
      payload: { ...profile, categories: categoryItems },
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add user to friends list

export const addUserToCategory = (categoryId, userId) => async (dispatch) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
  const body = {
    categoryId: categoryId,
    userId: userId,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put('/api/category/add-friends', body, config);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Remove user from friends list

export const removeUserFromCategory = (categoryId, userId) => async (
  dispatch
) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
  const body = {
    categoryId: categoryId,
    userId: userId,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put('/api/category/remove-friends', body, config);
    dispatch({
      type: REMOVE_FRIEND,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
