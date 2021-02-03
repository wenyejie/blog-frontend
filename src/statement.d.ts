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
  query?: any
}

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  disabledTip?: boolean | string | string[]
}

export interface AxiosCustomResponse extends AxiosResponse {
  config: AxiosCustomRequestConfig
}

export interface AnyObject {
  [propName: string]: any
}
