export default {
  namespaced: true,
  state: {
    code: null,
    expiryDate: 0,
    type: 'public',
  },
  getters: {
    getAuthCode: (state) => state.code,
  },
  mutations: {
    setAuthCode: (state, code) => {
      state.code = code;
      state.expiryDate = new Date().getTime() + 5 * 60 * 1000;
    },
    deleteAuth: (state) => {
      state.code = null;
      state.expiryDate = 0;
      state.type = 'public';
    },
  },
  actions: {
  },
  modules: {
  },
};
