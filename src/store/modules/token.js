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
  },
  mutations: {
    setToken: (state, data) => {
      state.accessToken = data.access_token;
      state.accessTokenExpiryDate = new Date().getTime() + 5 * 60 * 1000;
      state.membershipId = data.membership_id;
    },
  },
  actions: {
  },
  modules: {
  },
};
