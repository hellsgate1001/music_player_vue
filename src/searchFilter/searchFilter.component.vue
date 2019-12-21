<template>
    <v-text-field
        v-if="displaySearch()"
        label="Search..."
        id="search-filter"
        v-model="searchFilter"
    ></v-text-field>
</template>

<script>
/* eslint no-console: 0 */

export default {
  name: 'SearchFilter',

  computed: {
    searchFilter: {
      get() {
        return this.$store.state.searchFilter;
      },
      set(newFilter) {
        this.$store.commit("updateSearchFilter", newFilter);
      }
    },
  },

  methods: {
    displaySearch() {
      console.log(this.$route);
      return this.$route.name === 'home';
    }
  }
}
</script>
