<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <svg-icon class-name="search-icon" icon-class="el-iconfont-bangzhu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SvgIcon from "@/components/SvgIcon/index.vue";

export default defineComponent({
  components: {
    SvgIcon
  }
});
</script>

<style scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
