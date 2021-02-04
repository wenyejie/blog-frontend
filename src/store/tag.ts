import { getTagCount } from '@/apis/tag'

const state = {
  counts: []
}

const mutations = {
  tagCounts(state: any, list: any) {
    if (Array.isArray(list)) {
      state.countList = list
    }
  }
}

const actions = {
  // 获取标签统计
  tagCounts({ commit }: any) {
    getTagCount().then((list: any) => {
      commit('tagCounts', list)
    })
  }
}

const getters = {
  tagCounts(state: any) {
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
