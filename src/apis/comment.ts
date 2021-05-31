import http from '@/core/http'
import { Comment, AxiosCustomRequestConfig } from '@/statement'

// 更新评论
export const updateComment = (data: Comment, config?: AxiosCustomRequestConfig) => {
  return http.put('/comment/update', data, config)
}

// 新增评论
export const addComment = (data: Comment, config?: AxiosCustomRequestConfig) => {
  return http.post('/comment/add', data, config)
}

// 删除评论
export const deleteComment = (data: Comment, config: AxiosCustomRequestConfig = {}) => {
  config.params = data
  return http.delete('/comment/delete', config)
}

// 获取评论列表
export const getCommentList = (data?: Comment, config: AxiosCustomRequestConfig = {}) => {
  config.params = data
  return http.get('/comment/list', config)
}
