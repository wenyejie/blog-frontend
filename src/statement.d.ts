export interface Tag {
  _id?: number
  label?: string
}

export interface Category {
  _id?: number
  label?: string
}

export interface Pagination {
  page?: number
  pageSize?: number
  query?: any
}
