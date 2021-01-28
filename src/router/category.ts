import { RouteRecordRaw, RouteComponent } from 'vue-router'
import { categoryList } from '@/datas'

const component: RouteComponent = () =>
  import(/* webpackChunkName: "r-category" */ '@/views/Category.vue')

const categoryRouters: RouteRecordRaw[] = categoryList.map(({ label, _id }) => {
  const lowercaseLabel = label.toLocaleLowerCase()
  return {
    path: `/${lowercaseLabel}`,
    name: lowercaseLabel,
    component,
    meta: {
      title: label,
      _id
    }
  }
})

export default categoryRouters
