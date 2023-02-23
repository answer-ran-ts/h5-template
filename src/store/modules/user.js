/*
 * @Description:
 * @Date: 2022-06-09 15:26:55
 * @LastEditors: ranqi
 * @LastEditTime: 2022-11-03 21:10:34
 */
import storage from 'store'
import { login, getInfo, logout } from '@/api/request/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { resetRouter } from '@/router'

const user = {
  state: {
    token: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log("获取token中...");
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            commit('SET_TOKEN', response.data)
            storage.set(ACCESS_TOKEN, response.data, 8 * 24 * 60 * 60 * 1000)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 获取用户信息,此处后期做处理
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response) => {
            const res = response.data
            if (res.roles && res.roles.length > 0) {
              commit('SET_INFO', res)
              commit('SET_ROLES', res.roles)
              commit('SET_AVATAR', res.userName)
            } else {
              reject(new Error('角色不能为空'))
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            storage.remove(ACCESS_TOKEN)
            resetRouter()
            resolve()
          })
      })
    }
  }
}

export default user
