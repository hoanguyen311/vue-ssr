import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: () => ({
      isLoading: true,
    }),
    mutations: {
      setLoading(state, { isLoading = true }) {
        state.loading = isLoading;
      }
    }
  });
}
