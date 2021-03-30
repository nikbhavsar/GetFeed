import {
  GET_POLLS,
  GET_POLL,
  POLL_ERROR,
  ADD_POLL,
  GET_FOLLOWING_POLL,
  UPDATE_LIKES,
  UPDATE_POLL,
} from '../actions/types';

const initialState = {
  polls: [],
  poll: null,
  followingPolls: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_POLL:
    case GET_POLL:
      return {
        ...state,
        poll: payload,
        loading: false,
      };
    case UPDATE_POLL:
      return {
        ...state,
        polls: state.polls.map((poll) =>
          poll._id === payload.id
            ? {
                ...poll,
                question: payload.question,
                friendsList: payload.friendsList,
              }
            : poll
        ),
        loading: false,
      };
    case GET_POLLS:
      return {
        ...state,
        polls: payload,
        loading: false,
      };
    case GET_FOLLOWING_POLL:
      return {
        ...state,
        followingPolls: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        polls: state.polls.map((poll) =>
          poll._id === payload.id
            ? { ...poll, [`opinionImage${payload.image}Likes`]: payload.likes }
            : poll
        ),
        loading: false,
      };
    case POLL_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
