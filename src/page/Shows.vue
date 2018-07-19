<template>
  <section class="shows" v-if="Object.keys(detail).length > 0"> 
    <section class="cinema-info flex">
      <div class="flex-item flex-left">
        <h4>{{detail.cinemaData.nm}}</h4>
        <p class="addr">{{detail.cinemaData.addr}}</p>
      </div>
      <div class="flex-item flex-right">
        <div class="map">
          <img src="data:image/png;base64,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" alt="">
        </div>
      </div>
    </section>
      <div class="movie-banner nav-swiper">
        <div class="swiper-bg" :style="{backgroundImage: `url(${movieItem.img.replace('w.h', '296.416')})`}"></div>
        <div class="swiper-filter"></div>
        <div class="swiper-container" @transitionend="transitionend">
          <div :class="['slider-item',{active: index === sliderIndex}]" @click="clickImg(index)" v-for="(item, index) in detail.showData.movies" :key="item.id">
            <div class="post">
              <img :src="item.img | tranformImg('130.190')" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="line"></div> -->
  </section>
</template>
<style lang="scss">
body{
  background: #fff;
}
.flex{
  display: flex;
  align-items: center;
  height: 148px;
  padding: 27px 0 27px 30px;
  box-sizing: border-box;
  .flex-left{
    flex: 1;
    h4{
      height: 48px;
      line-height: 48px;
      font-size: 32px;
    }
    .addr{
      line-height: 36px;
      margin-top: 10px;
      color: #666;
    }
  }
  .flex-right{
    width: 140px;
    height: 68px;
    border-left: 2px solid #ddd;
    img{
      margin: 0 auto;
      display: block;
      width: 40px;
      margin-top: 10px;
    }
  }
}
.nav-swiper{
  padding: 40px 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
  .swiper-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
    filter: blur(30px);
    background-position-y: 40%;
  }
  .swiper-filter{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #40454d;
    opacity: .55;
  }
}
.swiper-container{
  width: 500px;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  transition-property: transform;
  .slider-item{
    width: 130px;
    height: 190px;
    margin-right: 30px;
    &.active{
      .post{
        transform: scale(1.15);
        border: 4px solid #fff;
        position: relative;
        &:before{
          content: "";
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 10px;
          background: url('../img/arrow_down.png') no-repeat;
          background-size: contain;
        }
      }
    }
    .post{
      width: 130px;
      transition: transform .3s;
    }
    img{
      height: 190px;
      width: 100%;
      transform: scale(1);
    }
  }
}
.line{
  position: fixed;
  left: 50%;
  top: 0;
  height: 100%;
  width: 2px;
  background: red;
}
</style>

<script>
import {mapMutations} from 'vuex';

export default {
  name: 'shows',
  created() {
    this.setState({footShow: false});
  },
  mounted() {
    this.fetchCinemaDetail();
  },
  data() {
    return {
      detail: {},
      sliderIndex: 0,
    }
  },
  methods: {
   ...mapMutations(['setState']),
   async fetchCinemaDetail() {
    const detail = await this.$axios.get(`/ajax/cinemaDetail?cinemaId=${this.$route.params.id}&movieId=${this.$route.query.movieId}`)
    this.detail = detail;
   },
   clickImg(index) {
     this.sliderIndex = index;
     if(!this.sliderItem) {
       this.sliderItem = [...document.querySelectorAll('.slider-item')];
       this.sliderContainer = document.querySelector('.swiper-container');
       this.w = document.documentElement.clientWidth;
       this.sliderWidth = this.sliderItem.clientWidth;
       this.sliderWidth = this.sliderItem[0].clientWidth;
     }
    const left = this.sliderItem[index].offsetLeft + this.sliderWidth / 2;
    console.log(left, this.sliderWidth);
    const distance = -(left - this.w / 2);
    this.sliderContainer.style.transform = `translate3d(${distance}px, 0,0)`;
    this.sliderContainer.style.transitionDuration = `300ms`;
   },
   transitionend() {
    this.sliderContainer.style.transitionDuration = `0ms`;  
   }
  },
  computed: {
    movieItem() {
      return this.detail.showData.movies[this.sliderIndex];
    }
  }

}
</script>

