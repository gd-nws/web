import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bulma";

// @ts-ignore
import VueGtag from "vue-gtag";
import Meta from "vue-meta";

Vue.use(Meta);
Vue.use(
  VueGtag,
  {
    config: { id: "UA-91643389-1" }
  },
  router
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
