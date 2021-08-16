import http from '@/core/http'

// 更新分类
export const updateCategory = (data, config) => {
  return http.put('/category/update', data, config)
}

// 新增分类
export const addCategory = (data, config) => {
  return http.post('/category/add', data, config)
}

// 删除分类
export const deleteCategory = (data, config = {}) => {
  config.data = data
  return http.delete('/category/delete', config)
}

// 获取分类列表
export const getCategoryList = (data, config = {}) => {
  config.data = data
  return http.get('/category/list', config)
}
