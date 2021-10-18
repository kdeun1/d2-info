import { createStore } from 'vuex';
import { milestones } from '@/store/modules/milestones';

export interface RootState {
  a?: any;
}

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    milestones,
  },
});
