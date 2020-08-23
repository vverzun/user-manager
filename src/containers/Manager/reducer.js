import {
  ASYNC_ACTION_PENDING,
  ASYNC_ACTION_ERROR,
  HIDE_ERROR,
  CREATE_USER,
  READ_USERS,
  UPDATE_USER,
  DELETE_USER,
  CHANGE_PAGE
} from './actionTypes';

const defaultState = {
  users: [],
  page: 1,
  isLoading: false,
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ASYNC_ACTION_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };

    case HIDE_ERROR:
      return {
        ...state,
        error: null
      };

    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        isLoading: false
      };

    case READ_USERS:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => (
          user.id === action.payload.user.id
            ? action.payload.user
            : user
        )),
        isLoading: false
      };

    case DELETE_USER:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false
      };

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page
      };

    default: return state;
  }
};
