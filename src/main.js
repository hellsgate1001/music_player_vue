import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    playlist: []
  },
  mutations: {
    // Playlist
    addMultipleToPlaylist(state, tracks) {
      state.playlist.push(...tracks);
    },
    addSingleToPlaylist(state, track) {
      state.playlist.push(track);
    },
    removeSingleFromPlaylist(state, playlistPosition) {
      state.playlist.splice(playlistPosition, 1);
    }
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
