<template>
  <div class="loader loader-wrap">
    <span class="loader-animate"></span>
    <span class="loader-text">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    text:{
      default: '正在加载...'
    }
  }
}
</script>

<style lang="scss" scoped>
  .loader-wrap{
    text-align: center;
    height: 80px;
    line-height: 80px;
    .loader-animate{
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      width: 40px;
      height: 40px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFW…Rhn1UTjzjDn6cdw2fI9onG3CqWsEyVQb8SF9W2+48AAwCEmSvliW8SKQAAAABJRU5ErkJggg==);
      background-repeat: no-repeat;
      background-size: 40px;
      animation: loader 1.2s linear;
      animation-iteration-count: infinite;
    }
    .loader-text {

    }
  }
  @keyframes loader {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(1turn);
    }
  }
</style>

