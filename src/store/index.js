import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { getDestinyManifest, getJson } from '@/api/methods';
import milestone from './modules/milestone';
import authorization from './modules/authorization';
import token from './modules/token';
import user from './modules/user';

const PREFIX_URL = 'https://www.bungie.net';

export default createStore({
  state: {
    destiny2ManifestVersion: null,
    destinyManifest: null, // DB URL이 들어있는 객체
    destinyMilestoneDefinition: null,
    destinyActivityDefinition: null,
    destinyActivityModifierDefinition: null,
  },
  getters: {
    getDestiny2ManifestVersion: (state) => state.destiny2ManifestVersion,
    isDestinyManifest: (state) => !!state.destinyManifest,
    getDestinyManifest: (state) => state.destinyManifest,
    getDestinyMilestoneDefinitionByKey: (state) => (key) => state
      .destinyMilestoneDefinition[key],
    getDestinyActivityDefinitionByKey: (state) => (key) => state
      .destinyActivityDefinition[key],
    getDestinyActivityModifierDefinitionByKey: (state) => (key) => state
      .destinyActivityModifierDefinition[key],
  },
  mutations: {
    setDestiny2ManifestVersion: (state, ver) => {
      state.destiny2ManifestVersion = ver;
    },
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
    authorization,
    token,
    user,
  },
  plugins: [
    createPersistedState({
      key: 'manifest',
      paths: [
        'destiny2ManifestVersion',
        'destinyManifest',
        'destinyMilestoneDefinition',
        'destinyActivityDefinition',
        'destinyActivityModifierDefinition',
      ],
    }),
    createPersistedState({
      key: 'milestone',
      paths: [
        'milestone.timestamp',
        'milestone.publicMilestones',
      ],
    }),
    createPersistedState({
      key: 'authorization',
      reducer: (state) => ({
        code: state.authorization.code,
        expiryDate: state.authorization.expiryDate,
        type: state.authorization.type,
      }),
    }),
    createPersistedState({
      key: 'token',
      paths: [
        'token.accessToken',
        'token.accessTokenExpiryDate',
        'token.membershipId',
        'token.refreshToken',
        'token.refreshTokenExpiryDate',
        'token.tokenType',
      ],
    }),
    createPersistedState({
      key: 'user',
      paths: [
        'user.currentBungieNetUser',
        'user.bungieAccount',
        'user.currentMembershipType',
      ],
    }),
  ],
});
