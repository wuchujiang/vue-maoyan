<template>
  <section class="movie-item">
    <div class="movie-img">
      <img :src="data.img.replace('w.h', '160.180')" alt="">
    </div>
    <div class="movie-wrap">
      <div class="movie-content">
        <h4>{{data.nm}}</h4>
        <p v-if="data.globalReleased" class="score">观众评 <span>{{data.sc | toFloat}}</span></p>
        <p v-else class="score"><span>{{data.wish  }}想看</span></p>
        <p class="star">主演:{{data.star}}</p>
        <p class="field">{{data.showInfo}}</p>
      </div>
      <div class="movie-button">
        <span :class="{btn:true, release: !data.globalReleased}">购票</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "movie-item",
  props: ["data"],
  filters: {
    toFloat(num) {
      if (typeof num !== "number") {
        return num;
      }

      if (!Number.isInteger(num)) {
        return num;
      }

      return num.toFixed(1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/base.scss";

.movie-item {
  padding: 0 30px;
  display: flex;
  .movie-img {
    height: 220px;
    overflow: hidden;
    background: #f5f5f5;
    margin-top: 32px;
  }
  .movie-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 24px;
    min-width: 0;
    border-bottom: 2px solid #ddd;
  }
  .movie-content {
    flex: 1;
    min-width: 0;
    padding: 32px 0;
    .score span {
      color: #faaf00;
      font-weight: bold;
      font-size: 30px;
    }
    h4 {
      font-size: 34px;
      color: #333;
      margin: 0;
      @include ellipsis;
      margin-bottom: 10px;
    }
    p {
      @include ellipsis;
      margin-top: 16px;
    }
  }
  .movie-button {
    width: 120px;
    text-align: right;
    .btn {
      width: 94px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      box-sizing: border-box;
      background-color: #f03d37;
      color: #fff;
      border-radius: 8px;
      white-space: nowrap;
      font-size: 12px;
      cursor: pointer;
      font-size: 24px;
      display: block;
      &.release {
        background: #3c9fe6;
      }
    }
  }
}
</style>
