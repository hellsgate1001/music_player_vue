<template>
  <div>
    <v-row justify="center" align="center">
      <v-progress-circular
        v-if="!isXS"
        :indeterminate="indeterminate"
        :rotate="rotate"
        :size="size"
        :value="value"
        :width="width"
        color="light-blue"
        id="progressRow"
      >
        <div class="display-2 black--text" :class="{ blink_me: isPaused }">
          {{ trackTime }}
        </div>
        <div class="headline black--text">{{ trackLength }}</div>
      </v-progress-circular>

      <v-slider
        v-if="isXS"
        readonly
        :value="value"
        color="light-blue"
      >
        <template v-slot:prepend>
          {{ trackTime }}
        </template>
        <template v-slot:append>
          {{ trackLength }}
        </template>
      </v-slider>
    </v-row>
  </div>
</template>

<script>
/* eslint no-console: 0 */
import moment from "moment";

export default {
  name: "PlayerProgress",

  data: () => {
    return {
      indeterminate: false,
      rotate: 270
    };
  },
  computed: {
    isPaused: {
      get() {
        return this.$store.state.isPaused;
      }
    },
    isXS: {
      get() {
        return this.$store.state.isXS;
      }
    },
    playerInfo: {
      get() {
        return this.$store.state.playerInfo;
      }
    },
    size() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return document.body.clientWidth * 0.8;
        default:
          return (document.body.clientWidth / 3) * 0.5;
      }
    },
    trackLength() {
      if (this.playerInfo.hasOwnProperty("track_length")) {
        const duration = moment.duration(this.playerInfo["track_length"], "ms");
        return `${duration.minutes()}:${this.pad(duration.seconds())}`;
      } else {
        return "";
      }
    },
    trackTime() {
      if (this.playerInfo.hasOwnProperty("track_time")) {
        const duration = moment.duration(this.playerInfo["track_time"], "ms");
        return `${duration.minutes()}:${this.pad(duration.seconds())}`;
      } else {
        return "0:00";
      }
    },
    value() {
      return (
        (this.playerInfo["track_time"] / this.playerInfo["track_length"]) * 100
      );
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return this.size * 0.1;
        default:
          return this.size * 0.06;
      }
    }
  },

  methods: {
    pad(number) {
      let numberString = `${number}`;
      while (numberString.length < 2) {
        numberString = `0${numberString}`;
      }
      return numberString;
    },
  }
}
</script>

<style scoped>
#progressRow {
  margin-bottom: 2em;
}
>>> .v-progress-circular__info {
  flex-direction: column;
}
.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
