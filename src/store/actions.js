/* eslint-disable no-underscore-dangle */
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

export const loadAllEvents = () => async dispatch => {
  asyncAction(dispatch, eventService.getAllEvents, [], getAllEventsAction);
};

export const loadEvent = id => async dispatch => {
  asyncAction(dispatch, eventService.getEvent, [id], getEventAction);
};
