import { getArticleLatest } from '@/apis/article'

const state = {
  latest: []
}

const mutations = {
  articleLatest(state, list) {
    if (Array.isArray(list)) {
      state.latest = list
    }
  }
}

const actions = {
  // 获取最新的文章列表
  articleLatest({ commit }) {
    getArticleLatest().then(response => {
      commit('articleLatest', response.list)
    })
  }
}

const getters = {
  articleLatest(state) {
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
