<template>
  <div>
    <v-row class="d-flex justify-space-around">
      <v-hover>
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="`${hover ? 'green--text' : ''}`"
          @click="previous()"
        >
          mdi-skip-previous
        </v-icon>
      </v-hover>
      <v-hover>
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="
            `${(hover ? 'green--text' : '',
            playing ? '' : 'grey--text text--lighten-2')}`
          "
          @click="pause()"
        >
          mdi-pause
        </v-icon>
      </v-hover>
      <v-hover>
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="
            `${(hover ? 'green--text' : '',
            playing ? 'grey--text text--lighten-2' : '')}`
          "
          @click="play()"
        >
          mdi-play
        </v-icon>
      </v-hover>
      <v-hover>
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="
            `${(hover ? 'green--text' : '',
            playing ? '' : 'grey--text text--lighten-2')}`
          "
          @click="stop()"
        >
          mdi-stop
        </v-icon>
      </v-hover>
      <v-hover>
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="`${hover ? 'green--text' : ''}`"
          @click="next()"
        >
          mdi-skip-next
        </v-icon>
      </v-hover>
    </v-row>
  </div>
</template>

<script>
/* eslint no-console: 0 */

export default {
  name: "PlayerControls",

  created() {
    // alert('Loaded controls');
    this.$store.commit("setSearch", false);
  },
  computed: {
    currentTrack: {
      get() {
        return this.$store.state.currentTrack;
      }
    },
    playerInfo: {
      get() {
        return this.$store.state.playerInfo;
      }
    },
    playing: {
      get() {
        return this.$store.state.playing;
      }
    },
    playlist: {
      get() {
        return this.$store.state.playlist;
      }
    },
  },

  methods: {
    next() {
      const newTrackIndex =
        this.currentTrack == this.playlist.length - 1
          ? 0
          : this.currentTrack + 1;
      this.$store.commit("setCurrentTrack", newTrackIndex);
      this.$store.dispatch("playFromPlaylist", this.currentTrack);
    },
    pause() {
      this.$store.dispatch("pausePlayer");
    },
    play() {
      this.$store.dispatch("resumePlayer");
      this.$store.dispatch("createImage", this.playlist[this.currentTrack]);
    },
    previous() {
      const newTrackIndex =
        this.currentTrack === 0
          ? this.playlist.length - 1
          : this.currentTrack - 1;
      this.$store.commit("setCurrentTrack", newTrackIndex);
      this.$store.dispatch("playFromPlaylist", this.currentTrack);
    },
    stop() {
      this.$store.dispatch("stopPlayer");
    }
  }
};
</script>

<style scoped>
.v-icon:hover {
  cursor: pointer;
}
</style>
