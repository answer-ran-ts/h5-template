
import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

import getters from './getters'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
  },
  state: {},
  mutations: {},
  actions: {},
  getters
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
  // strict: debug,
  // 如果正在使用 vue-devtools，你可能不需要此插件
  // plugins: debug ? [createLogger()] : []
})
