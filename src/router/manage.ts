import { RouteRecordRaw } from 'vue-router'
import main from '@/views/main.vue'

const manageRouter: RouteRecordRaw = {
  path: '/manage',
  component: main,
  children: [
    {
      path: '',
      name: 'manage',
      component: () => import(/* webpackChunkName: "r-manage-home" */ '@/views/manage/Home.vue'),
      meta: {
        title: '管理'
      }
    },
    {
      path: 'tag',
      name: 'manageTag',
      component: () => import(/* webpackChunkName: "r-manage-tag" */ '@/views/manage/Tag.vue'),
      meta: {
        title: '标签管理'
      }
    }
  ]
}

export default manageRouter
