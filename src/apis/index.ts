/**
 * @author: Storm
 * @date: 2021/01/20
 * @email: wenyejie@foxmail.com
 */

import http from '@/cores/http'
import { AxiosRequestConfig } from 'axios'

interface LoginParams {
  account: string
  password: string
}

// 登录
export const login = (params: LoginParams, config?: AxiosRequestConfig) => {
  return http.post('/login', params, config)
}
