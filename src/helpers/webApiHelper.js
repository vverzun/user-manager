const getFetchUrl = args => args.endpoint;

const getFetchArgs = args => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
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
      console.log(err);
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
