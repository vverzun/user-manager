import actionTypes from './actionTypes';
import asyncAction from '../../helpers/asyncActionHelper';
import eventsService from '../../services/eventsService';

export const loadEvents = () => async dispatch => {
  asyncAction(dispatch, eventsService.getEvents, [], actionTypes.GET_EVENTS);
};
