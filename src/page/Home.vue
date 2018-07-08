<template>
    <div>
      <NavHeader fixed="true">猫眼电影</NavHeader>
      <router-view></router-view>
      <fix-footer></fix-footer>
    </div>
</template>

<script>
import NavHeader from "../components/Header";
import fixFooter from "../components/Footer";

export default {
  name: "home",
  components: { NavHeader, fixFooter }
};
</script>

