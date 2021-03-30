import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POLLS,
  GET_POLL,
  GET_FOLLOWING_POLL,
  POLL_ERROR,
  ADD_POLL,
  UPDATE_PROFILE,
  UPDATE_LIKES,
  DELETE_POLL,
  UPDATE_POLL,
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
    //Adding poll Id to profile's array
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

//Update Poll
export const updatePoll = (id, question, friendsList) => async (dispatch) => {
  const body = {
    pollId: id,
    question: question,
    friendsList: friendsList,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/polls/update', body, config);

    console.log(res);
    dispatch({
      type: UPDATE_POLL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
    });
  }
};

//Delete poll

export const deletePoll = (pollId) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      pollId: pollId,
    },
  };

  try {
    const res = await axios.delete('/api/polls', config);
    const { profile } = getState().profile;
    dispatch({
      type: DELETE_POLL,
      payload: res.data,
    });
    const pollItems = profile.polls.filter((poll) => poll !== res.data._id);
    console.log(pollItems);
    dispatch({
      type: UPDATE_PROFILE,
      payload: { ...profile, polls: pollItems },
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET poll by id
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

//Get foloowing peope's polls

export const getFollowingPoll = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/polls/following/polls');
    dispatch({
      type: GET_FOLLOWING_POLL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like post
export const addLike = (pollId, image) => async (dispatch, getState) => {
  try {
    const res = await axios.put(`/api/polls/like/${image}/${pollId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { pollId, image, likes: res.data },
    });
    const { followingPolls } = getState().poll;
    dispatch({
      type: GET_FOLLOWING_POLL,
      payload: followingPolls.map((poll) => {
        if (poll._id === pollId) {
          return { ...poll, [`opinionImage${image}Likes`]: res.data };
        } else {
          return poll;
        }
      }),
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// UnLike post
export const unLike = (pollId, image) => async (dispatch, getState) => {
  try {
    const res = await axios.put(`/api/polls/unlike/${image}/${pollId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { pollId, image, likes: res.data },
    });
    const { followingPolls } = getState().poll;

    dispatch({
      type: GET_FOLLOWING_POLL,
      payload: followingPolls.map((poll) => {
        if (poll._id === pollId) {
          return { ...poll, [`opinionImage${image}Likes`]: res.data };
        } else {
          return poll;
        }
      }),
    });
  } catch (err) {
    dispatch({
      type: POLL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
