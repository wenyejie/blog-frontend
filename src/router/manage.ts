import { RouteRecordRaw } from 'vue-router'

const manageRouter: RouteRecordRaw = {
  path: '/manage',
  component: () => import(/* webpackChunkName: "r-manage-main" */ '@/views/manage/Main.vue'),
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
    },
    {
      path: 'category',
      name: 'manageCategory',
      component: () =>
        import(/* webpackChunkName: "r-manage-category" */ '@/views/manage/Category.vue'),
      meta: {
        title: '分类管理'
      }
    }
  ]
}

export default manageRouter
