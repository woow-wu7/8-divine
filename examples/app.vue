<template>
  <div id="app">
    <img alt="Vue logo" src="./logo.jpg" />
    <h1>DIVINE UI</h1>
    <br />
    <dv-row tag="p" :gutter="20">
      <dv-col :span="12"><div style="background: yellow">dv-col2</div></dv-col>
      <dv-col :span="6"><div style="background: red">dv-col2</div></dv-col>
    </dv-row>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    console.log(`NAME`, NAME);
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