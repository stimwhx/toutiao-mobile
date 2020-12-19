import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由懒加载

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    // 有子路由所以你路由不用name
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      },
      {
        path: '/video',
        name: 'name',
        component: () => import('@/views/video/')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 将动态路由参数映射到组件的props中，无论是访问还是维护性都很方便：
    props: true
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
