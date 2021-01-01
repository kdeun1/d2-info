export default {
  namespaced: true,
  state: {
    currentBungieNetUser: null,
    bungieAccount: null,
    currentMembershipType: 0, // -1, 1, 2, 3, 4, 5
  },
  getters: {
    getCurrentBungieNetUser: (state) => state.currentBungieNetUser,
    getBungieAccount: (state) => state.bungieAccount,
    getCurrentMembershipType: (state) => state.currentMembershipType,
    getCurrentBungieAccount: (state) => state.bungieAccount
      .find((v) => v.membershipType === state.currentMembershipType),
  },
  mutations: {
    setCurrentBungieNetUser: (state, info) => {
      state.currentBungieNetUser = info;
    },
    setCurrentMembershipType: (state, membershipType) => {
      state.currentMembershipType = membershipType;
    },
    setBungieAccount: (state, infoArr) => {
      if (!infoArr.length) {
        state.currentMembershipType = infoArr[0].membershipType;
      }
      state.bungieAccount = infoArr;
    },
    deleteAllUserInfo: (state) => {
      state.currentBungieNetUser = null;
      state.bungieAccount = null;
    },
  },
  actions: {
  },
  modules: {
  },
};
