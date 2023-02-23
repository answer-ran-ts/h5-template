/*
 * @Description:
 * @Date: 2022-06-09 16:01:16
 * @LastEditors: ranqi
 * @LastEditTime: 2022-11-07 14:56:04
 */
import router from './router'
import storage from 'store'
import store from './store'

import { ACCESS_TOKEN } from '@/store/mutation-types'


const allowList = ['/login']

router.beforeEach(async (to, from, next) => {
  to.meta && typeof to.meta.title !== 'undefined'
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === '/login') {
      next({ path: 'index' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('GetInfo')
          const accessRoutes = await store.dispatch('GenerateRoutes', {
            roles: store.getters.roles
          })
          for (let i = 0, length = accessRoutes.length; i < length; i++) {
            router.addRoute(accessRoutes[i])
          }
          // console.log(accessRoutes, 46)
          // 添加首页动态路由
          const indexRouter = {
            path: '/index',
            redirect: accessRoutes[0].path
          }
          router.addRoute(indexRouter)

          next({ ...to, replace: true })
        } catch (error) {
          store.dispatch('Logout').then(() => {
            alert("请求用户信息失败，请重试")
            next(`/login?redirect=${to.path}`)
          })
        }
      }
    }
  } else {
    if (allowList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
