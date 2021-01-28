import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setPageTitle } from '@/utils'
import articleRouter from './article'
import manageRouter from './manage'
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
  categoryRouter,
  manageRouter,

  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: () => import(/* webpackChunkName: "r-error-404" */ '@/views/error/404.vue'),
    meta: {
      title: '404 Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 如果是开发环境则加入demo, 便于测试
if (process.env.NODE_ENV === 'development') {
  router.addRoute({
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "r-demo" */ '@/views/demo/index.vue'),
    meta: {
      title: 'demo'
    }
  })
}

router.beforeEach((to, from, next) => {
  setPageTitle(to.meta.title)
  next()
})

export default router
