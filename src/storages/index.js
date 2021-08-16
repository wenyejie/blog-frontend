import { local, nullProtoObject } from 'wenyejie'
import { ARTICLE_EDIT, TOKEN, USER_INFO } from './namespace'

// 文章编辑
export const localArticleEdit = data => {
  return local(ARTICLE_EDIT, data)
}

// 保存token
export const localToken = data => {
  return local(TOKEN, data) || ''
}

// 用户信息
export const localUserInfo = data => {
  return local(USER_INFO, data) || nullProtoObject()
}
