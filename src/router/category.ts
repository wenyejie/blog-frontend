import { RouteRecordRaw, RouteComponent } from 'vue-router'
import { categoryList } from '@/datas'

const component: RouteComponent = () =>
  import(/* webpackChunkName: "r-category" */ '@/views/Category.vue')

const categoryRouters: RouteRecordRaw[] = categoryList.map(({ label, _id }) => {
  return {
    path: `/${label}`,
    name: label,
    component,
    meta: {
      title: label
    },
    props: {
      _id
    }
  }
})

export default categoryRouters
