import {
  HIDE_ERROR,
  CREATE_USER,
  READ_USERS,
  UPDATE_USER,
  DELETE_USER,
  CHANGE_PAGE
} from './actionTypes';
import asyncAction from '../../helpers/asyncActionHelper';
import userService from '../../services/userService';

export const hideError = () => ({
  type: HIDE_ERROR
});

const createUser = user => ({
  type: CREATE_USER,
  payload: {
    user
  }
});

const readUsers = users => ({
  type: READ_USERS,
  payload: {
    users
  }
});

const updateUser = user => ({
  type: UPDATE_USER,
  payload: {
    user
  }
});

const deleteUser = users => ({
  type: DELETE_USER,
  payload: {
    users
  }
});

export const addNewUser = user => async dispatch => {
  asyncAction(dispatch, userService.post, [user], createUser);
};

export const loadUsers = () => async dispatch => {
  asyncAction(dispatch, userService.get, [], readUsers);
};

export const updateExistingUser = (id, user) => async dispatch => {
  asyncAction(dispatch, userService.put, [id, user], updateUser);
};

export const deleteExistingUser = id => async dispatch => {
  asyncAction(dispatch, userService.delete, [id], deleteUser);
};

export const changePage = page => ({
  type: CHANGE_PAGE,
  payload: {
    page
  }
});
