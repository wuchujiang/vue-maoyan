<template>
  <section class="cinema-filter">
    <section class="filter-column">
      <section class="filter-tab">
        <div :class="{'filter-tab-item': true, active: brandIndex === 1}">全城<span class="drop"></span></div>
        <div :class="{'filter-tab-item': true, active: brandIndex === 2}">品牌<span class="drop"></span></div>
        <div :class="{'filter-tab-item': true, active: brandIndex === 3}">特色<span class="drop"></span></div>
      </section>
      <section v-if="Object.keys(region).length > 0">
        <section class="filter-box filter-box-one">
          <section class="brand-tab">
            <section @click="regionTab = 1" class="b-tab-item tab-brand">商区</section>
            <section @click="regionTab = 2" class="b-tab-item tab-subway">地铁站</section>
          </section>
          <section class="brand-tab-box">
              <div class="region-sidenav">
                <ul v-show="regionTab === 1">
                  <li 
                  :class="{'side-nax': true, active: districtIndex === index }" 
                  @click="districtIndex = index" 
                  v-for="(item, index) in district.subItems" 
                  :key="item.id">{{`${item.name}(${item.count})`}}</li>
                </ul>
                <ul v-show="regionTab === 2">
                  <li
                  :class="{'side-nax': true, active: subwayIndex === index }" 
                  @click="subwayIndex = index" 
                  v-for="(item, index) in subway.subItems" 
                  :key="item.id">
                    {{`${item.name}(${item.count})`}}
                  </li>
                </ul>
              </div>
              <div class="region-list">
                <ul>
                  <li class="region-item" 
                  v-for="item in regionList" 
                  :key="item.id">
                    <p class="name">{{item.name}}</p>
                    <span class="count">{{item.count}}</span>
                    </li>
                </ul>
              </div>
          </section>
        </section>
        <section class="filter-box filter-box-second"></section>
        <section class="filter-box filter-box-three"></section>
        <section class="filter-mask"></section>
      </section>
      </section>
  </section>
</template>

<script>
export default {
  name: 'cinema-filter',
  props: ['region'],
  data() {
    return {
      brandIndex: 0,
      regionTab: 1,
      districtIndex: 0,
      subwayIndex: 0,
    }
  },
  computed: {
    district() {
      return this.region.district;
    },
    subway(){
      return this.region.subway;
    },
    regionIndex() {
      return this.regionTab === 1 ? this.districtIndex : this.subwayIndex
    },
    regionList() {
      const subItems =  this.regionTab === 1 ? this.district.subItems:this.subway.subItems;
      return subItems[this.regionIndex].subItems ? subItems[this.regionIndex].subItems : [];
    }
  },
  methods: {
  
  }
}
</script>

<style lang="scss">
  .cinema-filter{
    background: #fff;
    .filter-tab{
      display: flex;
      height: 80px;
      align-items: center;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      text-align: center;
      color: #777;
      .drop{
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 8px;
        border: 8px solid transparent;
        border-top-color: #b0b0b0;
      }
      .filter-tab-item{
        flex: 1;
        height: 50px;
        margin: 15px 0;
        border-right: 1px solid #ddd;
        line-height: 50px;
        &:last-child{
          border: none;
        }
      }
    }
  }
  .brand-tab{
    display: flex;
    height: 88px;
    text-align: center;
    .b-tab-item{
      width: 50%;
      border-bottom: 4px solid transparent;
      font-size: 28px;
      line-height: 88px;
      color: #666;
    }
  }
  .brand-tab-box{
    display: flex;
    background: #f5f5f5;
    margin-right: 30px;
    ul{
      li{
        height: 90px;
        line-height: 90px;
        color: #777;
      }
      .side-nax{
        padding: 0 30px;
      }
      .region-item{
        display: flex;
        align-items: center;
        padding-left: 80px;
        padding-right: 40px;
        .name{
          flex: 1;
        }
        .count{
          width: 40px;
          text-align: center;
        }
      }
    }
    .region-sidenav{
      width: 220px;
      background: #fff;
    }
    .region-list{
      flex: 1;
    }
  }
</style>

