import actionTypes from './actionTypes';

const initialState = {
  allEvents: null,
  event: null,

  isModalOpened: false,

  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
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

    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        isModalOpened: true
      };

    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false
      };

    case actionTypes.GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload.allEvents,
        isLoading: false
      };

    case actionTypes.GET_EVENT:
      return {
        ...state,
        event: action.payload.event,
        isLoading: false
      };

    default: return state;
  }
};
