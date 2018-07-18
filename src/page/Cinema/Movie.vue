<template>
  <section class="cinema-movie">
    <movie-introduction :data="movieDetail"></movie-introduction>
    <show-days v-model="showDay" :data="showDays"></show-days>
    <cinema-filter :region="brandDetail" v-model="cinemaList"></cinema-filter>
    <section class="cinema-movie-box">
      <cinema-item v-for="item in cinemaList" :data="item" :key="item.id"></cinema-item>
    </section>
  </section>
</template>

<script>
import MovieIntroduction from '@/components/movie-introduction';
import {mapMutations} from 'vuex';
import {formatDate, getWeek} from '@/utils';
import ShowDays from '@/components/show-days';
import CinemaFilter from '@/components/cinema-filter';
import CinemaItem from '@/components/cinema-item';
export default {
  name: 'cinema-movie',
  data() {
    return {
      movieDetail: {},
      showDays: [],
      showDay: formatDate(new Date(), 'yyyy-MM-dd'),
      brandDetail: {},
      cinemaList: [],
    }
  },
  created() {
    this.setState({footShow: false});
    this.fetchMovieInfomation();
    this.fetchCinemaMovie();
  },

  components: {
    MovieIntroduction,ShowDays,CinemaFilter,CinemaItem
  },
  methods: {
    async fetchMovieInfomation() {
      const fetchMovie = this.$axios.get(`/ajax/detailmovie?movieId=${this.$route.params.id}`);
      const fetchBrand = this.$axios.get(`/ajax/filterCinemas?movieId=${this.$route.params.id}&day=${formatDate(new Date)}`);
      const [movieDetail,brandDetail] = await Promise.all([fetchMovie, fetchBrand]);
      this.movieDetail = movieDetail.detailMovie;
      this.brandDetail = brandDetail;
      this.setState({headerTitle: movieDetail.detailMovie.nm, footShow: false});
    },
    async fetchCinemaMovie() {
      const params = {
        movieId: 1200486,
        day: formatDate(new Date()),
        offset: 0,
        limit: 20,
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId: -1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,
        updateShowDay: true,
        cityId: 30,
      }
      const movieDetail = await this.$axios.post(`/ajax/movie?forceUpdate=${new Date().getTime()}`, params);
      this.showDays = this.transDays(movieDetail.showDays.dates);
      this.cinemaList = movieDetail.cinemas;

    },
    ...mapMutations(['setState']),
    // 转换days
    transDays(days) {
      const hash = [];
      // 生成最近三天的数组；
      let threeDays = ['今天', '明天', '后天'];
      threeDays = threeDays.map((item, index) => {
        const currentDay = formatDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * index ));
        return{
          day: formatDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * index )),
          desc: item,
        }
      });
      const newDays = days.map(day => {
        let desc = '';
        const date = day.date;
        threeDays.forEach((item, index) => {
          if(date === item.day) {
            desc = item.desc;
          }
        });
        if(desc === '') {
          desc = getWeek(date.replace('-', '/'));
        }
        return {
          desc: `${desc}${formatDate(new Date(date.replace('-', '/')), 'yyyy年MM月dd日').slice(5)}`,
          day: date
        }
      });
      return newDays;
    },
  },
  watch: {
  }
}
</script>

<style lang="scss">
  .cinema-movie-box{
    background: #fff;
  }
</style>


