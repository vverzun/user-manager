import {
  LOAD_USERS_PENDING,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
  CHANGE_PAGE
} from './actionTypes';
import { getAllUsers } from '../../services/userService';

const loadUsersPending = () => ({
  type: LOAD_USERS_PENDING
});

const loadUsersSuccess = users => ({
  type: LOAD_USERS_SUCCESS,
  payload: {
    users
  }
});

const loadUsersError = error => ({
  type: LOAD_USERS_ERROR,
  payload: {
    error
  }
});

export const loadUsers = () => async dispatch => {
  dispatch(loadUsersPending());

  try {
    const start = Date.now();
    const users = await getAllUsers();
    const end = Date.now();

    if (end - start < 1000) {
      await new Promise(res => {
        setTimeout(() => res(), 1000);
      });
    }

    dispatch(loadUsersSuccess(users));
  } catch (error) {
    dispatch(loadUsersError(error));
  }
};

export const changePage = page => ({
  type: CHANGE_PAGE,
  payload: {
    page
  }
});
