<template>
  <section class="movie-item">
    <div class="movie-img">
      <img src="" alt="">
    </div>
    <div class="movie-wrap">
      <div class="movie-content">{{data.nm}}</div>
      <div class="movie-button"></div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'movie-item',
    props: ['data'],
  }
</script>
