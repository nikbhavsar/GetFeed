import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POLLS,
  GET_POLL,
  POLL_ERROR,
  ADD_POLL,
  UPDATE_PROFILE,
} from './types';

//Get Polls

export const getPolls = () => async (dispatch) => {
  try {
    const res = await axios.get('./api/polls');
    dispatch({
      type: GET_POLLS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create Poll

export const createPoll = (question, image1, image2, friendsList) => async (
  dispatch,
  getState
) => {
  const body = {
    question: question,
    opinionImage1: image1,
    opinionImage2: image2,
    friendsList: friendsList,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/polls', body, config);
    const { profile } = getState().profile;

    dispatch({
      type: ADD_POLL,
      payload: res.data,
    });
    const pollItems = [...profile.polls, res.data._id];
    dispatch({
      type: UPDATE_PROFILE,
      payload: { ...profile, polls: pollItems },
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET category by id
export const getPollById = (pollId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/polls/${pollId}`);
    dispatch({
      type: GET_POLL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};