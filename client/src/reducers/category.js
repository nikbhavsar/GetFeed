import {
  GET_CATEGORY,
  GET_CATEGORIES,
  CATEGORY_ERROR,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  REMOVE_FRIEND,
} from '../actions/types';

const initialState = {
  category: null,
  categories: null,
  deletedCategory: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CATEGORY:
    case GET_CATEGORY:
    case UPDATE_CATEGORY:
    case REMOVE_FRIEND:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        deletedCategory: payload,
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        category: null,
        loading: false,
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        category: null,
        loading: false,
      };
    default:
      return state;
  }
}
