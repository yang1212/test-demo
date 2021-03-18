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
          component: () => import(/* webpackChunkName: 'register' */ '../views/loginPanel/index')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: 'register' */ '../views/registerPanel/index')
        }
      ]
    },
    {
      path: '/billManager',
      name: 'billManager',
      redirect: 'billManager/home',
      component: () => import(/* webpackChunkName: 'tab1' */ '../views/layout/index'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/billList/index')
        },
        {
          path: 'countData',
          name: 'countData',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/countData/index')
        },
        {
          path: 'memberInfo',
          name: 'memberInfo',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/memberInfo/index')
        }
      ]
    }
  ]
})
