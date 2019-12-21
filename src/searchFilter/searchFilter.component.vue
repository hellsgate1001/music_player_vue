<template>
    <v-text-field
        v-if="displaySearch"
        label="Search..."
        id="search-filter"
        v-model="searchFilter"
    ></v-text-field>
</template>

<script>
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
  }
}
</script>
