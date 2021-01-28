import { inBrowser } from 'wenyejie'

// 设置页面标题
export const setPageTitle = (title = '') => {
  if (inBrowser()) {
    document.title = (title ? title + ' - ' : title) + process.env.VUE_APP_TITLE
  }
}
