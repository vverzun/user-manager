/* eslint-disable no-underscore-dangle */
import actionTypes from './actionTypes';
import asyncAction from '../helpers/asyncActionHelper';
import eventService from '../services/eventService';
import userService from '../services/userService';

export const openModalAction = ({ modalContentType, data }) => ({
  type: actionTypes.OPEN_MODAL,
  payload: {
    modalContentType,
    data
  }
});

export const closeModalAction = modalContentType => ({
  type: actionTypes.CLOSE_MODAL,
  payload: {
    modalContentType
  }
});

export const closeErrorAction = () => ({
  type: actionTypes.CLOSE_ERROR
});

const getAllEventsAction = data => ({
  type: actionTypes.GET_ALL_EVENTS,
  payload: {
    allEvents: data._embedded.events
  }
});

const getAllEventsFilteredAction = data => ({
  type: actionTypes.GET_ALL_EVENTS,
  payload: {
    allEvents: data
  }
});

const getEventAction = event => ({
  type: actionTypes.GET_EVENT,
  payload: {
    event
  }
});

const deleteEventAction = event => ({
  type: actionTypes.DELETE_EVENT,
  payload: {
    event
  }
});

const postEventAction = event => ({
  type: actionTypes.POST_EVENT,
  payload: {
    event
  }
});

const getUserCreatedEventsAction = data => ({
  type: actionTypes.GET_USER_CREATED_EVENTS,
  payload: {
    userCreatedEvents: data
  }
});

const getUserGoingEventsAction = data => ({
  type: actionTypes.GET_USER_GOING_EVENTS,
  payload: {
    userGoingEvents: data
  }
});

const getUserAction = user => ({
  type: actionTypes.GET_USER,
  payload: {
    user
  }
});

const postUserAction = user => ({
  type: actionTypes.POST_USER,
  payload: {
    user
  }
});

const loginUserAction = jwtToken => ({
  type: actionTypes.LOGIN_USER,
  payload: {
    jwtToken
  }
});

export const logout = () => ({
  type: actionTypes.LOGOUT
});

const addEventToGoingAction = () => ({
  type: actionTypes.ADD_EVENT_TO_GOING
});

const removeEventFromGoingAction = () => ({
  type: actionTypes.REMOVE_EVENT_FROM_GOING
});

const getAllParticipantsAction = participants => ({
  type: actionTypes.GET_ALL_PARTICIPANTS,
  payload: {
    participants
  }
});

export const loadAllEvents = () => async dispatch => {
  asyncAction(dispatch, eventService.getAllEvents, [], getAllEventsAction);
};

export const loadAllEventsFiltered = filters => async dispatch => {
  asyncAction(dispatch, eventService.getAllEventsFiltered, [filters], getAllEventsFilteredAction);
};

export const loadEvent = id => async dispatch => {
  asyncAction(dispatch, eventService.getEvent, [id], getEventAction);
};

export const loadUser = () => async dispatch => {
  asyncAction(dispatch, userService.getUser, [], getUserAction);
};

export const loadCreateUser = (user, history) => async dispatch => {
  asyncAction(dispatch, userService.postUser, [user], postUserAction)
    .then(() => {
      history.push('/login');
    });
};

export const loadLoginUser = (user, history) => async dispatch => {
  asyncAction(dispatch, userService.loginUser, [user], loginUserAction)
    .then(() => {
      history.push('/');
    });
};

export const loadUserCreatedEvents = () => async dispatch => {
  asyncAction(dispatch, eventService.getUserCreatedEvents, [], getUserCreatedEventsAction);
};

export const loadUserGoingEvents = () => async dispatch => {
  asyncAction(dispatch, eventService.getUserGoingEvents, [], getUserGoingEventsAction);
};

export const deleteEvent = eventId => async dispatch => {
  asyncAction(dispatch, eventService.deleteEvent, [eventId], deleteEventAction)
    .then(() => {
      dispatch(loadUserCreatedEvents())
        .then(() => {
          dispatch(closeModalAction());
        });
    });
};

export const loadCreateEvent = event => async dispatch => {
  asyncAction(dispatch, eventService.postEvent, [event], postEventAction);

  dispatch(closeModalAction());
};

export const addEventToGoing = eventId => async dispatch => {
  asyncAction(dispatch, eventService.addEventToGoing, [eventId], addEventToGoingAction);
};

export const joinEvent = eventId => async dispatch => {
  asyncAction(dispatch, eventService.addEventToGoing, [eventId], addEventToGoingAction)
    .then(() => {
      dispatch(loadEvent(eventId));
    });
};

export const removeEventFromGoing = eventId => async dispatch => {
  asyncAction(dispatch, eventService.removeEventFromGoing, [eventId], removeEventFromGoingAction);
};

export const unJoinEvent = eventId => async dispatch => {
  asyncAction(dispatch, eventService.removeEventFromGoing, [eventId], removeEventFromGoingAction)
    .then(() => {
      dispatch(loadEvent(eventId));
    });
};

export const loadParticipants = id => async dispatch => {
  asyncAction(dispatch, eventService.getAllParticipants, [id], getAllParticipantsAction);
};
