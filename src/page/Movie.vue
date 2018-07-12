<template>
    <section class="movie">
      <section class="min-header">
        <div class="city"><router-link to="/city">{{locationCity}}<i class="city-entry-arrow"></i></router-link></div>
        <div class="tab-link">
          <span :class="{ active: tabIndex===0, 'tab-item': true }" @click="selectTab(0)">正在热映</span>
          <span :class="{ active: tabIndex===1, 'tab-item': true }" @click="selectTab(1)">即将上映</span>
        </div>
        <div class="search"></div>
      </section>
      <section class="movie-body">
        <section v-show="tabIndex===0">
          <list-item :key="data.id" v-for="data in movieList" :data="data"></list-item>
        </section>
        <section v-show="tabIndex===1">
          <section class="most-expected">
            <p class="most-ex-title">近期最受欢迎</p>
            <section class="expected-movie-box">
              <section class="mu-item" v-for="item in expectedList" :key="item.id">
                <div class="mu-i-img">
                  <img :src="item.img.replace('w.h', '180.230')" alt="">
                  <p class="wish">{{item.wish}}人想看</p>
                </div>
                <div class="mu-i-title">{{item.nm}}</div>
                <div class="mu-i-date">{{item.comingTitle.split(' ')[0]}}</div>
              </section>
            </section>
          </section>
          <section class="will-show">
            <section class="wi-col" :key="index" v-for="(item,index) in comingList">
              <div class="wi-col-date">{{item.title}}</div>
              <section class="wi-mov-box">
                <list-item v-for="data in item.value" :key="data.id" :data="data"></list-item>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
</template>

<script>
import listItem from "@/components/list-item";
import Cookies from 'js-cookie';
import {mapMutations} from 'vuex';
import Vue from 'vue';

export default {
  name: "movie",
  components: { listItem },
  data() {
    return {
      tabIndex: 0,
      movieList: [],
      willList: [],
      locationCity: "北京",
      expectedList: [],
      comingList: [],
    };
  },
  methods: {
    ...mapMutations(['setState']),
    selectTab(index) {
      this.tabIndex = index;
    },
    async fetchMovieList() {
      const movieList = await this.$axios.get("/ajax/movieOnInfoList");
      this.movieList = movieList.movieList;
    },
    async fetchExpected() {
      const movieList = await this.$axios.get("/ajax/mostExpected?ci=40&limit=10&offset=0&token=");
      this.expectedList = movieList.coming;
    },
    async fetchCominglist() {
      const movieList = await this.$axios.get('/ajax/comingList?ci=30&token=&limit=10');
      const coming = movieList.coming;
      const hash = {};

      coming.forEach(item => {
        const rt = item.rt;
        if(hash[rt]) {
          hash[rt].push(item)
        }else{
          hash[rt] = [item];
        }
      });
      
      // hash to array
      let hashKey = Object.keys(hash);
      hashKey.sort((a, b) => {
        return new Date(a) > new Date(b)
      });
      this.comingList = hashKey.map(i => ({
        title: hash[i][0].comingTitle,
        value: hash[i],
      }));
    }
  },
  created() {
    this.setState({headerTitle: '猫眼电影'});
    const localCity = Cookies.get("ci");
    if (localCity) {
      const temp = decodeURIComponent(localCity).split(',');
      if(temp.length) {
        this.locationCity = temp[1];
      }
    }
    this.fetchMovieList();
  },
  watch:{
    tabIndex(tab) {
      if(tab === 1 && this.expectedList.length === 0) {
        this.fetchExpected();
        this.fetchCominglist();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/base.scss";
.movie {
  margin-top: 88px;
}
.min-header {
  display: flex;
  height: 88px;
  position: fixed;
  left: 0;
  top: 100px;
  right: 0;
  border-bottom: 1px solid #ddd;
  align-items: center;
  justify-content: space-between;
  line-height: 88px;
  background: #fff;
  z-index: 100;
  .city,
  .search {
    width: 100px;
    height: 100%;
  }
  .tab-link {
    display: flex;
    justify-items: center;
    .tab-item {
      margin: 0 30px;
      border-bottom: 2px solid transparent;
      padding: 0 20px;
      &.active {
        color: $baseColor;
        border-color: $baseColor;
      }
    }
  }
  .city {
    margin-left: 30px;
    .city-entry-arrow {
      width: 0;
      height: 0;
      border: 8px solid #b0b0b0;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
      display: inline-block;
      margin-left: 8px;
      margin-top: 10px;
    }
  }
  .search {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABC1JREFUWAntWEtrU1EQPpO+ArYm1Y1I3VRXgu5EoSpVQaxCxUVxYTeCv8CtoFVxW0F/gBsLiguxoBaxWHyLS0EEdWWobrRprZC+cpzv3NyTOfeR3DS3duOF5M6ZMzPflzmvOVHq/9NcBqhRdz001D43UziktR5k35382ao1bUUcIj3NL3w+EtH4xu6eZ3Tv3iL6VvskJjh/vH/Lcql0UZM6o7TamAiQ1BxpNdaazV7pfDT1I5FPwKguQT0w0FFcLF5QSp9nYhsC/smapP5wfkfz7flr9PjxQjInz6omQZO1hdJ9rdW+RoLG2RKpt60d2VONZDOW4PyRA7uX9NJDBuuJACzwhHuQ0ZmHPNe+dm1qxbxTv38t83zU28tUPqG0Phnn25ah451P33yIiBtSRRJE5pZKpfchAKJp0vpSbvO2Wzz5V0LRhIIXU8vsz29nNdFlJmsWkegutGWze5JkMkQQc252cWYqYljH850twzT+6rcAqivqwb6u4vzKbTbEqrcPhjvX3t1fb05mrEdFwIIIkSN1I3/w2KlGySEkfOCrVOamxAKGt/ikNiw7GTRDu1D6Elit44bcyEg57J5co0dGMsXnE/fZo5pJXt1tHdkdtYbaySD2OYcczzkzrE2Sw88gjoFYvLjMgjI/jbctg2ka0V+WIE4IswkLOyyI1QyrCOGIiIWYUglMYEudlC1BHF+BE6KA1SqN05ArMQs2Fp9KBtsqXMESrJyt1V7e5+ptJVXj5JKJybGlRwhbdFqCrMPBbx9swraRshAR28GWcJKgs5nihJCGacoRsR1siWUJ+iWT3+kfX347zXcwdhBbYlmCUrkOso7DtAQrxaa1w8FvGykLwdiM/T0OwhJkg+oGyg1UJXFOzeojYjvYMr4k+FF2mJJJKlKUI2I72BLKEsQdQnagnkPJ5OhSaJiYXq1oo4WwbQ+XGL6MC47iO4Tf5ncP6jnRTkWsxKwWwYxpsGOiW4K4feGCI+1QbKKek7pmZMQyBawIAkxgC5UjWoLQ4vbFWeQLTuXhShjFJkolX7Xatym3ULjK6pqxDGaNoA6wV5fRaMB+sPhi4nozJL1a8IlbCxoQGq1VC8LEKVih+Icl/2cu+Xc1XPLDAVdD5loticCcK+Hin/Kn4uF955KsbtjAFj7wNRGcL+qdW5wFTs0nlEHfeg2vnT4EF9e0QoqGc5Ov71hlQIglCLs1uLh/5lnVyyeJ3V9Bkne7M/nJV3cD3EzTWSRBA0xgXA35p151VnfQsF4bOwPHwJwDGY+U5+SRLY8Vj/SdjgpTM4PSwWQzpT+PPDLlsSSZTEzQJ8uTP5W/35KSbJigTzSNdxxJamnpyz15+Q4YNedgGiRqxfAWRnhO6pWy3ZbWlSDIR5EkpV/4P2xdh9gngffs0f17kTmQy02+mZB9/+VmMvAXE7/38O8tTYkAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-position: center;
  }
  
}
.most-expected{
    background: #fff;
    padding: 30px;
    .most-ex-title{
      margin-bottom: 30px;
    }
    .expected-movie-box{
      width: 100%;
      overflow: scroll;
      white-space: nowrap;
      .mu-item{
        display: inline-block;
        margin-right: 20px;
        width: 180px;
        overflow: hidden;
      }
      .mu-i-title{
        @include ellipsis;
        color: #000;
        line-height: 50px;
        font-size: 26px;
      }
      .mu-i-date{
        color: #999;
        font-size: 22px; 
      }
      .mu-i-img{
        position: relative;
        height: 250px;
        overflow: hidden;
        .wish{
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 50px;
          background: linear-gradient(-180deg,rgba(77,77,77,0),#000);
          text-align: center;
          font-size: 24px;
          line-height: 50px;
          color: #faaf00;
          font-weight: 600;
        }
      }
    }
  }
  .will-show{
    background-color: #fff;
    margin-top: 40px;
    .wi-col-date{
      padding:30px 30px 0 30px;
    }
  }
</style>


