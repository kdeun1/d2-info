import axios from 'axios';

// instance & interceptor
function create(url = null, options = null) {
  const instance = axios.create(
    { baseURL: url },
    { header: { 'X-API-Key': process.env.VUE_APP_X_API_KEY }, ...options },
  );
  return instance;
}

const emptyInstance = create();
const publicInstance = create(process.env.VUE_APP_API_URL);

export {
  emptyInstance,
  publicInstance,
};
