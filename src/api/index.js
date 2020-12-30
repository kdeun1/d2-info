import axios from 'axios';

// instance & interceptor
const create = (url = null, options = null) => {
  const instance = axios.create(
    { baseURL: url },
    {
      header: {
        'X-API-Key': process.env.VUE_APP_API_KEY,
      },
      ...options,
    },
  );
  return instance;
};

const createWithCode = () => {
  const instance = axios.create(
    {
      baseURL: 'https://www.bungie.net/Platform/App/OAuth/Token',
    },
    {
      headers: {
        'X-API-Key': process.env.VUE_APP_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return instance;
};

const baseInstance = create();
const platformInstance = create(process.env.VUE_APP_API_URL);
const authInstance = createWithCode();

export {
  baseInstance,
  platformInstance,
  authInstance,
};
