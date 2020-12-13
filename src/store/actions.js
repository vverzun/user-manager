import actionTypes from './actionTypes';
import asyncAction from '../helpers/asyncActionHelper';
import eventService from '../services/eventService';

export const openModalAction = () => ({
  type: actionTypes.OPEN_MODAL
});

export const closeModalAction = () => ({
  type: actionTypes.CLOSE_MODAL
});

export const closeErrorAction = () => ({
  type: actionTypes.CLOSE_ERROR
});

const getAllEventsAction = allEvents => ({
  type: actionTypes.GET_ALL_EVENTS,
  payload: {
    allEvents
  }
});

const getEventAction = event => ({
  type: actionTypes.GET_EVENT,
  payload: {
    event
  }
});

export const loadAllEvents = () => async dispatch => {
  asyncAction(dispatch, eventService.getAllEvents, [], getAllEventsAction);
};

export const loadEvent = () => async dispatch => { // add id here
  asyncAction(dispatch, eventService.getEvent, [], getEventAction);
};
