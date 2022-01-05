<template>
  <div id="app">
    <img alt="Vue logo" src="./logo.jpg" />
    <h1>DIVINE UI</h1>
    <br />
    <dv-row tag="p" :gutter="20">
      <dv-col :span="12"><div style="background: yellow">dv-col2</div></dv-col>
      <dv-col :span="6"><div style="background: red">dv-col2</div></dv-col>
    </dv-row>

    <section>
      <button @click="lazyLoad">懒加载</button>
    </section>
  </div>
</template>

<script>
// 测试别名
import img1 from "@image/logo.jpg";
console.log(`img1`, img1);

export default {
  name: "App",
  components: {},
  mounted() {
    console.log(`NAME`, NAME);
  },
  methods: {
    lazyLoad() {
      import("./utils/index").then((res) =>
        console.log(`res`, res.getLazyData())
      );
    },
  },
};
</script>

<style lang="scss">
#app {
  & > h1 {
    color: red;
  }
}
</style>