import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import articleRouter from './article'
import tagRouter from './tag'
import categoryRouter from './category'

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
  tagRouter,
  categoryRouter
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  let title = ''
  if (to.meta.title) {
    title = to.meta.title + ' - '
  }
  title += process.env.VUE_APP_TITLE
  document.title = title
  next()
})

export default router
