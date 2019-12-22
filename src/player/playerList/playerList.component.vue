<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="(track, i) in playlist"
        :key="i"
      >
        <v-container>
          <v-row>
            <v-col class="playerColumn" cols="1">
              {{ i + 1 }}
            </v-col>
            <v-col class="playerColumn" cols="11">
              {{ track[2] }}
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
  name: 'PlayerList',

  created() {
    this.$store.commit('setSearch', false);
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
}
</script>

<style scoped>
.playerColumn {
  padding-bottom: 0;
  padding-top: 0;
}
</style>
