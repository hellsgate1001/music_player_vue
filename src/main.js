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
    currentTrack: 0,
    displaySearch: true,
    playerInfo: {},
    playlist: [],
    searchFilter: ""
  },
  actions: {
    addMultipleToPlaylist({ commit }, payload) {
      axios
        .get(
          `http://192.168.1.20:5000/add-album-to-playlist/${payload.artist}/${payload.album}`
        )
        .then(response => {
          commit("resetPlaylist", response.data);
        });
    },
    addSingleToPlaylist({ commit }, trackinfo) {
      console.log(arguments);
      const artist = trackinfo[0];
      const album = trackinfo[1];
      const tracknum = trackinfo[3];
      axios
        .get(
          `http://192.168.1.20:5000/add-to-playlist/${artist}/${album}/${tracknum}`
        )
        .then(response => {
          commit("resetPlaylist", response.data);
        })
        .catch(error => console.log(error));
    },
    getCurrentTrack({ commit }) {
      axios
        .get(`http://192.168.1.20:5000/get-currently-playing`)
        .then(response => {
          commit("setCurrentTrack", response.data["current_track_index"]);
        });
    },
    getPlayerInfo({commit}) {
      axios.get(`http://192.168.1.20:5000/get-player-info`).then((response) => {
        commit("setPlayerInfo", response.data);
      });
    },
    playFromPlaylist({ commit }, playlistPosition) {
      axios
        .get(`http://192.168.1.20:5000/play-from-list/${playlistPosition}`)
        .then(() => {
          commit("setCurrentTrack", playlistPosition);
        });
    },
    populatePlaylist({ commit }) {
      axios.get("http://192.168.1.20:5000/get-playlist").then(response => {
        commit("resetPlaylist", response.data);
      });
    },
    removeFromPlaylist({ commit }, playlistPosition) {
      axios
        .get(
          `http://192.168.1.20:5000/remove-from-playlist/${playlistPosition}`
        )
        .then(response => {
          commit("resetPlaylist", response.data);
        });
    }
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
    setCurrentTrack(state, currentTrackIndex) {
      state.currentTrack = currentTrackIndex;
    },
    setPlayerInfo(state, playerInfo) {
      state.playerInfo = playerInfo;
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
