<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "normalize.css";

export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./style/app.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
