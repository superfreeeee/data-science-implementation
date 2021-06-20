import Vue from 'vue'
import Vuex from 'vuex'
import history from './modules/history'
import graphDetails from './modules/graphDetails'
import filterByNodeLabels from './modules/filterByNodeLabels'
import getters from './getters'
import setting from './modules/setting'
import graph from './modules/graph'
import node from './modules/node'
import edge from './modules/edge'
import question from './modules/question'
import file from './modules/file'
import graphConstruction from './modules/graphConstruction'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    setting,
    graph,
    graphDetails,
    filterByNodeLabels,
    node,
    edge,
    question,
    file,
    graphConstruction
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters
})
