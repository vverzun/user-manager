import {
  ASYNC_ACTION_PENDING,
  ASYNC_ACTION_ERROR,
  CREATE_USER,
  READ_USERS,
  // UPDATE_USER,
  DELETE_USER,
  CHANGE_PAGE
} from './actionTypes';
import { getAllUsers, postUser, removeUser } from '../../services/userService';

const asyncActionPending = () => ({
  type: ASYNC_ACTION_PENDING
});

const asyncActionError = error => ({
  type: ASYNC_ACTION_ERROR,
  payload: {
    error
  }
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

// const updateUser = () => async dispatch => {

// };

const deleteUser = id => ({
  type: DELETE_USER,
  payload: {
    id
  }
});

export const addNewUser = user => async dispatch => {
  dispatch(asyncActionPending());

  try {
    const createdUser = await postUser(user);
    dispatch(createUser(createdUser));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const loadUsers = () => async dispatch => {
  dispatch(asyncActionPending());

  try {
    const start = Date.now();
    const users = await getAllUsers();
    const end = Date.now();

    if (end - start < 1000) {
      await new Promise(res => {
        setTimeout(() => res(), 1000);
      });
    }

    dispatch(readUsers(users));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

// export const updateExistingUser = () => async dispatch => {

// };

export const deleteExistingUser = id => async dispatch => {
  dispatch(asyncActionPending());

  try {
    await removeUser(id);
    dispatch(deleteUser(id));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export const changePage = page => ({
  type: CHANGE_PAGE,
  payload: {
    page
  }
});
