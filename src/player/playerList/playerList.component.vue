<template>
  <v-list>
    <v-subheader>CT is {{ currentTrack }} - {{ ctType }}</v-subheader>
    <v-list-item-group>
      <v-list-item v-for="(track, i) in playlist" :key="i">
        <v-container @dblclick="playTrack(i)">
          <v-row
            :class="`${currentTrack === i ? 'red--text' : ''}`"
          >
            <v-col class="playerColumn" cols="1">
              {{ i + 1 }}
            </v-col>
            <v-col class="playerColumn" cols="11">
              {{ track[2] }}
              <span v-if="currentTrack === i">Playing</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="playerColumn caption" cols="10" offset="1">
              {{ track[0] }} - {{ track[1] }}
            </v-col>
            <v-col class="playerColumn" cols="1">
              <v-icon>
                mdi-dots-horizontal
              </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
/* eslint no-console: 0 */

export default {
  name: "PlayerList",

  created() {
    this.$store.commit("setSearch", false);
  },
  computed: {
    currentTrack: {
      get() {
        return this.$store.state.currentTrack;
      }
    },
    ctType() {
      return typeof this.currentTrack;
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

  methods: {
    playTrack(track_index) {
      this.$store.dispatch("playFromPlaylist", track_index);
    }
  }
};
</script>

<style scoped>
.playerColumn {
  padding-bottom: 0;
  padding-top: 0;
}
</style>
