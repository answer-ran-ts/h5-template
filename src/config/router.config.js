
export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const constantRouterMap = [
  {
    path: '/login',
    name: 'formLogin',
    component: () => import('@/views/FormLogin.vue')
  },
  {
    path: '/auth',
    name: 'authLogin',
    component: () => import('@/views/AuthLogin.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
]
