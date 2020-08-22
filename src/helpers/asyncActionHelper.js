import {
  ASYNC_ACTION_PENDING,
  ASYNC_ACTION_ERROR
} from '../containers/Manager/actionTypes';

const asyncActionPending = () => ({
  type: ASYNC_ACTION_PENDING
});

const asyncActionError = error => ({
  type: ASYNC_ACTION_ERROR,
  payload: {
    error
  }
});

const asyncAction = async (dispatch, request, params, action) => {
  dispatch(asyncActionPending());

  try {
    const res = await request(...params);
    dispatch(action(res));
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};

export default asyncAction;
