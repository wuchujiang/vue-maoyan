<template>
  <section class="shows">
shows
  </section>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  name: 'shows',
  created() {
    this.setState({footShow: false});
  },
  data() {
    return {
      detail: {},
    }
  },
  methods: {
   ...mapMutations(['setState']),
   async fetchCinemaDetail() {
     const detail = await this.$axios.get(`/ajax/cinemaDetail?cinemaId=24241&movieId=${this.$router.params.id}`)
   }
  },

}
</script>

