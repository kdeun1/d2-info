import { getPublicMilestones } from '@/api/methods';

export default {
  namespaced: true,
  state: {
    timestamp: null,
    publicMilestones: null,
  },
  getters: {
    getTimestamp: (state) => state.timestamp,
    getPublicMilestones: (state) => state.publicMilestones,
    getPublicMilestonesByKey: (state) => (key) => state.publicMilestones[key],
    isPublicMilestones: (state) => !!state.publicMilestones,
  },
  mutations: {
    setTimestamp: (state, time) => { state.timestamp = time; },
    setPublicMilestones: (state, obj) => {
      state.publicMilestones = obj;
    },
  },
  actions: {
    initMilestone: async ({ commit }) => {
      const res = await getPublicMilestones();
      commit('setPublicMilestones', res.data.Response);
    },
  },
  modules: {
  },
};
