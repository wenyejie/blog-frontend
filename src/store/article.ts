import { getArticleLatest } from '@/apis/article'
import { AnyObject } from '@/statement'

const state: AnyObject = {
  latest: []
}

const mutations = {
  articleLatest(state: AnyObject, list: unknown[]) {
    if (Array.isArray(list)) {
      state.latest = list
    }
  }
}

const actions = {
  // 获取最新的文章列表
  articleLatest({ commit }: AnyObject) {
    getArticleLatest().then((response: AnyObject) => {
      commit('articleLatest', response.list)
    })
  }
}

const getters = {
  articleLatest(state: AnyObject) {
    return state.latest
  }
}

const module = {
  state,
  mutations,
  actions,
  getters
}

export default module
