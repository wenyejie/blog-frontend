import http from '@/core/http'

// 更新标签
export const updateTag = (data, config) => {
  return http.put('/tag/update', data, config)
}

// 新增标签
export const addTag = (data, config) => {
  return http.post('/tag/add', data, config)
}

// 删除标签
export const deleteTag = (data, config = {}) => {
  config.data = data
  return http.delete('/tag/delete', config)
}

// 获取标签列表
export const getTagList = (data, config = {}) => {
  config.data = data
  return http.get('/tag/list', config)
}

export const getTagCount = (data, config = {}) => {
  config.data = data
  return http.get('/tag/count', config)
}
