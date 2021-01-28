import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setPageTitle } from '@/utils'
import articleRouter from './article'
import manageRouter from './manage'
import categoryRouters from './category'

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
  articleRouter,
  ...categoryRouters,
  manageRouter,

  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: () => import(/* webpackChunkName: "r-404" */ '@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  setPageTitle(to.meta.title)
  next()
})

export default router
