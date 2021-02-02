/**
 * @author: Storm
 * @date: 2021/01/20
 * @email: wenyejie@foxmail.com
 */

import axios from 'axios'
import { $danger } from '@/components/message'
import { isObject } from 'wenyejie'

const NETWORK_ERR_MSG = '网络错误!'
const SERVICE_ERR_MSG = '服务器错误!'

const http = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-type': 'application/json'
  }
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    $danger((error && error.message) || NETWORK_ERR_MSG)
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    const responseData = response.data
    if (isObject(responseData)) {
      if (responseData.code === '000') {
        return responseData.data
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (response.config.errTips !== false) {
          $danger(responseData.message || SERVICE_ERR_MSG)
        }
        return Promise.reject(responseData)
      }
    }
    return Promise.reject(SERVICE_ERR_MSG)
  },
  (error) => {
    $danger(error.message || SERVICE_ERR_MSG)
    return Promise.reject(error)
  }
)

export default http
