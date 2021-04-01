import http from '@/core/http'
import { AxiosCustomRequestConfig } from '@/statement'

interface UploadSingleData {
  file: File
}

// 单个上传地址
export const uploadSingleAction = '/upload/single'

// 上传单个文件
export const uploadSingle = (data: UploadSingleData, config?: AxiosCustomRequestConfig) => {
  return http.post(uploadSingleAction, data, config)
}
