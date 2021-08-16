import { createStore } from 'vuex'
import article from './article'
import tag from './tag'
import { localUserInfo } from '@/storages'

export default createStore({
  state: {
    userInfo: localUserInfo()
  },
  mutations: {
    userInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {},
  getters: {
    userInfo(state) {
      return state.userInfo
    },
    // 确认是否登录
    isLogin(state) {
      return !!state.userInfo.account
    }
  },
  modules: {
    article,
    tag
  }
})
