import {
  ASYNC_ACTION_PENDING,
  ASYNC_ACTION_ERROR,
  CREATE_USER,
  READ_USERS,
  UPDATE_USER,
  DELETE_USER,
  CHANGE_PAGE
} from './actionTypes';
import { USERS_PER_PAGE } from '../../constants/pagination';

const defaultState = {
  users: [],
  usersOnPage: [],
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

    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        usersOnPage: [...state.users, action.payload.user].slice(
          (state.page * USERS_PER_PAGE) - USERS_PER_PAGE,
          (state.page * USERS_PER_PAGE)
        ),
        isLoading: false
      };

    case READ_USERS:
      return {
        ...state,
        users: action.payload.users,
        usersOnPage: action.payload.users.slice(
          (state.page * USERS_PER_PAGE) - USERS_PER_PAGE,
          (state.page * USERS_PER_PAGE)
        ),
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
        usersOnPage: state.users.map(user => (
          user.id === action.payload.user.id
            ? action.payload.user
            : user
        )).slice(
          (state.page * USERS_PER_PAGE) - USERS_PER_PAGE,
          (state.page * USERS_PER_PAGE)
        ),
        isLoading: false
      };

    case DELETE_USER:
      return {
        ...state,
        users: [...state.users].filter(user => user.id !== action.payload.id),
        usersOnPage: [...state.users].filter(user => user.id !== action.payload.id).slice(
          (state.page * USERS_PER_PAGE) - USERS_PER_PAGE,
          (state.page * USERS_PER_PAGE)
        ),
        isLoading: false
      };

    case CHANGE_PAGE:
      return {
        ...state,
        usersOnPage: state.users.slice(
          (action.payload.page * USERS_PER_PAGE) - USERS_PER_PAGE,
          (action.payload.page * USERS_PER_PAGE)
        ),
        page: action.payload.page
      };

    default: return state;
  }
};
