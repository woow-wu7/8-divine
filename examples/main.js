import Vue from "vue";
import App from "./App.vue";
import DivineUi from "../index.js";
import "../packages/theme-chalk/index.scss";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

Vue.config.productionTip = false;

Vue.use(DivineUi);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
