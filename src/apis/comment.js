import http from '@/core/http'

// 更新评论
export const updateComment = (data, config) => {
  return http.put('/comment/update', data, config)
}

// 新增评论
export const addComment = (data, config) => {
  return http.post('/comment/add', data, config)
}

// 删除评论
export const deleteComment = (data, config = {}) => {
  config.params = data
  return http.delete('/comment/delete', config)
}

// 获取评论列表
export const getCommentList = (data, config = {}) => {
  config.params = data
  return http.get('/comment/list', config)
}
