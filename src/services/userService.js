import callWebApi from '../helpers/webApiHelper';

const userService = {
  getUser: async id => {
    const response = await callWebApi({
      endpoint: `/users/${id}`,
      type: 'GET'
    }, true);
    return response.json();
  },

  postUser: async user => {
    const response = await callWebApi({
      endpoint: '/users',
      type: 'POST',
      request: user
    });
    return response.json();
  },

  loginUser: async user => {
    const response = await callWebApi({
      endpoint: '/login',
      type: 'POST',
      request: user
    });
    return response.json();
  }
};

export default userService;
