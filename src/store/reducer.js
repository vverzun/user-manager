import actionTypes from './actionTypes';

export default (state, action) => {
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

    case actionTypes.CLOSE_ERROR:
      return {
        ...state,
        error: null
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
