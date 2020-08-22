import callWebApi from '../helpers/webApiHelper';

const userService = {
  get: async () => {
    const response = await callWebApi({
      endpoint: '/api/users',
      type: 'GET'
    });
    return response.json();
  },

  post: async request => {
    const response = await callWebApi({
      endpoint: '/api/users',
      type: 'POST',
      request
    });
    return response.json();
  },

  put: async (id, request) => {
    const response = await callWebApi({
      endpoint: `/api/user/${id}`,
      type: 'PUT',
      request
    });
    return response.json();
  },

  delete: async id => {
    const response = await callWebApi({
      endpoint: `/api/user/${id}`,
      type: 'DELETE'
    });
    return response.json();
  }
};

export default userService;
