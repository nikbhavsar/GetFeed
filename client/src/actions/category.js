import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  GET_CATEGORY,
  CATEGORY_ERROR,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  REMOVE_FRIEND,
} from '../actions/types';

//Create catagory for user profile

export const createCategory = (categoryName, friends) => async (dispatch) => {
  dispatch({ type: CLEAR_CATEGORY });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
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
    dispatch({
      type: CREATE_CATEGORY,
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

export const deleteCategory = (categoryId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
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
    const res = await axios.delete('/api/category/delete-category', config);

    dispatch({
      type: DELETE_CATEGORY,
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
  if (localStorage.token) {
    setAuthToken(localStorage.token);
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
  if (localStorage.token) {
    setAuthToken(localStorage.token);
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
