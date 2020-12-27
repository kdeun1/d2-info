import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { getDestinyManifest, getJson } from '@/api/methods';
import milestone from './modules/milestone';

const PREFIX_URL = 'https://www.bungie.net';

export default createStore({
  state: {
    destinyManifest: null, // DB URL이 들어있는 객체
    destinyMilestoneDefinition: null,
    destinyActivityDefinition: null,
    destinyActivityModifierDefinition: null,
  },
  getters: {
    getDestinyManifest: (state) => state.destinyManifest,
    getDestinyMilestoneDefinitionByKey: (state) => (key) => state
      .destinyMilestoneDefinition[key],
    getDestinyActivityDefinitionByKey: (state) => (key) => state
      .destinyActivityDefinition[key],
    getDestinyActivityModifierDefinitionByKey: (state) => (key) => state
      .destinyActivityModifierDefinition[key],
    isDestinyManifest: (state) => !!state.destinyManifest,
  },
  mutations: {
    setDestinyManifest: (state, obj) => {
      state.destinyManifest = obj;
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
  },
  modules: {
    milestone,
  },
  plugins: [createPersistedState({
    paths: [
      'destinyManifest',
      'destinyMilestoneDefinition',
      'destinyActivityDefinition',
      'destinyActivityModifierDefinition',
      'milestone.publicMilestones',
    ],
  })],
});
