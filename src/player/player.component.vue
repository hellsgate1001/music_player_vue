<template>
  <v-container style="height: 85vh">
    <v-row no-gutters>
      <v-col cols="4">
        <player-list></player-list>
      </v-col>
      <v-col cols="4">
        <player-controls></player-controls>
      </v-col>
      <v-col cols="4">
        <player-current-info></player-current-info>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint no-console: 0 */
import PlayerList from "./playerList/playerList.component.vue";
import PlayerControls from "./playerControls/playerControls.component.vue";
import PlayerCurrentInfo from "./playerCurrentInfo/playerCurrentInfo.component.vue";

export default {
  name: "Player",

  components: {
    PlayerList,
    PlayerControls,
    PlayerCurrentInfo
  },

  created() {
    this.$store.commit("setSearch", false);
    this.$store.dispatch("populatePlaylist");
    this.$store.dispatch("getCurrentTrack");
  },
  computed: {
    playlist: {
      get() {
        return this.$store.state.playlist;
      },
      set(newlist) {
        this.$store.commit("resetPlaylist", newlist);
      }
    }
  }
};
</script>
