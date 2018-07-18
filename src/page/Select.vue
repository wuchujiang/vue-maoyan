<template>
  <section>
    <p v-for="item in 10" :key="item" @click="select(item)">{{item}}</p>
  </section>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "select",
  created() {
    const parent = document.querySelector("#parent");
    if (parent) {
      parent.style.display = "none";
    } else {
      this.$router.replace("/input");
    }
  },
  methods: {
    ...mapMutations(["setState"]),
    select(num) {
      this.setState({ input: num });
      this.$router.replace("/input");
    }
  },
  destroyed() {
    document.querySelector("#parent").style.display = "block";
  }
};
</script>
