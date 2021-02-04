import { getArticleLatest } from '@/apis/article'

const state = {
  latest: []
}

const mutations = {
  articleLatest(state: any, list: any) {
    if (Array.isArray(list)) {
      state.latest = list
    }
  }
}

const actions = {
  // 获取最新的文章列表
  articleLatest({ commit }: any) {
    getArticleLatest().then((response: any) => {
      commit('articleLatest', response.list)
    })
  }
}

const getters = {
  articleLatest(state: any) {
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
