import http from '@/core/http'

// 登录
export const login = (data, config) => {
  return http.post('/user/login', data, config)
}

// 注销
export const logout = (data, config) => {
  return http.post('/user/logout', data, config)
}
