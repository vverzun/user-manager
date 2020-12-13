const getFetchUrl = args => {
  const certificate = 'https://cors-anywhere.herokuapp.com/';
  const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.126:8080'
    : `${certificate}http://192.168.0.126:8080`;

  return `${baseURL}${args.endpoint}`;
};

const getFetchArgs = (args, isProtected = false) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  if (isProtected) {
    const jwtToken = localStorage.getItem('jwtToken');
    headers.Authorization = `Bearer ${jwtToken}`;
  }

  let body;
  if (args.request) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }

    body = JSON.stringify(args.request);
  }

  return {
    method: args.type,
    headers,
    ...(args.request === 'GET' ? {} : { body })
  };
};

const throwIfResponseFailed = async res => {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';

    try {
      parsedException = await res.json();
    } catch (err) {
      // handleError
    }

    throw parsedException;
  }
};

const callWebApi = async (args, isProtected) => {
  const res = await fetch(
    getFetchUrl(args),
    getFetchArgs(args, isProtected)
  );

  await throwIfResponseFailed(res);

  return res;
};

export default callWebApi;
