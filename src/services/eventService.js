import callWebApi from '../helpers/webApiHelper';

const eventService = {
  getAllEvents: async () => {
    const response = await callWebApi({
      endpoint: '/events',
      type: 'GET'
    }, true);

    return response.json();
  },

  getAllEventsFiltered: async filters => {
    const response = await callWebApi({
      endpoint: '/events/search/findFilteredEvents',
      type: 'POST',
      request: filters
    }, true);

    return response.json();
  },

  getEvent: async id => {
    const response = await callWebApi({
      endpoint: `/events/${id}`,
      type: 'GET'
    }, true);

    return response.json();
  },

  deleteEvent: async id => {
    await callWebApi({
      endpoint: `/events/${id}`,
      type: 'DELETE'
    }, true);

    return '';
  },

  getUserCreatedEvents: async () => {
    const response = await callWebApi({
      endpoint: '/events/search/findAllByUserId',
      type: 'GET'
    }, true);

    return response.json();
  },

  postEvent: async event => {
    const response = await callWebApi({
      endpoint: '/events',
      type: 'POST',
      request: event
    }, true);

    return response.json();
  },

  addEventToGoing: async id => {
    await callWebApi({
      endpoint: '/addEventToGoing',
      type: 'POST',
      request: { id }
    }, true);
  },

  removeEventFromGoing: async id => {
    await callWebApi({
      endpoint: '/removeEventFromGoing',
      type: 'POST',
      request: { id }
    }, true);
  }
};

export default eventService;
