import store from '@/store';

const setInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    config.headers['X-API-Key'] = process.env.VUE_APP_API_KEY;
    return config;
  });
  return instance;
};

const setCodeInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // config.headers['X-API-Key'] = process.env.VUE_APP_API_KEY;
    return config;
  });
  return instance;
};

const setTokenInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    const accessToken = store.getters['token/getToken'];
    config.headers['X-API-Key'] = process.env.VUE_APP_API_KEY;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });
  return instance;
};

export {
  setInterceptors,
  setCodeInterceptors,
  setTokenInterceptors,
};
