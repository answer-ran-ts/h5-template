
export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
]
