const getFetchUrl = args => {
  const certificate = 'https://cors-anywhere.herokuapp.com/';
  const baseURL = process.env.NODE_ENV === 'development'
    ? ''
    : `${certificate}http://77.120.241.80:8911`;

  return `${baseURL}${args.endpoint}`;
};

const getFetchArgs = args => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

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

const callWebApi = async args => {
  const res = await fetch(
    getFetchUrl(args),
    getFetchArgs(args)
  );
  await throwIfResponseFailed(res);
  return res;
};

export default callWebApi;
