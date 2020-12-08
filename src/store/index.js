import { createStore } from 'vuex';

export default createStore({
  state: {
    destinyManifest: {},
    publicMilestones: {},
    destinyMilestoneDefinition: {},
    destinyActivityDefinition: {},
    destinyActivityModifierDefinition: {},
  },
  getters: {
    getDestinyManifest: (state) => state.destinyManifest,
    getDestinyManifestByKey: (state) => (key) => {
      if (!state.destinyManifest[key]) {
        return false;
      }
      const PREFIX_URL = 'https://www.bungie.net';
      return `${PREFIX_URL}${state.destinyManifest[key]}`;
    },
    getPublicMilestones: (state) => state.publicMilestones,
  },
  mutations: {
    setDestinyManifest: (state, obj) => {
      state.destinyManifest = obj;
    },
    setPublicMilestones: (state, obj) => {
      state.publicMilestones = obj;
    },
    setDestinyMilestoneDefinition: (state, obj) => {
      state.destinyMilestoneDefinition = obj;
    },
    setDestinyActivityDefinition: (state, obj) => {
      state.destinyActivityDefinition = obj;
    },
    setDestinyActivityModifierDefinition: (state, obj) => {
      state.destinyActivityModifierDefinition = obj;
    },
  },
  actions: {
  },
  modules: {
  },
});
