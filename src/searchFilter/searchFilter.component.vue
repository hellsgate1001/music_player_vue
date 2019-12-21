<template>
  <v-text-field
    class=".d-none"
    v-if="displaySearch"
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
    displaySearch: {
      get() {
        return this.$store.state.displaySearch;
      }
    },
    searchFilter: {
      get() {
        return this.$store.state.searchFilter;
      },
      set(newFilter) {
        this.$store.commit("updateSearchFilter", newFilter);
      }
    },
  }
}
</script>

<style scoped>
.v-text-field {
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
}
>>> .v-input__control {
  position: absolute;
  right: 1em;
  width: 20%;
}
>>> .v-input__slot {
  margin-bottom: 0;
}
</style>
