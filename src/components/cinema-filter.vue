<template>
  <section class="cinema-filter">
    <section class="filter-column">
      <section class="filter-tab">
        <div @click="toggleTab(1)" :class="{'filter-tab-item': true, active: brandIndex === 1}">{{areaText}}<span class="drop"></span></div>
        <div @click="toggleTab(2)" :class="{'filter-tab-item': true, active: brandIndex === 2}">{{brandText}}<span class="drop"></span></div>
        <div @click="toggleTab(3)" :class="{'filter-tab-item': true, active: brandIndex === 3}">{{serviceText}}<span class="drop"></span></div>
      </section>
      <section v-if="Object.keys(region).length > 0">
        <section v-show="brandIndex === 1" class="filter-box filter-box-one" >
          <section class="brand-tab">
            <section @click="regionTab = 1" :class="['b-tab-item tab-brand', {active: regionTab === 1}]">商区</section>
            <section @click="regionTab = 2" :class="['b-tab-item tab-subway', {active: regionTab === 2}]">地铁站</section>
          </section>
          <section class="brand-tab-box" :style="{height: this.filterTabOneHeight}">
              <div class="region-sidenav">
                <ul v-show="regionTab === 1">
                  <li 
                  :class="{'side-nax': true, active: districtId === item.id }" 
                  @click="districtId = item.id" 
                  v-for="item in district" 
                  :key="item.id">{{`${item.name}(${item.count})`}}</li>
                </ul>
                <ul v-show="regionTab === 2">
                  <li
                  :class="{'side-nax': true, active: lineId === item.id }" 
                  @click="lineId = item.id" 
                  v-for="item in subway" 
                  :key="item.id">
                    {{`${item.name}(${item.count})`}}
                  </li>
                </ul>
              </div>
              <div class="region-list">
                <ul>
                  <li :class="{'region-item': true, active: brandActive(item.id)}" 
                  v-for="item in regionList"
                  @click="selectArea(1,item.id)"
                  :key="item.id">
                    <p class="name">{{item.name}}</p>
                    <span class="count">{{item.count}}</span>
                    </li>
                </ul>
              </div>
          </section>
        </section>
        <section v-show="brandIndex === 2" class="filter-box filter-box-second">
          <ul>
            <li @click="selectArea(2, item.id)" :class="{active: brandId === item.id}" v-for="item in brand" :key="item.id">
              <p class="name">{{item.name}}</p>
              <span class="counter">{{item.count}}</span>
            </li>
          </ul>
        </section>
        <section v-show="brandIndex === 3" class="filter-box filter-box-three">
          <section class="service-box">
            <section class="service-column">
              <h4>特色功能</h4>
              <section class="select-box">
                <div 
                @click="serviceId = item.id" 
                v-for="item in service" 
                :class="{'select-item': true, active: serviceId === item.id}"
                :key="item.id"
                >{{item.name}}</div>
              </section>
            </section>
            <section class="service-column">
              <h4>特色功能</h4>
              <section class="select-box">
                <div 
                @click="hallTypeId = item.id" 
                v-for="item in hallType" 
                :class="{'select-item': true, active: hallTypeId === item.id}"
                :key="item.id"
                >{{item.name}}</div>
              </section>
            </section>
            <div class="service-control">
              <div class="control-reset" @click="serviceId = -1;hallTypeId=-1">重置</div>
              <div class="control-reset confirm" @click="brandIndex=0;searchCinemmas()">确定</div>
            </div>
          </section>
        </section>
        <section v-show="brandIndex > 0" class="filter-mask"></section>
      </section>
      </section>
  </section>
</template>

<script>
export default {
  name: 'cinema-filter',
  props: ['region', 'day', 'cinemaList'],
  model: {
    prop: 'cinemaList',
    event: 'click'
  },
  data() {
    return {
      brandIndex: 0,
      regionTab: 1,
      brandId: -1,
      serviceId: -1,
      hallTypeId: -1,
      stationId: -1,
      areaId: -1,
      lineId: -1,
      districtId: -1,
      filterTabOneHeight: '',
      areaText: '全城',
      serviceText: '特色',
      brandText: '品牌',
    }
  },
  mounted() {
    this.getFilterHeight();
  },

  computed: {
    district() {
      return this.region.district.subItems;
    },
    service() {
      return this.region.service.subItems;
    },
    hallType() {
      return this.region.hallType.subItems;
    },
    brand() {
      return this.region.brand.subItems
    },
    subway(){
      return this.region.subway.subItems;
    },
    regionIndex() {
      return this.regionTab === 1 ? this.districtId : this.lineId;
    },
    regionList() {
      const subItems =  this.regionTab === 1 ? this.district : this.subway;
      const filterItem = subItems.filter(i => i.id === this.regionIndex)[0];
      return filterItem.subItems ? filterItem.subItems : [];
    },
    
  },
  methods: {
    toggleTab(num) {
      this.brandIndex = this.brandIndex !== num ? num : 0;
    },
    selectArea(type,id) {
      if(type === 1) {
        if(this.regionTab === 1) {
          this.areaId = id;
        }else{
          this.stationId = id;
        }
        this.setAreaText();
      } else {
        this.brandId = id;
        this.setBrandText();
      }
      
      this.brandIndex = 0;
      this.searchCinemmas();
    },
    brandActive(id) {
      return (this.areaId === id && this.regionTab === 1) || (this.stationId === id && this.regionTab === 2)
    },
    async searchCinemmas() {
      const params = {
        brandId: this.brandId,
        serviceId: this.serviceId,
        hallTypeId: this.hallTypeId,
        stationId: this.stationId,
        districtId: this.districtId,
        lineId: this.lineId,
        areaId: this.areaId,
        cityId: this.cityId,
        movieId: this.$route.params.id,
        day: this.day,
      };
      const filterMovie = await this.$axios.post(`/ajax/movie?forceUpdate=${new Date().getTime()}`, params);
      this.$emit('click', filterMovie);
    },
     // 获取高度
    getFilterHeight() {
      const h = document.documentElement.clientHeight; // 1334;
      const headerHeight = document.querySelector('.header').clientHeight;
      const showDaysHeight = document.querySelector('.show-days').clientHeight;
      const filterTabHeight = document.querySelector('.filter-tab').clientHeight;
      const filterBoxHeight = h - headerHeight - showDaysHeight * 2 - filterTabHeight;
      this.filterTabOneHeight = filterBoxHeight + 'px';
    },
    setAreaText() {
      if(this.regionTab === 1) {
        const filters = this.district.filter(i => i.id === this.districtId)[0];
        if(filters.subItems && this.areaId !== -1) {
          const filterSub = filters.subItems.filter(i => i.id === this.areaId)[0];
          this.areaText = filterSub.name;
        }else{
          this.areaText = filters.name;
        }
      }else{
        const filters = this.subway.filter(i => i.id === this.lineId)[0];
        if(filters.subItems && this.stationId !== -1) {
          const filterSub = filters.subItems.filter(i => i.id === this.stationId)[0];
          this.areaText = filterSub.name;
        }else{
          this.areaText = filters.name;
        }
      }
    },
    setBrandText() {
      if(this.brandId === -1) {
        return '品牌';
      }
      const filterArr = this.brand.filter(i => i.id === this.brandId)[0];
      this.brandText = filterArr.name;
    },
  },
  watch: {
    brandIndex(index) {
      if(!this.movieInfo) {
        this.movieInfo = document.querySelector('.movie-intro');
      }
      this.movieInfo.style.display = index === 0 ? 'block' : 'none';
    },
  }
}
</script>

<style lang="scss">
@import '../style/base.scss';
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
      &.active{
        color: $baseColor;
        .drop{
          border-top-color: transparent;
          border-bottom-color: $baseColor;
          transform: translateY(-5px);
        }
      }
      &:last-child{
        border: none;
      }
    }
  }
}
.filter-box-one{
  padding-right: 30px;
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
    &.active{
      color: $baseColor;
      border-color: $baseColor;
    }
  }
}
.brand-tab-box{
  display: flex;
  background: #f5f5f5;
  ul{
    li{
      height: 90px;
      line-height: 90px;
      color: #777;
    }
    .side-nax{
      padding: 0 30px;
      &.active{
        color: $baseColor;
        background: #f5f5f5;
      }
    }
    .region-item{
      display: flex;
      align-items: center;
      padding-left: 80px;
      padding-right: 40px;
      &.active{
        color: $baseColor;
        position: relative;
        &::before{
          content: "";
          display: block;
          position: absolute;
          left: 30px;
          top: 36px;
          width: 23px;
          height: 16px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAaCAYAAAA9rOU8AAAABGdBTUEAALGPC/xhBQAABFlJREFUSA3dlltoXFUUhtda+8zMmUnStJPLSSdiUmwrSbAIuZEmNo3RQkFEX0pffBIEfVCkgvRmM7ShWk2q9FkQFF+ib1JNWyQXm5BOhpRACpKHIpZQTYg2t5k5c85erpM6YUhTY0aSgPtl7zP79s2/1/r3Rtimwh0dtDB0rTi1pPcoQhsocFdtEwu8nbhXwI7/ZUUQRdYtQHrS2A4Yrqw05wPhV1HjOwzwrEac15prtxzGA/mzwmryMb4PxFWaMaWBB9HlW7SVyngg98uXQU4SYhUDppC411HOxV2RiiHcKpip2kgoFKpoUuCeRMR2Zkxo5D4G/qTQqujHnh53S45pKhIJ7TD3NDPqqAJqchgcB3SvgHwctipHPBBPlE1XhkWRxeCTBxnhjEHQqgVEYmRcs/vmjsHRmABIDD8smxoz9w8cyJsLlh9i4rNE3GozpGXn8bSL3TvaXxrNBvFwNk0ZD6SgKNgKaYqi4rq05rSIcDsButMqG/0Oe2D5aP4WZbky+DAY09M1ZolppjAelwn/vUzu3RsI7vS3ug6d9gmIy5xGxjFHDM4aGP1+tSKZHWnebqg3wwVvzQaMtl+bmoKZjlxrD8TaXVxnsO+MIn0wzWzLAYylye3aZY30Pg7E248cws9Nwo8MhV/lk3tsqrY2lCvIXfGRJ8qK6iUQu8Q/miRSbQnP2BK55648H/tmraPJ3stAoBkHICWNEo3UnRdELUDfRuLxpeyB67VZVF0wjAYXnKgibpSASBHSrSVXn7cGY9ehb70VRBki/brNfJUQbCII+4guBYP+4xtRaKKmJn/Op9skWa7I0SxnjePqIZedqHVz5Pr6GA9HUOHAyCRo9z0xon4UIIl4i1B3BoLGcS8j1luIxdCscH67wXTBR/BMmtEh5jtJggs7B2M/rjc/u38ltaeb6572KbxsomoTPzBR82/imGeXHqS+LhsfX8yelGl7sL5w3nMBB7qU4moxNMlgvpNAOFU6MHI1M+7f1iumV3Jz9Gc/5b2RdPUPPvIuMLQMNDr9heZraynEcjRG2HxRQLqRdLVkTVpi73bCyA3EA15RJkOfbGnZ76Dzmby+2uRfBlytp7Xic/bM0pelExML3rjfBSS/KHREszovj6Nql8F2NY8nyTltDcSvZdbaaP0IjNg1zTbXV8kV/2FQUbutwfOeWXHRD/JnE1/cm53V4ad2v+Bqo8tHvM/LGnkYxRJKR62+2I2NAmSPfwTG6xQgfHCooRJcvBgw8BUJ7gAB/mGDHVWsfgFQlwzU+1zEFLs8aiv1bnH/UCx74Vzaa8JkAyngT31oHBFLNyU658QCkgqh1HsYMUM8CXiqZHC4P5fNV895LEwGaKa5eb8P7E7TUEflfRiS9Ad5xSc16OF54I7IQGxg9aK5fv8jTAYocbixPJnmzoCiYy6yIZfeYMKPJ0pvDI/luvFa89aFyQAtNjaWOn44wYgRR/Plkp9G4mst+L/57S+eQuIEp8oPOAAAAABJRU5ErkJggg==);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
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
    overflow: scroll;
  }
}
.filter-box-second {
  max-height:754px;
  min-height: 300px;
  overflow: auto;
  ul {
    margin-right: 100px;
    li{
      height: 88px;
      line-height: 88px;
      border-bottom: 2px solid #e8e8e8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 80px;
      padding-right: 30px;
      &.active{
        color: $baseColor;
        position: relative;
        &::before{
          content: "";
          display: block;
          position: absolute;
          left: 30px;
          top: 36px;
          width: 23px;
          height: 16px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAaCAYAAAA9rOU8AAAABGdBTUEAALGPC/xhBQAABFlJREFUSA3dlltoXFUUhtda+8zMmUnStJPLSSdiUmwrSbAIuZEmNo3RQkFEX0pffBIEfVCkgvRmM7ShWk2q9FkQFF+ib1JNWyQXm5BOhpRACpKHIpZQTYg2t5k5c85erpM6YUhTY0aSgPtl7zP79s2/1/r3Rtimwh0dtDB0rTi1pPcoQhsocFdtEwu8nbhXwI7/ZUUQRdYtQHrS2A4Yrqw05wPhV1HjOwzwrEac15prtxzGA/mzwmryMb4PxFWaMaWBB9HlW7SVyngg98uXQU4SYhUDppC411HOxV2RiiHcKpip2kgoFKpoUuCeRMR2Zkxo5D4G/qTQqujHnh53S45pKhIJ7TD3NDPqqAJqchgcB3SvgHwctipHPBBPlE1XhkWRxeCTBxnhjEHQqgVEYmRcs/vmjsHRmABIDD8smxoz9w8cyJsLlh9i4rNE3GozpGXn8bSL3TvaXxrNBvFwNk0ZD6SgKNgKaYqi4rq05rSIcDsButMqG/0Oe2D5aP4WZbky+DAY09M1ZolppjAelwn/vUzu3RsI7vS3ug6d9gmIy5xGxjFHDM4aGP1+tSKZHWnebqg3wwVvzQaMtl+bmoKZjlxrD8TaXVxnsO+MIn0wzWzLAYylye3aZY30Pg7E248cws9Nwo8MhV/lk3tsqrY2lCvIXfGRJ8qK6iUQu8Q/miRSbQnP2BK55648H/tmraPJ3stAoBkHICWNEo3UnRdELUDfRuLxpeyB67VZVF0wjAYXnKgibpSASBHSrSVXn7cGY9ehb70VRBki/brNfJUQbCII+4guBYP+4xtRaKKmJn/Op9skWa7I0SxnjePqIZedqHVz5Pr6GA9HUOHAyCRo9z0xon4UIIl4i1B3BoLGcS8j1luIxdCscH67wXTBR/BMmtEh5jtJggs7B2M/rjc/u38ltaeb6572KbxsomoTPzBR82/imGeXHqS+LhsfX8yelGl7sL5w3nMBB7qU4moxNMlgvpNAOFU6MHI1M+7f1iumV3Jz9Gc/5b2RdPUPPvIuMLQMNDr9heZraynEcjRG2HxRQLqRdLVkTVpi73bCyA3EA15RJkOfbGnZ76Dzmby+2uRfBlytp7Xic/bM0pelExML3rjfBSS/KHREszovj6Nql8F2NY8nyTltDcSvZdbaaP0IjNg1zTbXV8kV/2FQUbutwfOeWXHRD/JnE1/cm53V4ad2v+Bqo8tHvM/LGnkYxRJKR62+2I2NAmSPfwTG6xQgfHCooRJcvBgw8BUJ7gAB/mGDHVWsfgFQlwzU+1zEFLs8aiv1bnH/UCx74Vzaa8JkAyngT31oHBFLNyU658QCkgqh1HsYMUM8CXiqZHC4P5fNV895LEwGaKa5eb8P7E7TUEflfRiS9Ad5xSc16OF54I7IQGxg9aK5fv8jTAYocbixPJnmzoCiYy6yIZfeYMKPJ0pvDI/luvFa89aFyQAtNjaWOn44wYgRR/Plkp9G4mst+L/57S+eQuIEp8oPOAAAAABJRU5ErkJggg==);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
.service-box{
  .service-column{
    padding: 30px;
    h4{
      font-size: 30px;
      margin-bottom: 20px;
    }
    .select-box{
      display: flex;
      padding-right: 30px;
      flex-wrap: wrap;
      .select-item{
        width: 21.3%;
        height: 60px;
        padding: 6px 0;
        margin-right: 3%;
        margin-top: 20px;
        line-height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        border: 2px solid #ccc;
        border-radius: 10px;
        font-size: 26px;
        &.active{
          background: #fcf0f0;
          color: #f03d37;
          border-color: #f03d37;
        }
      }
    }
  }
  .service-control{
    display: flex;
    justify-content: space-between;
    padding: 30px;
    border-top: 2px solid #ddd;
    .control-reset{
      width: 21.3%;
      height: 60px;
      line-height: 60px;
      border: 2px solid #ccc;
      border-radius: 10px;
      font-size: 26px;
      text-align: center;
      &.confirm{
          background: #f03d37;
          color: #fff;
          border-color: #f03d37;
        }
    }
  }
}
</style>

