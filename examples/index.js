import "./main.js";

if (module.hot) {
  module.hot.accept("./main.js", () => {
    require("./main");
  });
}
