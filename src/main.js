/* eslint no-console: 0 */
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    playlist: [],
    searchFilter: "",
    displaySearch: true
  },
  actions: {
    removeFromPlaylist({ commit }, playlistPosition) {
      axios
        .get(
          `http://192.168.1.20:5000/remove-from-playlist/${playlistPosition}`
        )
        .then(response => {
          commit("resetPlaylist", response.data);
        });
    },
    populatePlaylist({ commit }) {
      axios.get("http://192.168.1.20:5000/get-playlist").then(response => {
        commit("resetPlaylist", response.data);
      });
    },
    addMultipleToPlaylist({commit}, payload) {
      axios
        .get(
          `http://192.168.1.20:5000/add-album-to-playlist/${payload.artist}/${payload.album}`
        )
        .then(response => {
          commit('resetPlaylist', response.data);
        });
    },
    addSingleToPlaylist({commit}, trackinfo) {
      console.log(arguments);
      const artist = trackinfo[0];
      const album = trackinfo[1];
      const tracknum = trackinfo[3];
      axios
        .get(
          `http://192.168.1.20:5000/add-to-playlist/${artist}/${album}/${tracknum}`
        )
        .then(response => {
          commit('resetPlaylist', response.data);
        })
        .catch(error => console.log(error));
    },
  },
  mutations: {
    // Playlist
    resetPlaylist(state, tracks = null) {
      console.log("Reset");
      console.log(tracks);
      state.playlist = [];
      if (tracks) {
        state.playlist.push(...tracks);
      }
    },
    // Search
    setSearch(state, displaySearch) {
      state.displaySearch = displaySearch;
    },
    updateSearchFilter(state, filter) {
      state.searchFilter = filter;
    }
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
