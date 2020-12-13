import callWebApi from '../helpers/webApiHelper';

const eventService = {
  getAllEvents: async () => {
    const response = await callWebApi({
      endpoint: '/events',
      type: 'GET'
    });

    return response.json();
  },

  getEvent: async id => {
    const response = await callWebApi({
      endpoint: `/events/${id}`,
      type: 'GET'
    });

    return response.json();
  },

  deleteEvent: async id => {
    await callWebApi({
      endpoint: `/events/${id}`,
      type: 'DELETE'
    });

    return '';
  },

  getUserCreatedEvents: async id => {
    const response = await callWebApi({
      endpoint: `/events/search/findAllByUserId?userId=${id}`,
      type: 'GET'
    });

    return response.json();
  },

  postEvent: async event => {
    const response = await callWebApi({
      endpoint: '/events',
      type: 'POST',
      request: event
    });

    return response.json();
  }
};

export default eventService;
