import axios from 'axios';

// instance & interceptor
function create(url = null, options = null) {
  const instance = axios.create(
    { baseURL: url },
    {
      header: {
        'X-API-Key': process.env.VUE_APP_API_KEY,
        Connection: 'keep-alive',
      },
      ...options,
    },
  );
  return instance;
}

const baseInstance = create();
const platformInstance = create(process.env.VUE_APP_API_URL);

export {
  baseInstance,
  platformInstance,
};
