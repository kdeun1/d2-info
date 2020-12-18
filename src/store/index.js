import { createStore } from 'vuex';
import { getDestinyManifest, getPublicMilestones, getJson } from '@/api/methods';

const PREFIX_URL = 'https://www.bungie.net';

export default createStore({
  state: {
    destinyManifest: {}, // DB URL이 들어있는 객체
    destinyMilestoneDefinition: {},
    destinyActivityDefinition: {},
    destinyActivityModifierDefinition: {},
    publicMilestones: {},
  },
  getters: {
    getDestinyManifest: (state) => state.destinyManifest,
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
    initManifest: async ({ commit }) => {
      const res = await getDestinyManifest();
      const koContentPaths = res.data.Response.jsonWorldComponentContentPaths.ko;
      commit('setDestinyManifest', koContentPaths);
    },
    initDestinyMilestoneDefinition: async ({ state, commit }) => {
      const { DestinyMilestoneDefinition } = state.destinyManifest;
      const { data } = await getJson(`${PREFIX_URL}${DestinyMilestoneDefinition}`);
      commit('setDestinyMilestoneDefinition', data);
    },
    initDestinyActivityDefinition: async ({ state, commit }) => {
      const { DestinyActivityDefinition } = state.destinyManifest;
      const { data } = await getJson(`${PREFIX_URL}${DestinyActivityDefinition}`);
      commit('setDestinyActivityDefinition', data);
    },
    initDestinyActivityModifierDefinition: async ({ state, commit }) => {
      const { DestinyActivityModifierDefinition } = state.destinyManifest;
      const { data } = await getJson(`${PREFIX_URL}${DestinyActivityModifierDefinition}`);
      commit('setDestinyActivityModifierDefinition', data);
    },
    initMilestone: async ({ commit }) => {
      const res = await getPublicMilestones();
      commit('setPublicMilestones', res.data.Response);
    },
  },
  modules: {
  },
});
