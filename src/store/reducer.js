import actionTypes from './actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.ASYNC_ACTION_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.ASYNC_ACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };

    case actionTypes.OPEN_MODAL:
      const { data, modalContentType } = payload;
      return {
        ...state,
        modalContentType: payload.modalContentType,
        modalData: data,
        isModalOpened: true
      };

    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        modalContentType: null,
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
        allEvents: payload.allEvents,
        isLoading: false
      };

    case actionTypes.GET_EVENT:
      return {
        ...state,
        event: payload.event,
        isLoading: false
      };

    case actionTypes.GET_USER_CREATED_EVENTS:
      return {
        ...state,
        userCreatedEvents: payload.userCreatedEvents,
        isLoading: false
      };

    case actionTypes.POST_EVENT:
      return {
        ...state,
        userCreatedEvents: [...state.userCreatedEvents, payload.event],
        isLoading: false
      };

    default: return state;
  }
};
