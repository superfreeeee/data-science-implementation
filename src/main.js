import Vue from 'vue/dist/vue.esm.js'

import App from './App.vue'
import router from './router/index'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Router from 'vue-router'

Vue.config.productionTip = false

Vue.use(iView)

Vue.use(Router)

new Vue({ router: router, render: h => h(App) }).$mount('#app')
