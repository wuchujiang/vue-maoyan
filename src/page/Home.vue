<template>
    <div>
      <NavHeader :fixed="headerFixed" :back="back">{{headerTitle}}</NavHeader>
      <router-view></router-view>
      <fix-footer :show="footShow"></fix-footer>
    </div>
</template>

<script>
import NavHeader from "../components/Header";
import fixFooter from "../components/Footer";
import {mapState} from 'vuex';

export default {
  name: "home",
  components: { NavHeader, fixFooter },
  computed:{
    ...mapState(['headerTitle', 'headerFixed', 'footShow', 'back'])
  }
};
</script>

