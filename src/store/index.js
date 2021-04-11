import Vue from 'vue'
import Vuex from 'vuex'
import history from './modules/history'
import graphDetails from './modules/graphDetails'
import filterByNodeLabels from './modules/filterByNodeLabels'
import getters from './getters'
import setting from './modules/setting'
import graph from './modules/graph'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    setting,
    graph,
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
