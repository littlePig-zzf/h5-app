import Vue from "vue";
// import { AlertPlugin, LoadingPlugin, ToastPlugin } from "vux";
import router from "./router";
import App from "./App.vue";

import store from "./store";
import { api } from "./request/api";

const FastClick = require("fastclick");
FastClick.attach(document.body);

Vue.prototype.$api = api;

// Vue.use(AlertPlugin);
// Vue.use(LoadingPlugin);
// Vue.use(ToastPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
