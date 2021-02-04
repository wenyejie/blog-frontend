import { inBrowser } from 'wenyejie'
import { localToken, localUserInfo } from '@/storages'
import { useStore } from 'vuex'

// 设置页面标题
export const setPageTitle = (title = '') => {
  if (inBrowser()) {
    document.title = (title ? title + ' - ' : title) + process.env.VUE_APP_TITLE
  }
}

// 登出之后
export const logoutAfter = () => {
  // 移除保存的用户信息
  useStore().commit('userInfo', {})
  localUserInfo(null)
  // 移除storage中的token
  localToken(null)
}
