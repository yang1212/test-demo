import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'index',
      redirect: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '../views/index'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: 'login' */ '../views/memberInfo/loginPanel/index')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: 'register' */ '../views/memberInfo/registerPanel/index')
        }
      ]
    },
    {
      path: '/billManager',
      name: 'billManager',
      redirect: 'billManager/home',
      component: () => import(/* webpackChunkName: 'home' */ '../views/layout/index'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import(/* webpackChunkName: 'home' */ '../views/listDetailPage/index')
        },
        {
          path: 'chartData',
          name: 'chartData',
          component: () => import(/* webpackChunkName: 'chartData' */ '../views/chartData/index')
        },
        {
          path: 'memberInfo',
          name: 'memberInfo',
          component: () => import(/* webpackChunkName: 'memberInfo' */ '../views/memberInfo/index')
        }
      ]
    }
  ]
})
