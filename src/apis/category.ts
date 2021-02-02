import http from '@/core/http'
import { Category, AxiosCustomRequestConfig } from '@/statement'

// 更新分类
export const updateCategory = (data: Category, config?: AxiosCustomRequestConfig) => {
  return http.put('/category/update', data, config)
}

// 新增分类
export const addCategory = (data: Category, config?: AxiosCustomRequestConfig) => {
  return http.post('/category/add', data, config)
}

// 删除分类
export const deleteCategory = (data: Category, config: AxiosCustomRequestConfig = {}) => {
  config.data = data
  return http.delete('/category/delete', config)
}

// 获取分类列表
export const getCategoryList = (data?: Category, config: AxiosCustomRequestConfig = {}) => {
  config.data = data
  return http.get('/category/list', config)
}
