import Vue from "vue";
import VueRouter from "vue-router";
import Playlist from "../playlist/playlist.component.vue";
import Browser from "../browser/browser.component.vue";
import Player from "../player/player.component.vue";
import SearchResults from "../searchResults/searchResults.component.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Browser
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/player",
    name: "player",
    component: Player
  },
  {
    path: "/playlist",
    name: "playlist",
    component: Playlist
  },
  {
    path: "/search-results",
    name: "searchResults",
    component: SearchResults
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
