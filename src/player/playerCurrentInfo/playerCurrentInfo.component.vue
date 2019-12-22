<template>
  <h1>Player Current Info</h1>
</template>

<script>
/* eslint no-console: 0 */

export default {
  name: 'PlayerCurrentInfo',

  created() {
    this.$store.commit('setSearch', false);
  },
  computed: {
  }
}
</script>
