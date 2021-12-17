import Row from "./packages/row/index.js";
// import Col from "./packages/col/index.js";

// components 存放所有element中的组件
const components = [Row];

// 每个Vue的插件都有一个 ( install函数 ) 或者 (  本身就是一个函数时直接调用 )
const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component); // 全局注册element中俄每个组件
  });
};

export default {
  install,
};
