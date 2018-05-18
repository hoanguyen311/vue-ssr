import Vue from 'vue';
import { fetchItem } from '@/api';

export default {
  namespaced: true,
  state: () => ({}),
  actions: {
    async fetch({ commit }, id) {
      commit('setLoading', { isLoading: true }, { root: true });
      const item = await fetchItem(id);
      commit('setItem', { id, item });
      commit('setLoading', { isLoading: false }, { root: true });
    }
  },
  mutations: {
    setItem(state, { id, item }) {
      Vue.set(state, id, item);
    }
  }
};
