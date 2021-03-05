import { GET_POLLS, GET_POLL, POLL_ERROR, ADD_POLL } from '../actions/types';

const initialState = {
  polls: [],
  poll: null,
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
    case GET_POLLS:
      return {
        ...state,
        polls: payload,
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
