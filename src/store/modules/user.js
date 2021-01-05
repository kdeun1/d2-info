export default {
  namespaced: true,
  state: {
    currentBungieNetUser: {},
    bungieAccount: [
      // {
      //   applicableMembershipTypes: [3],
      //   crossSaveOverride: 0,
      //   displayName: '더강이',
      //   isPublic: true,
      //   membershipId: '4611686018485555033',
      //   membershipType: 3,
      // },
    ],
    currentMembershipType: 3, // -1, 1, 2, 3, 4, 5
    membershipsForCurrentUser: [],
  },
  getters: {
    getCurrentBungieNetUser: (state) => state.currentBungieNetUser,
    getBungieAccount: (state) => state.bungieAccount,
    getCurrentMembershipType: (state) => state.currentMembershipType,
    getCurrentBungieAccount: (state) => state.bungieAccount
      .find((v) => v.membershipType === state.currentMembershipType) || {},
    getMembershipsForCurrentUser: (state) => state.membershipsForCurrentUser,
  },
  mutations: {
    setCurrentBungieNetUser: (state, info) => {
      state.currentBungieNetUser = info;
    },
    setCurrentMembershipType: (state, membershipType) => {
      state.currentMembershipType = membershipType;
    },
    setBungieAccount: (state, infoArr) => {
      if (infoArr.length) {
        state.currentMembershipType = infoArr[0].membershipType;
      }
      state.bungieAccount = infoArr;
    },
    setMembershipsForCurrentUser: (state, info) => {
      state.membershipsForCurrentUser = info;
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
