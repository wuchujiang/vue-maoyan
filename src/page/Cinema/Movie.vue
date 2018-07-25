<template>
  <section class="cinema-movie">
    <movie-introduction v-if="Object.keys(movieDetail).length > 0" :data="movieDetail"></movie-introduction>
    <show-days v-if="showDays.length" v-model="showDay" :data="showDays"></show-days>
    <loader v-else></loader>
    <cinema-filter v-if="showDays.length" :region="brandDetail" :day="showDay"></cinema-filter>
    <section class="cinema-movie-box">
      <router-link v-for="item in cinemaList" :key="item.id" :to="{name: 'shows', params: {id: item.id}, query: {movieId: $route.params.id}}">
        <cinema-item :data="item" ></cinema-item>
      </router-link>
    </section>
  </section>
</template>

<script>
import MovieIntroduction from '@/components/movie-introduction';
import {mapMutations, mapState, mapGetters, mapActions} from 'vuex';
import {formatDate, getWeek} from '@/utils';
import ShowDays from '@/components/show-days';
import CinemaFilter from '@/components/cinema-filter';
import CinemaItem from '@/components/cinema-item';
import loader from '@/components/loader';

export default {
  name: 'cinema-movie',
  data() {
    return {
      movieDetail: {},
      showDays: [],
      showDay: formatDate(new Date(), 'yyyy-MM-dd'),
      brandDetail: {},
    }
  },
  created() {
    this.setState({footShow: false});
    this.fetchMovieInfomation();
    this.fetchCinemaMovie();
  },

  components: {
    MovieIntroduction,ShowDays,CinemaFilter,CinemaItem, loader
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
    fetchCinemaMovie() {
      this.fetchCinemasList().then((res) => {
        console.log(res);
        this.showDays = this.transDays(res.showDays.dates);
      });
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
    ...mapActions(['fetchCinemasList'])
  },
  computed: {
    ...mapState({
      cinemaList:'filterCinemasList',
    }),
    ...mapGetters(['getCinemasList'])
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


