<template>
  <div id="app">
    <img alt="Vue logo" src="./logo.jpg" />
    <h1>DIVINE UI</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  & > h1 {
    color: red;
  }
}
</style>