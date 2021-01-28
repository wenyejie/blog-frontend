import { local } from 'wenyejie'
import { ARTICLE_EDIT } from './namespace'

// 文章编辑
export const localArticleEdit = (data?: any) => {
  return local(ARTICLE_EDIT, data)
}
