import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import article from '@/router/article'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  article
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
