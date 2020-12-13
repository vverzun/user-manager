/* eslint-disable no-underscore-dangle */
import actionTypes from './actionTypes';
import asyncAction from '../helpers/asyncActionHelper';
import eventService from '../services/eventService';
import userService from '../services/userService';
import store from '../configureStore';

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
    userCreatedEvents: data._embedded.events
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

export const loadAllEvents = () => async dispatch => {
  asyncAction(dispatch, eventService.getAllEvents, [], getAllEventsAction);
};

export const loadAllEventsFiltered = filters => async dispatch => {
  asyncAction(dispatch, eventService.getAllEventsFiltered, [filters], getAllEventsFilteredAction);
};

export const loadEvent = id => async dispatch => {
  asyncAction(dispatch, eventService.getEvent, [id], getEventAction);
};

export const loadUser = id => async dispatch => {
  asyncAction(dispatch, userService.getUser, [id], getUserAction);
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

export const loadUserCreatedEvents = id => async dispatch => {
  asyncAction(dispatch, eventService.getUserCreatedEvents, [id], getUserCreatedEventsAction);
};

export const deleteEvent = eventId => async dispatch => {
  asyncAction(dispatch, eventService.deleteEvent, [eventId], deleteEventAction)
    .then(() => {
      const userId = store.getState().MOCK_USER_ID;
      dispatch(loadUserCreatedEvents(userId))
        .then(() => {
          dispatch(closeModalAction());
        });
    });
};

export const loadCreateEvent = event => async dispatch => {
  asyncAction(dispatch, eventService.postEvent, [event], postEventAction);

  dispatch(closeModalAction());
};
