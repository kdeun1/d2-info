export default {
  namespaced: true,
  state: {
    authCode: null,
    accessToken: null,
  },
  getters: {
    getAuthCode: (state) => state.authCode,
  },
  mutations: {
    setAuthCode: (state, code) => {
      state.authCode = code;
    },
    setAccessToken: (state, token) => {
      state.authToken = token;
    },
  },
  actions: {
  },
  modules: {
  },
};
