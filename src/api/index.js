import axios from 'axios';
import { setInterceptors, setCodeInterceptors, setTokenInterceptors } from './interceptors';

const create = (url) => {
  const instance = axios.create({ baseURL: url });
  setInterceptors(instance);
  return instance;
};

const createWithCode = (url) => {
  const instance = axios.create({ baseURL: url });
  setCodeInterceptors(instance);
  return instance;
};

const createWithToken = (url) => {
  const instance = axios.create({ baseURL: url });
  setTokenInterceptors(instance);
  return instance;
};

const platformInstance = create(process.env.VUE_APP_API_URL);
const codeInstance = createWithCode(process.env.VUE_APP_OAUTH_TOKEN_URL);
const tokenInstance = createWithToken(process.env.VUE_APP_API_URL);

export {
  platformInstance,
  codeInstance,
  tokenInstance,
};
