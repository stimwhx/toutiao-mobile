import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 路由懒加载
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    // 有子路由所以你路由不用name
    component: () => import('@/views/layout/')
  }
]

const router = new VueRouter({
  routes
})

export default router
