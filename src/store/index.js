import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登录之后用来存储用户信息
    userInfo: {}
  },
  mutations: {
    // 从localStorage中获取用户登录的信息
    getUserInfoForLocalStorage(state, vue) {
      state.userInfo = vue.$localStorage.get('userInfo')
    }
  },
  actions: {},
  modules: {}
})
