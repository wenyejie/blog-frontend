import { local } from 'wenyejie'
import { ARTICLE_EDIT, TOKEN, USER_INFO } from './namespace'
import { AnyObject } from '@/statement'

// 文章编辑
export const localArticleEdit = (data?: AnyObject | null) => {
  return local(ARTICLE_EDIT, data)
}

// 保存token
export const localToken = (data?: string | null) => {
  return local(TOKEN, data)
}

// 用户信息
export const localUserInfo = (data?: AnyObject | null) => {
  return local(USER_INFO, data)
}
