import axios from 'axios';
import { setInterceptors } from '@/api/interceptors';

const createURL = (url: string) => {
  const instance = axios.create({
    baseURL: url,
  });

  setInterceptors(instance);
  return instance;
};

const platformInstance = createURL(process.env.VUE_APP_API_URL);

export {
  platformInstance,
};
