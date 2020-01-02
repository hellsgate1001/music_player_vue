<template>
  <v-app>
    <v-banner class="d-none d-sm-flex">
      <!-- <span class="headline">The Wilson Jukebox</span> -->
      <!-- <v-text-field
        id="filterText"
        label="Search"
        append-outer-icon="mdi-magnify"
        @click:append-outer="filter()"
      >
      </v-text-field> -->
      <template v-slot:actions>
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

export default {
  name: "App",

  data: () => {
    return {
      routes: [
        {
          name: "home",
          path: "/",
          title: "Browser"
        },
        {
          name: "player",
          path: "/player",
          title: "Player"
        },
        // {
        //   name: "playlist",
        //   path: "/playlist",
        //   title: "Playlist"
        // }
      ]
    };
  },

  created() {
    console.log("App created");
  },
  computed: {
    isXS() {
      return this.$store.state.isXS;
    },
    validDisplayRoutes() {
      return this.routes.filter(route => {
        return route.path !== this.$route.path;
      });
    }
  },
  methods: {
    filter() {
      this.$store.dispatch('filter', document.getElementById('filterText').value);
    }
  }
};
</script>

<style>
.height-85 {
  height: 85vh;
}
.scroll-container {
  height: 100%;
  overflow: auto;
}
</style>
