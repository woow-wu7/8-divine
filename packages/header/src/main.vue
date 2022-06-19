<template lang="">
  <header class="header" :style="{ height: height + 'px' }"></header>
</template>
<script>
export default {
  name: "ElHeader",
  componentName: "ElHeader",

  props: {
    height: {
      type: [Number, String],
      default: 60,
    },
  },
};
</script>

