/**
 * @author: Storm
 * @date: 2021/01/20
 * @email: wenyejie@foxmail.com
 */

import axios from 'axios'
import { $danger } from '@/components/message'
import { isObject, isArray, isString } from 'wenyejie'
import { useRouter } from 'vue-router'
import { AxiosCustomResponse } from '@/statement'
import { localToken } from '@/storages'
import { logoutAfter } from '@/utils'

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
    const token = localToken()
    if (token) {
      config.headers[process.env.VUE_APP_AXIOS_TOKEN_KEY] = token
    }
    return config
  },
  (error) => {
    debugger
    $danger((error && error.message) || NETWORK_ERR_MSG)
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response: AxiosCustomResponse) => {
    const responseData = response.data
    if (!isObject(responseData)) {
      return Promise.reject(SERVICE_ERR_MSG)
    }
    const { code, message, data } = responseData
    if (code === '000') {
      return data
    }
    const { disabledTip } = response.config
    if (
      disabledTip !== true ||
      (isArray(disabledTip) && !(disabledTip as any).includes(code)) ||
      (isString(disabledTip) && disabledTip !== code)
    ) {
      $danger(message || SERVICE_ERR_MSG)
    }
    // token失效
    if (code === '001002') {
      logoutAfter()
      // 跳转到登录页
      useRouter().push('/login')
    }
    return Promise.reject(responseData)
  },
  (error) => {
    $danger(error.message || SERVICE_ERR_MSG)
    return Promise.reject(error)
  }
)

export default http
