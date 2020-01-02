<template>
  <v-container class="height-85">
    <v-list class="scroll-container">
      <v-subheader>
        Artists
      </v-subheader>
      <v-list-item-group id="artist-group">
        <v-list-item
          v-for="artist in filtered['artists']"
          :key="artist[0]"
        >
          {{ artist[0] }}
        </v-list-item>
      </v-list-item-group>
      <v-subheader>
        Albums
      </v-subheader>
      <v-list-item-group id="artist-group">
        <v-list-item
          v-for="(album, i) in filtered['albums']"
          :key="`${album[1]}-${i}`"
        >
          {{ album[0] }} - {{ album[1] }}
        </v-list-item>
      </v-list-item-group>
      <v-subheader>
        Tracks
      </v-subheader>
      <v-list-item-group id="artist-group">
        <v-list-item
          v-for="(track, i) in filtered['tracks']"
          :key="`${track[2]}-${i}`"
        >
          {{ track[0] }} - {{ track[1] }} - {{ track[2] }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
/* eslint no-console: 0 */
export default {
  name: "SearchResults",

  computed: {
    filtered: {
      get() {
        return this.$store.state.filtered;
      }
    },
  },
}
</script>
