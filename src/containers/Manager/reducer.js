import {
  LOAD_USERS_PENDING,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
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
    case LOAD_USERS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        usersOnPage: action.payload.users.slice(
          (state.page * USERS_PER_PAGE) - USERS_PER_PAGE,
          (state.page * USERS_PER_PAGE)
        ),
        isLoading: false
      };

    case LOAD_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
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
