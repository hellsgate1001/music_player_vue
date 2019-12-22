<template>
  <div>
    <v-row justify="center" align="center" id="progressRow">
      <v-progress-circular
        :indeterminate="indeterminate"
        :rotate="rotate"
        :size="size"
        :value="value"
        :width="width"
        color="light-blue"
      >
        <div class="display-2 black--text">{{ trackTime }}</div>
        <div class="headline black--text">{{ trackLength }}</div>
      </v-progress-circular>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-hover>
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="`${hover ? 'green--text' : ''}`"
        >
          mdi-skip-previous
        </v-icon>
      </v-hover>
      <v-hover v-if="!playing">
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="`${hover ? 'green--text' : ''}`"
          @click="togglePlaying()"
        >
          mdi-play
        </v-icon>
      </v-hover>
      <v-hover v-if="playing">
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="`${hover ? 'green--text' : ''}`"
          @click="togglePlaying()"
        >
          mdi-pause
        </v-icon>
      </v-hover>
      <v-hover>
        <v-icon
          x-large
          slot-scope="{ hover }"
          :class="`${hover ? 'green--text' : ''}`"
        >
          mdi-skip-next
        </v-icon>
      </v-hover>
    </v-row>
  </div>
</template>

<script>
/* eslint no-console: 0 */
import moment from 'moment';

export default {
  name: "PlayerControls",

  data: () => {
    return {
      indeterminate: false,
      playing: false,
      rotate: 270,
      value: 100 / 3,
    };
  },
  created() {
    this.$store.commit("setSearch", false);
    this.$store.dispatch("getPlayerInfo");
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
    size() {
      // console.log(document.getElementById('progressRow').offsetWidth);
      return (document.body.clientWidth / 3) * 0.5;
    },
    trackLength() {
      const duration = moment.duration(this.playerInfo['track_length'], 'ms');
      return `${duration.minutes()}:${this.pad(duration.seconds())}`;
    },
    trackTime() {
      const duration = moment.duration(this.playerInfo['track_time'], 'ms');
      return `${duration.minutes()}:${this.pad(duration.seconds())}`;
    },
    width() {
      return this.size * 0.06;
    },
  },

  methods: {
    pad(number) {
      let numberString = `${number}`;
      while (numberString.length < 2) {
        numberString = `0${numberString}`;
      }
      return numberString;
    },
    togglePlaying() {
      this.playing = !this.playing;
    },
  },
};
</script>

<style scoped>
#progressRow {
  margin-bottom: 2em;
}
.v-icon:hover {
  cursor: pointer;
}
>>> .v-progress-circular__info {
  flex-direction: column;
}

</style>
