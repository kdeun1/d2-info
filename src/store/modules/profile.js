export default {
  namespaced: true,
  state: {
    profile: {},
    profileCurrencies: {},
    profileInventory: {},
    characters: {},
    currentCharacterId: '',
  },
  getters: {
    getProfile: (state) => state.profile,
    getCharacters: (state) => state.characters,
    getCharacterId: (state) => state.currentCharacterId,
    getProfileCurrencies: (state) => state.profileCurrencies,
    getProfileInventory: (state) => state.profileInventory,
  },
  mutations: {
    setAllProfile: (state, res) => {
      const {
        profile, profileCurrencies, profileInventory, characters,
      } = res;
      state.profile = profile.data;
      const [firstCharacterId] = profile.data.characterIds;
      state.currentCharacterId = firstCharacterId;
      state.profileCurrencies = profileCurrencies.data;
      state.profileInventory = profileInventory.data;
      state.characters = characters.data;
    },
    setProfile: (state, info) => {
      state.profile = info;
    },
    setCharacterId: (state, id) => {
      state.currentCharacterId = id;
    },
  },
  actions: {
  },
  modules: {
  },
};
