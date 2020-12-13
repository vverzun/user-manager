import actionTypes from './actionTypes';

const initialState = {
  events: [],
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    case actionTypes.ASYNC_ACTION_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.ASYNC_ACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };

    case actionTypes.GET_EVENTS:
      return {
        ...state,
        events: action.payload.events,
        isLoading: false
      };

    default: return state;
  }
};
