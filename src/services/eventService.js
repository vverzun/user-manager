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

  getUserCreatedEvents: async id => {
    const response = await callWebApi({
      endpoint: `/events/search/findAllByUserId?userId=${id}`,
      type: 'GET'
    });

    return response.json();
  }
};

export default eventService;
