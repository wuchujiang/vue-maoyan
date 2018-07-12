import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
Vue.use(Vuex)

const state = {
  headerTitle: '猫眼电影',
  headerFixed: true,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
