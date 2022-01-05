import Vue from "vue";
import App from "./App.vue";
import DivineUi from "../index.js";
import "../packages/theme-chalk/index.scss";

// 测试引入js是否可用
import { getTimer, TestClass } from "./utils/index";

// 测试 module.noParse()
import jquery from "jquery";
import _ from "lodash";

console.log(jquery, _);
console.log(`getTimer`, getTimer());
console.log(`TestClass`, new TestClass().att);

// 关于host的设置
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const host = {
  dev: {
    baseURL: "http://www.dev.com",
  },
  test: {
    baseURL: "http://www.tes.com",
  },
  prod: {
    baseURL: "http://www.prod.com",
  },
};
console.log(
  `%c host[process.env.HOST_ENV].baseURL -> 可以用webpack.DefinePlugin()中声明的环境变量来使用不同的开发环境对应的后端域名:`,
  "background: yellow;",
  host[process.env.HOST_ENV].baseURL
);

Vue.config.productionTip = false;

Vue.use(DivineUi);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
