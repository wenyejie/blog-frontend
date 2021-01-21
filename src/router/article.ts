/**
 * @author: Storm
 * @date: 2021/01/20
 * @email: wenyejie@foxmail.com
 */

import { RouteRecordRaw } from 'vue-router'

const articleRouter: RouteRecordRaw = {
  path: '/article',
  name: 'article',
  component: () => import(/* webpackChunkName: "article-main" */ '@/views/article/main.vue'),
  meta: {
    title: '文章'
  },
  children: [
    {
      path: ':id',
      name: 'articleDetail',
      component: () =>
        import(/* webpackChunkName: "article-detail" */ '@/views/article/detail.vue'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: 'edit',
      name: 'articleEdit',
      component: () => import(/* webpackChunkName: "article-edit" */ '@/views/article/edit.vue'),
      meta: {
        title: '文章编辑'
      }
    }
  ]
}

export default articleRouter
