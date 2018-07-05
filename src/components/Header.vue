<template>
  <header class="header">
    <div class="header-left"><a v-show="back" href="javascript:;">{{left}}</a></div>
    <div class="header-title"><slot></slot></div>
    <div class="header-right">{{right}}</div>
  </header>
</template>

<script>
export default {
  name: "dheader",
  props: ["left", "right", "back"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../style/base.scss";

.header {
  height: 100px;
  background: $baseColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 38px;
  color: #fff;
  padding: 0 30px;
  .header-left,
  .header-right {
    width: 40px;
  }
  .header-left {
    a {
      display: block;
      width: 45px;
      height: 45px;
      position: relative;
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        width: 32px;
        height: 32px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(45deg);
      }
    }
  }
}
</style>



