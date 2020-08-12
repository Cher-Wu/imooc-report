import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BMap1 from '../views/BMap1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 即http://localhost:8080/显示的是Home页面
    name: 'Home',
    component: Home
  }, {
    path: '/bmap1',
    // 即http://localhost:8080/bmap显示的是BMap页面
    name: 'BMap1',
    component: BMap1
  }
]

const router = new VueRouter({
  routes
})

export default router
