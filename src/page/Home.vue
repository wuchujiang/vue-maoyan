<template>
    <div>
      <NavHeader>猫眼电影</NavHeader>
      <router-view></router-view>
      <fix-footer></fix-footer>
    </div>
</template>

<script>
import NavHeader from "../components/Header";
import fixFooter from "../components/Footer";
import axios from "@/utils/axios";

export default {
  name: "home",
  components: { NavHeader, fixFooter },
  created() {
    axios.get("/hostproxy/dianying/cities.json");
  }
};
</script>

