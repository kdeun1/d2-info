export default {
  namespaced: true,
  state: {
    code: null,
    expiryDate: 0,
    type: 'public',
  },
  getters: {
    getAuthCode: (state) => state.code,
    isAuth: (state) => !!state.code,
  },
  mutations: {
    setAuthCode: (state, code) => {
      state.code = code;
      state.expiryDate = new Date().getTime() + 60 * 60 * 1000;
    },
    deleteAuth: (state) => { state.code = null; },
  },
  actions: {
  },
  modules: {
  },
};
