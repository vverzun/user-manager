/* eslint-disable no-underscore-dangle */
import actionTypes from './actionTypes';
import asyncAction from '../helpers/asyncActionHelper';
import eventService from '../services/eventService';
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

export const loadAllEvents = () => async dispatch => {
  asyncAction(dispatch, eventService.getAllEvents, [], getAllEventsAction);
};

export const loadEvent = id => async dispatch => {
  asyncAction(dispatch, eventService.getEvent, [id], getEventAction);
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
