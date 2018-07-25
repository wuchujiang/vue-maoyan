import Vue from "vue";
import Vuex from "vuex";
import {formatDate} from '@/utils';
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
Vue.use(Vuex);

const state = {
  headerTitle: "猫眼电影",
  headerFixed: true,
  footShow: true,
  input: "",
  back: false,
  city: 30,
  filterCinema: {
    brandId: -1,
    serviceId: -1,
    hallTypeId: -1,
    stationId: -1,
    areaId: -1,
    lineId: -1,
    districtId: -1,
    day: formatDate(new Date()),
  },
  filterCinemasList: [],
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
