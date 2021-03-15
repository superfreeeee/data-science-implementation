import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const common = [
  {
    path: '/', name: 'root', component: () => import('../home')
  }
]

const router = new Router({ mode: 'history', base: process.env.BASE_URL, routes: common })

export default router
