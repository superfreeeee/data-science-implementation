import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import Drawer from "./components/knowledgeGraph"
import Router from 'vue-router'
import store from  '@/store'

Vue.use(Antd)
Vue.config.productionTip = false

Vue.use(Router)
// Vue.prototype.$drawer=Drawer
var tmp=new Vue({ router: router, store:store,render: h => h(App) }).$mount('#app')

