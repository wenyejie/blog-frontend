/**
 * @author: Storm
 * @date: 2021/01/20
 * @email: wenyejie@foxmail.com
 */

import axios from 'axios'
import { $danger } from '@/components/message'
import { isObject, isArray, isString } from 'wenyejie'

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
  (response: any) => {
    const responseData = response.data
    if (!isObject(responseData)) {
      return Promise.reject(SERVICE_ERR_MSG)
    }
    if (responseData.code === '000') {
      return responseData.data
    }

    const { code, message } = responseData
    const { disabledTip } = response.config
    if (
      disabledTip !== true ||
      (isArray(disabledTip) && !disabledTip.includes(code)) ||
      (isString(disabledTip) && disabledTip !== code)
    ) {
      $danger(message || SERVICE_ERR_MSG)
    }
    return Promise.reject(responseData)
  },
  (error) => {
    $danger(error.message || SERVICE_ERR_MSG)
    return Promise.reject(error)
  }
)

export default http
