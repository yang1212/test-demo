import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'index',
      // redirect: 'blogManager/home',
      component: () => import(/* webpackChunkName: 'index' */ '../views/index')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: 'tab1' */ '../views/registerPanel/index')
    },
    {
      path: '/billManager',
      name: 'billManager',
      component: () => import(/* webpackChunkName: 'tab1' */ '../views/billList/index')
    }
  ]
})
