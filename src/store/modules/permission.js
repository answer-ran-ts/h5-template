/*
 * @Description:
 * @Date: 2022-06-11 19:33:36
 * @LastEditors: ranqi
 * @LastEditTime: 2022-11-04 01:06:36
 */

// store/permission.js
import { cloneDeep } from 'lodash'
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some((role) => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}
// 筛选异步路由
export function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    // 同步异步路由合并
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // 筛选异步路由 --> 同步异步路由合并
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { roles } = data
        const routerMap = cloneDeep(asyncRouterMap)
        let accessedRouters = []
        if (roles.includes('admin')) {
          accessedRouters = routerMap
        } else {
          accessedRouters = filterAsyncRouter(routerMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
