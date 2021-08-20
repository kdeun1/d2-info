import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers['x-api-key'] = process.env.VUE_APP_API_KEY;
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      const errorCode = error.response.status;
      if (errorCode === 401 || errorCode === 403) {
        console.log('권한이 없습니다.');
      } else if (errorCode === 400) {
        console.log('잘못된 요청입니다.');
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export {
  setInterceptors,
};
