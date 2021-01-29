export interface Tag {
  _id?: string
  label?: string
}

export interface Category {
  _id?: string
  label?: string
}

export interface Pagination {
  page?: number
  pageSize?: number
  query?: any
}
