<template>
  <section>
    <section id="parent">
      <input type="text" readonly :value="input">
      <input type="text" v-model="test">
      <router-link to="/input/select">select</router-link>
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "input",
  data() {
    return {
      test: ""
    };
  },
  computed: {
    ...mapState(["input"])
  }
};
</script>
