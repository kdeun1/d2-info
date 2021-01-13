export default {
  namespaced: true,
  state: {
    currentCharacterId: '',
    profile: {},
    profileCurrencies: {},
    profileInventory: {},
    characters: {},
    characterActivities: {},
  },
  getters: {
    getCharacterId: (state) => state.currentCharacterId,
    getProfile: (state) => state.profile,
    getProfileCurrencies: (state) => state.profileCurrencies,
    getProfileInventory: (state) => state.profileInventory,
    getCharacters: (state) => state.characters,
    getCharacterActivities: (state) => state.characterActivities,
  },
  mutations: {
    setAllProfile: (state, res) => {
      const {
        profile, profileCurrencies, profileInventory, characters, characterActivities,
      } = res;
      state.profile = profile.data;
      const [firstCharacterId] = profile.data.characterIds;
      state.currentCharacterId = firstCharacterId;
      state.profileCurrencies = profileCurrencies.data;
      state.profileInventory = profileInventory.data;
      state.characters = characters.data;
      state.characterActivities = characterActivities.data[firstCharacterId].availableActivities;
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
