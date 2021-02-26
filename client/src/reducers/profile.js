import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_FOLLOWING_FOLLOWERS,
  FOLLOW,
  UNFOLLOW,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  folowingFollowers: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_FOLLOWING_FOLLOWERS:
      return {
        ...state,
        folowingFollowers: payload,
        loading: false,
      };
    case FOLLOW:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case UNFOLLOW:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile: null,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
