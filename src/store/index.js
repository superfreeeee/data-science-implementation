import Vue from 'vue'
import Vuex from 'vuex'
import history from './modules/history'
import getters from './getters'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    setting
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters
})
