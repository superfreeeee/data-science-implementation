import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import router from './router/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Router from 'vue-router'

Vue.use(Antd);
Vue.config.productionTip = false

Vue.use(iView)

Vue.use(Router)

new Vue({ router: router, render: h => h(App) }).$mount('#app')
