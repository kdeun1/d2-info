import { Module } from 'vuex';
import { RootState } from '@/store';
import { DestinyPublicMilestone, getPublicMilestonesAPI } from '@/api/destiny2';

export interface State {
  publicMilestones: {
    [key: number]: DestinyPublicMilestone;
  };
}

export const milestones: Module<State, RootState> = {
  namespaced: true,
  state: {
    publicMilestones: {},
  },
  mutations: {
    setPublicMilestones: (state: State, publicMilestonesInfo: any) => {
      state.publicMilestones = publicMilestonesInfo;
    },
  },
  actions: {
    dispatchPublicMilestones: async ({ commit }) => {
      const { data } = await getPublicMilestonesAPI();
      await commit('setPublicMilestones', data.Response);
    },
  },
  getters: {
    getPublicMilestones: (state: State) => state.publicMilestones,
  },
};
