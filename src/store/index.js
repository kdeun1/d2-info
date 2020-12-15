import { createStore } from 'vuex';
import { getDestinyManifest, getPublicMilestones, getJson } from '@/api/methods';

const PREFIX_URL = 'https://www.bungie.net';

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
        console.log('[getDestinyManifestByKey] NO DATA!');
        return false;
      }
      return `${PREFIX_URL}${state.destinyManifest[key]}`;
    },
    getPublicMilestones: (state) => state.publicMilestones,
    getDestinyMilestoneDefinition: (state) => state.destinyMilestoneDefinition,
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
    initJson: async ({ commit }, { key, url }) => {
      const result = await getJson(url);
      await commit(key, result);
    },
    initManifest: async ({ commit, dispatch }) => {
      getDestinyManifest()
        .then((res) => {
          const koContentPaths = res.data.Response.jsonWorldComponentContentPaths.ko;
          const {
            DestinyMilestoneDefinition,
            DestinyActivityDefinition,
            DestinyActivityModifierDefinition,
          } = koContentPaths;
          commit('setDestinyManifest', koContentPaths);
          dispatch('initJson', {
            key: 'setDestinyMilestoneDefinition',
            url: `${PREFIX_URL}${DestinyMilestoneDefinition}`,
          });
          commit('setDestinyActivityDefinition', `${PREFIX_URL}${DestinyActivityDefinition}`);
          commit('setDestinyActivityModifierDefinition', `${PREFIX_URL}${DestinyActivityModifierDefinition}`);
        })
        .catch((e) => {
          console.log(`[Vuex] initManifest : ${e}`);
        });
    },
    initMilestone: ({ commit }) => {
      getPublicMilestones()
        .then((res) => {
          commit('setPublicMilestones', res.data.Response);
        })
        .catch((res) => {
          console.log(`[Vuex] initMilestone : ${res}`);
        });
    },
  },
  modules: {
  },
});
