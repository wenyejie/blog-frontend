import { getTagCount } from '@/apis/tag'

const state = {
  counts: []
}

const mutations = {
  tagCounts(state, list) {
    if (Array.isArray(list)) {
      state.countList = list
    }
  }
}

const actions = {
  // 获取标签统计
  tagCounts({ commit }) {
    getTagCount().then(list => {
      commit('tagCounts', list)
    })
  }
}

const getters = {
  tagCounts(state) {
    return state.countList
  }
}

const module = {
  state,
  mutations,
  actions,
  getters
}

export default module
