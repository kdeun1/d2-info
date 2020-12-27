import { getPublicMilestones } from '@/api/methods';

export default {
  namespaced: true,
  state: {
    publicMilestones: null,
  },
  getters: {
    getPublicMilestones: (state) => state.publicMilestones,
    getPublicMilestonesByKey: (state) => (key) => state.publicMilestones[key],
    isPublicMilestones: (state) => !!state.publicMilestones,
  },
  mutations: {
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
