<template>
	<footer>
		<router-link to="/movie">电影</router-link>
		<router-link to="/cinema">影院</router-link>
		<router-link to="/about">我的</router-link>
	</footer>
</template>

<script>
export default {
  name: "footer"
};
</script>

<style lang="scss" scoped>
@import "../style/base.scss";
footer {
  display: flex;
  height: 100px;
  background: #fff;
  border-top: 1px solid #ddd;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  > a {
    flex: 1;
    text-align: center;
    width: 80px;
    line-height: 80px;
    color: #666;
    &.router-link-active {
      color: $baseColor;
    }
  }
}
</style>

