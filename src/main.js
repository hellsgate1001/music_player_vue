/* eslint no-console: 0 */
import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: `//${window.location.hostname}:5000`,
    reconnection: false,
    vuex: {
      store,
      actionPrefix: "SOCKET_"
    }
  })
);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
