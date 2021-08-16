import http from '@/core/http'

// 单个上传地址
export const uploadSingleAction = '/upload/single'

// 获取上传列表
export const getUploadList = (data, config = {}) => {
  config.params = data
  return http.get('/upload/list', config)
}

// 删除上传
export const deleteUpload = (data, config = {}) => {
  config.data = data
  return http.delete('/upload/delete', config)
}
