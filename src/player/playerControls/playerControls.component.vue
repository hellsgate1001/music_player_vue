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
        Some Text
      </v-progress-circular>
    </v-row>
          <v-row class="d-flex justify-space-around">
              <v-icon x-large>mdi-skip-previous</v-icon>
              <v-icon x-large>mdi-play</v-icon>
              <v-icon x-large>mdi-skip-next</v-icon>
          </v-row>
  </div>
</template>

<script>
/* eslint no-console: 0 */

export default {
  name: 'PlayerControls',

  data: () => {
    return {
      indeterminate: false,
      rotate: 270,
      // size: 32,
      // width: 4,
      value: 100 / 3
    };
  },
  created() {
    this.$store.commit('setSearch', false);
  },
  computed: {
    size() {
      // console.log(document.getElementById('progressRow').offsetWidth);
      return (document.body.clientWidth / 3) * 0.5;
    },
    width() {
      return this.size * 0.06;
    }
  }
}
</script>

<style scoped>
#progressRow {
  margin-bottom: 2em;
}
</style>
