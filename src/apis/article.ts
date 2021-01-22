import { AxiosRequestConfig } from 'axios'
import http from '@/cores/http'

// 增加文章
export const addArticle = (data: any, config?: AxiosRequestConfig) => {
  return http.post('/article/add', data, config)
}

// 获取文章列表
export const getArticleList = (data?: any, config: AxiosRequestConfig = {}) => {
  config.data = data
  return http.get('/article/list', config)
}
