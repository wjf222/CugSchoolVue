import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  // 类似于属性
  state: {
    //
  },
  // 类似于方法，同步操作
  mutations: {
    //
  },
  // 类似方法，异步操作，最后还是要调用mutations
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
