<template>
  <section class="movie-intro">
    <section class="movie-filter"></section>
    <section class="poster-bg" :style="{'backgroundImage': 'url('+movieImg.replace('w.h', '141.200')+')'}"></section>
    <section class="movie-box">
      <div class="movie-img">
        <img :src="movieImg | tranformImg('220.300')" alt="">
      </div>
      <div class="movie-infomation">
        <h4>{{data.nm}}</h4>
        <p class="sub-title">{{data.enm}}</p>
        <p class="m-sore">
          <span class="sore">{{data.sc | toFloat}}</span>
          <span>({{data.snum}}万人评)</span>
        </p>
        <p class="m-info">{{data.cat}}</p>
        <p class="m-info">{{data.src}}/{{data.dur}}</p>
        <p class="m-info">{{data.pubDesc}}</p>
      </div>
      <div class="arrow">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAAS5JREFUOBGVkktuwkAMhpOoJ+hhSouE2HbDgiVCNCAOVtQHnINHhbgMJ6g6/f9gR848kmDJeOzxZ3scskzEOfcKXUMLjXXZByYQhJlqMvz3PM//1E9Z7fJoEp5wXvWZoILRZQtg7xVYdhXQzuR2XoEB/NYCOSkVdKI/g441BnuBbmI7aMAE7ilgxyaboYOD4RMO9EWiTwhgJksBLtEvUNolRmGvwJG+yDNsXSB4s2aplR3M4Y80BnuGfiQ7m0Q2qP6JJvaLc/VpTKx5lPe9IfpibviMb+4lOXYXyGLRsRPgSTsSpASdW8Av+YQ3Er+NzgIuELdvZMcAZIUaBsgpCA55IZIEeV+NLSC32hskXCTAH9xFRyWkUsgSrhqAJfjpL8fch0dMMIGWMkmYEIn8Az5Wgp5LHlhmAAAAAElFTkSuQmCC"/>
      </div>
    </section>
  </section>
</template>

<style lang="scss">
  .movie-intro{
    height: 376px;
    position: relative;
    overflow: hidden;
    color: #fff;
    .poster-bg{
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
      position: absolute;
      filter: blur(.5rem);
      background-size: cover;
      background-repeat: no-repeat;
      opacity: .55;
    }
    .movie-filter{
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: #333;
    }
    .movie-box{
      display: flex;
      align-items: center;
      padding: 30px;
      h4{
        font-size: 40px;
      }
      p{
        font-size: 24px;
        margin-top: 18px;
        opacity: .8;
      }
      .sore{
        font-size: 36px;
        color: #fc0;
        font-weight: bold;
      }
    }
    .movie-img{
      width: 220px;
      height: 300px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .movie-infomation{
      flex: 1;
    }
    .arrow{
      width: 20px;
      transform: translateY(-50%);
    }
    .movie-infomation{
      margin-left: 30px;
    }
  }
</style>

<script>
export default {
  name: 'movie-introduction',
  props: ['data'],
  computed: {
    movieImg() {
      if(this.data.img) {
        return this.data.img
      } {
        return ''
      }
    }
  }
}
</script>


