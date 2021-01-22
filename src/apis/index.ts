/**
 * @author: Storm
 * @date: 2021/01/20
 * @email: wenyejie@foxmail.com
 */

import http from '@/cores/http.ts'
import { AxiosRequestConfig } from 'axios'

interface LoginParams {
  account: string
  password: string
}

// 登录
export const login = (params: LoginParams, config?: AxiosRequestConfig) => {
  return http.post('/login', params, config)
}

interface SubmitArticleParams {
  title: string
  tag?: string
  category?: string
  content: string
}

// 增加文章
export const addArticle = (params: SubmitArticleParams, config?: AxiosRequestConfig) => {
  return http.post('/article/add', params, config)
}

interface GetArticleListParams {
  page?: number
  pageSize?: number
  query: any
}

// 获取文章列表
export const getArticleList = (params?: GetArticleListParams, config: AxiosRequestConfig = {}) => {
  config.data = params
  return http.get('/article/list', config)
}
