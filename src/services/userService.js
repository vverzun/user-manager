import callWebApi from '../helpers/webApiHelper';

export const getAllUsers = async () => {
  const response = await callWebApi({
    endpoint: '/api/users',
    type: 'GET'
  });
  return response.json();
};

export const postUser = async request => {
  const response = await callWebApi({
    endpoint: '/api/users',
    type: 'POST',
    request
  });
  return response.json();
};

export const putUser = async (id, request) => {
  const response = await callWebApi({
    endpoint: `/api/user/${id}`,
    type: 'PUT',
    request
  });
  return response.json();
};

export const removeUser = async id => {
  const response = await callWebApi({
    endpoint: `/api/user/${id}`,
    type: 'DELETE'
  });
  return response.json();
};
