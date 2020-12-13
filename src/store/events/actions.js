import actionTypes from './actionTypes';
import asyncAction from '../../helpers/asyncActionHelper';
import eventsService from '../../services/eventsService';

const getUsersAction = events => ({
  type: actionTypes.GET_EVENTS,
  payload: {
    events
  }
});

export const loadEvents = () => async dispatch => {
  asyncAction(dispatch, eventsService.getEvents, [], getUsersAction);
};
