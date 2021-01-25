import { AxiosRequestConfig } from 'axios'
import http from '@/cores/http'
import { Tag, Category } from '@/statement'

// 更新分类
export const updateCategory = (data: Tag, config?: AxiosRequestConfig) => {
  return http.put('/category/update', data, config)
}

// 新增分类
export const addCategory = (data: Tag, config?: AxiosRequestConfig) => {
  return http.post('/category/add', data, config)
}

// 删除分类
export const deleteCategory = (data: Tag, config: AxiosRequestConfig = {}) => {
  config.data = data
  return http.delete('/category/delete', config)
}

// 获取分类列表
export const getCategoryList = (data?: Category, config: AxiosRequestConfig = {}) => {
  config.data = data
  return http.get('/category/list', config)
}
