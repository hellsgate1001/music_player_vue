<template>
  <v-container style="height: 85vh">
    <v-row v-if="!isXS" no-gutters>
      <v-col cols="4">
        <player-list></player-list>
      </v-col>
      <v-col cols="4">
        <player-progress></player-progress>
        <player-controls></player-controls>
      </v-col>
      <v-col cols="4">
        <player-current-info></player-current-info>
      </v-col>
    </v-row>
    <v-row v-if="isXS" no-gutters>
      <v-tabs v-model="tab" color="primary" light slider-color="primary">
        <v-tab>
          <v-icon>mdi-playlist-music</v-icon>
        </v-tab>
        <v-tab>
          <v-icon>mdi-play</v-icon>
        </v-tab>
        <v-tab @click="$router.push('/')">
          <v-icon>mdi-home</v-icon>
        </v-tab>
        <v-tab-item>
          <player-list></player-list>
        </v-tab-item>
        <v-tab-item>
          <player-current-info></player-current-info>
          <player-progress></player-progress>
          <player-controls></player-controls>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
/* eslint no-console: 0 */
import PlayerList from "./playerList/playerList.component.vue";
import PlayerControls from "./playerControls/playerControls.component.vue";
import PlayerCurrentInfo from "./playerCurrentInfo/playerCurrentInfo.component.vue";
import PlayerProgress from "./playerProgress/playerProgress.component.vue";

export default {
  name: "Player",

  data: () => {
    return {
      tab: null
    };
  },

  components: {
    PlayerList,
    PlayerControls,
    PlayerCurrentInfo,
    PlayerProgress
  },

  created() {
    this.$store.commit("setSearch", false);
    this.$store.commit('setIsXS', this.$vuetify.breakpoint.name === 'xs')
    this.$store.dispatch("populatePlaylist");
    this.$store.dispatch("getCurrentTrack");
    this.$store.dispatch("getPlayerInfo");
  },
  computed: {
    currentTrack: {
      get() {
        return this.$store.state.currentTrack;
      }
    },
    isXS() {
      return this.$store.state.isXS;
    },
    playlist: {
      get() {
        return this.$store.state.playlist;
      },
      set(newlist) {
        this.$store.commit("resetPlaylist", newlist);
      }
    }
  },
  sockets: {
    get_info(currentTrackInfo) {
      if (currentTrackInfo["current_track"] !== this.currentTrack) {
        this.$store.dispatch(
          "createImage",
          this.playlist[currentTrackInfo["current_track"]]
        );
      }
      this.$store.commit("setPlayerInfo", currentTrackInfo);
      this.$store.commit("setPlaying", currentTrackInfo["is_playing"] === 1);
    }
  }
};
</script>

<style scoped>
>>> img {
  width: 100%;
}
</style>
