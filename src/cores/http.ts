/**
 * @author: Storm
 * @date: 2021/01/20
 * @email: wenyejie@foxmail.com
 */

import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { isObject } from 'wenyejie'

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
        return Promise.reject(responseData.message)
      }
    }
    return Promise.reject('服务器错误!')
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
