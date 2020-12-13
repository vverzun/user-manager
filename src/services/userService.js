import callWebApi from '../helpers/webApiHelper';

const userService = {
  getUser: async id => {
    const response = await callWebApi({
      endpoint: `/users/${id}`,
      type: 'GET'
    });
    return response.json();
  }
};

export default userService;
