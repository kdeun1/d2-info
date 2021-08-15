const setInterceptors = (instance: any) => {
  instance.interceptors.request.use(
    (config: any) => {
      config.headers['x-api-key'] = process.env.VUE_APP_API_KEY;
      return config;
    },
  );

  return instance;
};

export {
  setInterceptors,
};
