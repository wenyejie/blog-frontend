import { AxiosRequestConfig } from 'axios'
import http from '@/core/http'

// 增加文章
export const addArticle = (data: any, config?: AxiosRequestConfig) => {
  return http.post('/article/add', data, config)
}

// 获取文章列表
export const getArticleList = (data?: any, config: AxiosRequestConfig = {}) => {
  config.params = data
  return http.get('/article/list', config)
}

// 获取文章详情
export const getArticleDetail = (data?: any, config: AxiosRequestConfig = {}) => {
  config.params = data
  return http.get('/article/detail', config)
}

// 获取最新文章
export const getArticleLatest = (config: AxiosRequestConfig = {}) => {
  return http.get('/article/latest', config)
}
