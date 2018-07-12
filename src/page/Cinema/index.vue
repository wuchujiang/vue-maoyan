<template>
    <div>
      cinema
      <router-view></router-view>
    </div>
    
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name: "cinema",
  created() {
    this.setState({headerTitle: '影院'});
  },
  mounted() {
    console.log(this.$store.state)
  },
  methods: {
    ...mapMutations(['setState'])
  }
};
</script>

