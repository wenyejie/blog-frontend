import { AxiosRequestConfig } from 'axios'
import http from '@/cores/http'

// 更新标签
export const updateTag = (data: any, config?: AxiosRequestConfig) => {
  return http.put('/tag', data, config)
}

// 新增标签
export const addTag = (data: any, config?: AxiosRequestConfig) => {
  return http.post('/tag', data, config)
}

// 删除标签
export const deleteTag = (data: any, config: AxiosRequestConfig = {}) => {
  config.data = data
  return http.delete('/tag', config)
}

export const getTag = (data: any, config: AxiosRequestConfig = {}) => {
  config.data = data
  return http.get('/tag', config)
}

// 获取标签列表
export const getTagList = (data: any, config: AxiosRequestConfig = {}) => {
  config.data = data
  return http.get('/tag/list', config)
}
