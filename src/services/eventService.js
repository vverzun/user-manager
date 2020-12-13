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
      endpoint: `/event/${id}`,
      type: 'GET'
    });

    return response.json();
  }
};

export default eventService;
