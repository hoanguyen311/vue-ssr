import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import { createRouter } from './router';
import { createStore } from './store';
import App from '@/components/App';

export function createApp() {
  const router = createRouter();
  const store = createStore();
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: (h) => {
      return h(App);
    }
  });

  return {
    app,
    router,
    store
  };
}
