<template>
  <div class="hello">
    <p v-for="item in arrs">
      {{item}}
    </p>
  </div>
</template>

<script>
import axios from '@/utils/axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      arrs: [1,2,3,4,5]
    }
  },
  created () {
    axios.get('/hostproxy/dianying/cities.json')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p{
  font-size: 30px;
}
</style>
