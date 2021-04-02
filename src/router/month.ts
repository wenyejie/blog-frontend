import main from '@/views/main.vue'
import { RouteRecordRaw } from 'vue-router'

const monthRouter: RouteRecordRaw = {
  path: '/month',
  component: main,
  meta: {
    title: '月份'
  },
  children: [
    {
      path: ':year(\\d+)-:month(\\d+)',
      name: 'month',
      component: () => import(/* webpackChunkName: 'r-month' */ '@/views/month/index.vue'),
      meta: {
        title: '每月统计'
      }
    }
  ]
}

export default monthRouter
