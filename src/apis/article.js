import http from '@/core/http'

// 增加文章
export const addArticle = (data, config) => {
  return http.post('/article/add', data, config)
}

// 获取文章列表
export const getArticleList = (data, config = {}) => {
  config.params = data
  return http.get('/article/list', config)
}

// 获取文章详情
export const getArticleDetail = (data, config = {}) => {
  config.params = data
  return http.get('/article/detail', config)
}

// 获取最新十条文章
export const getArticleLatest = config => {
  return http.get('/article/latest', config)
}

// 获取最热门的十条文章
export const getArticleHottest = config => {
  return http.get('article/hottest', config)
}

// 删除文章
export const deleteArticle = (data, config = {}) => {
  config.data = data
  return http.delete('/article/delete', config)
}

// 更新文章
export const updateArticle = (data, config) => {
  return http.put('/article/update', data, config)
}

export const getArticleCountByMonth = (data, config = {}) => {
  config.params = data
  return http.get('/article/countByMonth', config)
}
