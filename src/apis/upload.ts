import http from '@/core/http'
import { AnyObject, AxiosCustomRequestConfig } from '@/statement'

interface UploadSingleData {
  file: File
}

// 单个上传地址
export const uploadSingleAction = '/upload/single'

// 获取上传列表
export const getUploadList = (data?: AnyObject, config: AxiosCustomRequestConfig = {}) => {
  config.params = data
  return http.get('/upload/list', config)
}

// 删除上传
export const deleteUpload = (data?: AnyObject, config: AxiosCustomRequestConfig = {}) => {
  config.data = data
  return http.delete('/upload/delete', config)
}
