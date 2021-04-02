import http from '@/core/http'
import { AxiosCustomRequestConfig, AnyObject } from '@/statement'

// 增加文章
export const addArticle = (data: AnyObject, config?: AxiosCustomRequestConfig) => {
  return http.post('/article/add', data, config)
}

// 获取文章列表
export const getArticleList = (data?: AnyObject, config: AxiosCustomRequestConfig = {}) => {
  config.params = data
  return http.get('/article/list', config)
}

// 获取文章详情
export const getArticleDetail = (data?: AnyObject, config: AxiosCustomRequestConfig = {}) => {
  config.params = data
  return http.get('/article/detail', config)
}

// 获取最新十条文章
export const getArticleLatest = (config?: AxiosCustomRequestConfig) => {
  return http.get('/article/latest', config)
}

// 获取最热门的十条文章
export const getArticleHottest = (config?: AxiosCustomRequestConfig) => {
  return http.get('article/hottest', config)
}

// 删除文章
export const deleteArticle = (data?: AnyObject, config: AxiosCustomRequestConfig = {}) => {
  config.data = data
  return http.delete('/article/delete', config)
}

// 更新文章
export const updateArticle = (data?: AnyObject, config: AxiosCustomRequestConfig = {}) => {
  return http.put('/article/update', data, config)
}

export const getArticleCountByMonth = (data?: AnyObject, config: AxiosCustomRequestConfig = {}) => {
  config.params = data
  return http.get('/article/countByMonth', config)
}
