import http from '@/core/http'
import { Tag, Pagination, AxiosCustomRequestConfig, AnyObject } from '@/statement'

// 更新标签
export const updateTag = (data: Tag, config?: AxiosCustomRequestConfig) => {
  return http.put('/tag/update', data, config)
}

// 新增标签
export const addTag = (data: Tag, config?: AxiosCustomRequestConfig) => {
  return http.post('/tag/add', data, config)
}

// 删除标签
export const deleteTag = (data: Tag, config: AxiosCustomRequestConfig = {}) => {
  config.data = data
  return http.delete('/tag/delete', config)
}

// 获取标签列表
export const getTagList = (data?: Pagination, config: AxiosCustomRequestConfig = {}) => {
  config.data = data
  return http.get('/tag/list', config)
}

export const getTagCount = (data?: AnyObject, config: AxiosCustomRequestConfig = {}) => {
  config.data = data
  return http.get('/tag/count', config)
}
