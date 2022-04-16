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

console.log(
  `(浏览器环境中的 process.env.NODE_ENV) 有两种指定方式 1.通过mode指定 2.通过 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('值')})`,
  process.env.NODE_ENV
);

// 关于host的设置
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
// Vue.use(plugin)
// - 作用：安装插件
// - 注意点：Vue.use() 必须在 new Vue() 之前
// - 源码和详解：详见 README.md

new Vue({
  render: (h) => h(App),
}).$mount("#app");
// 注意 #app 是在 public/index.html 中模版html中指定的容器
// 模版 html 的打包是通过 html-webpack-plugin 来实现的
