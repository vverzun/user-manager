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
      return {
        ...state,
        modalContentType: payload.modalContentType,
        modalData: payload.data,
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

    case actionTypes.GET_USER:
      return {
        ...state,
        user: payload.user
      };

    case actionTypes.POST_USER:
      return {
        ...state,
        user: payload.user
      };

    case actionTypes.LOGIN_USER:
      localStorage.setItem('jwtToken', payload.jwtToken.jwtToken);
      localStorage.setItem('userId', payload.jwtToken.userId);

      return {
        ...state
      };

    case actionTypes.LOGOUT:
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');

      return {
        ...state
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

    case actionTypes.DELETE_EVENT:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.ADD_EVENT_TO_GOING:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.REMOVE_EVENT_FROM_GOING:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.GET_ALL_PARTICIPANTS:
      return {
        ...state,
        participants: payload.participants,
        isLoading: false
      };

    default: return state;
  }
};
