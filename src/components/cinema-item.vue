<template>
  <section class="cinema-item">
    <h4>{{data.nm}}<span class="price">{{data.sellPrice}} <i>元起</i></span></h4>
    <div class="flex address">
      <p class="site">{{data.addr}}</p>
      <span class="distance">{{data.distance}}</span>
    </div>
    <div class="hallType"></div>
    <div class="label-block"></div>
    <div class="discount-block">
      <span v-if="data.tag.snack === 1" class="snack">小吃</span>
      <span v-if="data.tag.vipTag" class="viptag">{{data.tag.vipTag}}</span>
      <template v-if="data.tag.hallType"><span class="hallType" v-for="item in data.tag.hallType" :key="item">{{item}}</span></template></div>
    <div v-if="data.promotion.cardPromotionTag" class="card">{{data.promotion.cardPromotionTag}}</div>
    <div class="show-block">近期场次:{{data.showTimes}}</div>
    
  </section>
</template>
<script>
export default {
  name: 'cinema-item',
  props: ['data'],
}
</script>

<style lang="scss">
@import '../style/base.scss';
.cinema-item{
  margin-left: 30px;
  border-bottom: 2px solid #ddd;
  padding: 30px 30px 30px 0;
  h4{
    margin-top: 20px;
    font-size: 36px;
    margin-bottom: 18px;
    font-weight: normal;
    color: #000;
  }
  .flex{
    display: flex;
    align-items: center;
  }
  .address, .discount-block, .card{
    color: #666;
    margin-bottom: 18px;
    font-size: 28px;
    .site{
      flex: 1;
      padding-right: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .distance{
      width: 60px;
      text-align: center;
    }
  }
  .price{
    color: $baseColor;
    padding-left: 10px;
    i{
      font-size: .8em;
      font-style: normal;
    }
  }
  .discount-block, .show-block, .card{
    color: #999;
  }
  .discount-block{
    span{
      &.snack{
        color: #f90;
      }
      &.viptag{
        color: #f90;
      }
      &.hallType{
        color: #589daf;
        border-color: #589daf;
      }
      padding: 0 6px;
      font-size: 24px;
      border: 1px solid #f90;
      border-radius: 4px;
      margin-right: 10px;
    }
  }
}
</style>

