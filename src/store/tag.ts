import { getTagCount } from '@/apis/tag'

const state = {
  countList: []
}

const mutations = {
  countList(state: any, list: any) {
    if (Array.isArray(list)) {
      state.countList = list
    }
  }
}

const actions = {
  // 获取标签统计
  getTagCount({ commit }: any) {
    getTagCount().then((list: any) => {
      commit('countList', list)
    })
  }
}

const getters = {
  countList(state: any) {
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