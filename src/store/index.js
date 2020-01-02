/* eslint no-console: 0 */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connected: false,
    currentTrack: 0,
    displaySearch: true,
    filtered: {
      artists: [],
      albums: [],
      tracks: []
    },
    imageUrl: false,
    isPaused: false,
    isXS: false,
    playerInfo: {},
    playing: false,
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
    createImage({ commit }, trackinfo) {
      const artist = trackinfo[0];
      const album = trackinfo[1];
      axios
        .get(`http://192.168.1.20:5000/create-image/${artist}/${album}`)
        .then(response => {
          if (response.data["image_exists"]) {
            commit(
              "setImageUrl",
              `http://192.168.1.20:5000/static/images/${artist.toLowerCase()} - ${album.toLowerCase()}.jpg`
            );
          } else {
            commit("setImageUrl", false);
          }
        });
    },
    filter(context, filterText) {
      axios
        .get(`http://192.168.1.20:5000/filter/${filterText}`)
        .then(response => {
          context.commit("setFiltered", response.data);
          router.push("/search-results");
        });
    },
    getCurrentTrack(context) {
      axios
        .get(`http://192.168.1.20:5000/get-currently-playing`)
        .then(response => {
          context.commit(
            "setCurrentTrack",
            response.data["current_track_index"]
          );
          context.dispatch(
            "createImage",
            context.state.playlist[context.state.currentTrack]
          );
        });
    },
    getPlayerInfo({ commit }) {
      axios.get(`http://192.168.1.20:5000/get-player-info`).then(response => {
        console.log(response.data);
        commit("setPlayerInfo", response.data);
      });
    },
    pausePlayer({ commit }) {
      axios.get("http://192.168.1.20:5000/pause").then(() => {
        commit("setPlaying", false);
        commit("setIsPaused", true);
      });
    },
    playFromPlaylist(context, playlistPosition) {
      axios
        .get(`http://192.168.1.20:5000/play-from-list/${playlistPosition}`)
        .then(() => {
          context.commit("setCurrentTrack", playlistPosition);
          context.commit("setPlaying", true);
          context.dispatch(
            "createImage",
            context.state.playlist[context.state.currentTrack]
          );
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
    },
    resumePlayer({ commit }) {
      axios.get("http://192.168.1.20:5000/resume").then(() => {
        commit("setPlaying", true);
        commit("setIsPaused", false);
      });
    },
    stopPlayer({ commit }) {
      axios.get("http://192.168.1.20:5000/stop").then(() => {
        commit("setPlaying", false);
      });
    }
  },
  mutations: {
    // Playlist
    resetPlaylist(state, tracks = null) {
      state.playlist = [];
      if (tracks) {
        state.playlist.push(...tracks);
      }
    },
    setCurrentTrack(state, currentTrackIndex) {
      state.currentTrack = currentTrackIndex;
    },
    setFiltered(state, filtered) {
      state.filtered = filtered;
    },
    setImageUrl(state, imageUrl) {
      state.imageUrl = imageUrl;
    },
    setIsPaused(state, isPaused) {
      state.isPaused = isPaused;
    },
    setIsXS(state, isXS) {
      state.isXS = isXS;
    },
    setPlayerInfo(state, playerInfo) {
      state.playerInfo = playerInfo;
      state.currentTrack = playerInfo["current_track"];
      state.playing = playerInfo["is_playing"];
      state.isPaused = playerInfo["paused"];
    },
    setPlaying(state, playing) {
      state.playing = playing;
    },
    togglePlaying(state) {
      state.playing = !state.playing;
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
