import { AxiosRequestConfig } from 'axios'
import http from '@/cores/http'
import { Tag, Pagination } from '@/statement'

// 更新标签
export const updateTag = (data: Tag, config?: AxiosRequestConfig) => {
  return http.put('/tag/update', data, config)
}

// 新增标签
export const addTag = (data: Tag, config?: AxiosRequestConfig) => {
  return http.post('/tag/add', data, config)
}

// 删除标签
export const deleteTag = (data: Tag, config: AxiosRequestConfig = {}) => {
  config.data = data
  return http.delete('/tag/delete', config)
}

// 获取标签列表
export const getTagList = (data?: Pagination, config: AxiosRequestConfig = {}) => {
  config.data = data
  return http.get('/tag/list', config)
}
