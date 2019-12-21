<template>
  <v-app>
    <v-banner>
      <span class="headline">The Wilson Jukebox</span>
      <template v-slot:actions>
        <search-filter></search-filter>
        <v-btn
          text
          v-for="route in validDisplayRoutes"
          :key="route.name"
          @click="$router.push(route.path)"
        >
          {{ route.title }}
        </v-btn>
      </template>
    </v-banner>

    <router-view />
  </v-app>
</template>

<script>
/* eslint no-console: 0 */
import SearchFilter from './searchFilter/searchFilter.component';

export default {
  name: "App",

  components: {
    SearchFilter
  },

  data: () => {
    return {
      routes: [
        {
          name: "home",
          path: "/",
          title: "Browser"
        },
        {
          name: "playlist",
          path: "/playlist",
          title: "Playlist"
        }
      ]
    };
  },

  computed: {
    displaySearch() {
      console.log(this.$route);
      return this.$route.name === 'home';
    },
    validDisplayRoutes() {
      return this.routes.filter(route => {
        return route.path !== this.$route.path;
      });
    }
  }
};
</script>

<style>
>>>.v-text-field {
  margin-top: 0;
}
</style>
