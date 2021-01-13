export default {
  namespaced: true,
  state: {
    accessToken: null, // token value
    accessTokenExpiryDate: 0,
    membershipId: null,
    refreshToken: null,
    refreshTokenExpiryDate: 0,
    tokenType: 'Bearer',
  },
  getters: {
    getToken: (state) => state.accessToken,
    getTokenExpiryDate: (state) => state.accessTokenExpiryDate,
    existToken: (state) => !!state.accessToken,
  },
  mutations: {
    setToken: (state, data) => {
      state.accessToken = data.access_token;
      state.accessTokenExpiryDate = new Date().getTime() + 60 * 60 * 1000;
      state.membershipId = data.membership_id;
    },
    initToken: (state) => {
      state.accessToken = null;
    },
  },
  actions: {
  },
  modules: {
  },
};
