import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import article from '@/router/article'
import tag from '@/router/tag'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "r-home" */ '@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "r-about" */ '../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  article,
  tag
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
