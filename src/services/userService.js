import callWebApi from '../helpers/webApiHelper';

const userService = {
  getUser: async id => {
    const response = await callWebApi({
      endpoint: `/users/${id}`,
      type: 'GET'
    });
    return response.json();
  },

  postUser: async user => {
    const response = await callWebApi({
      endpoint: '/users',
      type: 'POST',
      request: user
    });
    return response.json();
  }
};

export default userService;
