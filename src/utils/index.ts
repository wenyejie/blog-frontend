import { inBrowser, isNumber, isString } from 'wenyejie'
import { localToken, localUserInfo } from '@/storages'
import store from '@/store'
import { ComponentInternalInstance } from '@vue/runtime-core'
const rNumber = /^\d+$/

// 把输入转换为css长度单位
export const toCSSUnit = (length: string | number | undefined): string => {
  if (isNumber(length) || rNumber.test(length as string)) {
    return length + 'px'
  } else if (isString(length)) {
    return length as string
  } else {
    return ''
  }
}

// 设置页面标题
export const setPageTitle = (title = '') => {
  if (inBrowser()) {
    document.title = (title ? title + ' - ' : title).toLocaleUpperCase() + process.env.VUE_APP_TITLE
  }
}

// 登出之后
export const logoutAfter = () => {
  // 移除保存的用户信息
  store.commit('userInfo', {})
  localUserInfo(null)
  // 移除storage中的token
  localToken(null)
}

// 获取组件的指定父组件
export const getParentInstance = (
  instance: ComponentInternalInstance | null,
  parentName: string
) => {
  while (instance) {
    if (instance.type.name === parentName) {
      break
    }
    instance = instance.parent
  }
  return instance
}

// 获取父组件的proxy数据
export const getParentProxy = (instance: ComponentInternalInstance | null, parentName: string) => {
  const parent = getParentInstance(instance, parentName)
  return parent ? parent.proxy : parent
}
