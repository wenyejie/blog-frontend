import { getTagCount } from '@/apis/tag'
import { AnyObject, Tag } from '@/statement'

const state = {
  counts: []
}

const mutations = {
  tagCounts(state: AnyObject, list: Tag[]) {
    if (Array.isArray(list)) {
      state.countList = list
    }
  }
}

const actions = {
  // 获取标签统计
  tagCounts({ commit }: AnyObject) {
    getTagCount().then(list => {
      commit('tagCounts', list)
    })
  }
}

const getters = {
  tagCounts(state: AnyObject) {
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
