<template>
  <section class="show-days">
    <ul class="show-box">
      <li 
      :class="{'show-day': true, active: item.day === date}" 
      v-for="(item, index) in data"
      @click="changeDay(item.day)" 
      :key="index">{{item.desc}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'show-days',
  model: {
    prop: 'date',
    event: 'change'
  },
  props: ['data', 'date', 'onChange'],
  methods: {
    changeDay(day) {
      this.$emit('change', day);
      this.$emit('onChange', day);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/base.scss';

.show-days{
  position: relative;
  z-index: 100;
  .show-box{
    white-space: nowrap;
    overflow: auto;
    background: #fff;
    height: 86px;
  }
  .show-day{
    &.active{
      border-color:#f03d37;
      color: #f03d37;
    }
    border-bottom: 4px solid transparent;
    position: relative;
    display: inline-block;
    width: 230px;
    line-height: 86px;
    margin-left: 9px;
    font-size: 28px;
    text-align: center;
    color: #666;
  }
}
</style>


