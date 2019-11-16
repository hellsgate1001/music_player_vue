<template>
  <v-app>
    <v-banner>
      <span class="headline">The Wilson Jukebox</span>
      <template v-slot:actions>
        <v-btn text v-for="route in validDisplayRoutes" :key="route.name" @click="$router.push(route.name)">
          {{ route.title }}
        </v-btn>
      </template>
    </v-banner>

    <router-view/>
  </v-app>
</template>

<script>
/* eslint no-console: 0 */

export default {
  name: 'App',

  data: () => {
    return {
      routes: [
        {
          'name': 'home', 'path': '/', 'title': 'Browser'
        },
        {
          'name': 'playlist', 'path': '/playlist', 'title': 'Playlist'
        }
      ]
    }
  },

  computed: {
    validDisplayRoutes() {
      return this.routes.filter((route) => {
        return route.path !== this.$route.path
      });
    }
  }
}
</script>