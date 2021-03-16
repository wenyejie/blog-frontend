import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface Tag {
  _id?: number
  label?: string
  count?: number
}

export interface Category {
  _id?: number
  label?: string
  updating?: boolean
  deleting?: boolean
  reconfirm?: boolean
}

export interface Pagination {
  page?: number
  pageSize?: number
  query?: AnyObject
}

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  disabledTip?: boolean | string | string[]
}

export interface AxiosCustomResponse extends AxiosResponse {
  config: AxiosCustomRequestConfig
}

export interface AnyObject {
  // eslint-disable-next-line
  [propName: string]: any
}

export interface LoginParams {
  account: string
  password: string
}

export interface User {
  userName: string
}

export interface LoginResponse {
  token: string
  account: string
}
