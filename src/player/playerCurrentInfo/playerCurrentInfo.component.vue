<template>
  <v-container>
    <div class="text-center">
      <img v-if="imageUrl !== ''" :src="imageUrl" />
    </div>
    <v-row no-gutters class="d-none d-sm-flex"> </v-row>
    <v-row v-if="trackInfo" class="primary--text title justify-center">
      {{ trackInfo[2] }}
    </v-row>
    <v-row v-if="trackInfo" class="justify-center">
      {{ trackInfo[0] }} - {{ trackInfo[1] }}
    </v-row>
  </v-container>
</template>

<script>
/* eslint no-console: 0 */

export default {
  name: "PlayerCurrentInfo",

  created() {
    this.$store.commit("setSearch", false);
  },
  computed: {
    currentTrack: {
      get() {
        return this.$store.state.currentTrack;
      }
    },
    imageUrl: {
      get() {
        return this.$store.state.imageUrl;
      }
    },
    playlist: {
      get() {
        return this.$store.state.playlist;
      }
    },
    trackInfo: {
      get() {
        return this.playlist[this.currentTrack];
      }
    }
  }
};
</script>
