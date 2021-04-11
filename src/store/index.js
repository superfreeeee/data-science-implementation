import Vue from 'vue'
import Vuex from 'vuex'
import history from './modules/history'
import graphDetails from './modules/graphDetails'
import filterByNodeLabels from './modules/filterByNodeLabels'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    graphDetails,
    filterByNodeLabels
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters
})
