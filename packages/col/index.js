import Col from "./src/col";

// Row的时候为什么不叫 ElRow ？

/* istanbul ignore next */
Col.install = function (Vue) {
  Vue.component(Col.name, Col);
};

export default Col;
