<template>
    <div>
      <NavHeader>home</NavHeader>
      <div></div>
    </div>
</template>

<script>
import NavHeader from "../components/Header";
import axios from "@/utils/axios";

export default {
  name: "home",
  components: { NavHeader },
  created() {
    axios.get("/hostproxy/dianying/cities.json");
  }
};
</script>

