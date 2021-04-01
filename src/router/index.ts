import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setPageTitle } from '@/utils'
import articleRouter from './article'
import categoryRouter from './category'
import tagRouter from './tag'
import uploadRouter from './upload'
import store from '@/store'
import $message from '@/components/message'

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
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: 'r-search' */ '@/views/search/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "r-about" */ '../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'r-login' */ '@/views/login/login.vue')
  },
  articleRouter,
  categoryRouter,
  tagRouter,
  uploadRouter,
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
  // 判断路由是否有权限, 当然更好的做法是根据用户权限载入相关路由
  if (to.meta.neeAuth && !store.getters.isLogin) {
    $message.warning('你没有该路由权限, 请先登录')
    return next('/login')
  }
  setPageTitle(to.meta.title as string)
  next()
})

export default router
