import http from '@/core/http'
import { AxiosCustomRequestConfig, AnyObject, LoginParams, LoginResponse } from '@/statement'

// 登录
export const login = (
  data: LoginParams,
  config?: AxiosCustomRequestConfig
): Promise<LoginResponse> => {
  return http.post('/user/login', data, config)
}

// 注销
export const logout = (data?: AnyObject, config?: AxiosCustomRequestConfig) => {
  return http.post('/user/logout', data, config)
}
