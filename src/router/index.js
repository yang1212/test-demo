import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'index',
      redirect: 'imageManager3',
      component: () => import(/* webpackChunkName: 'index' */ '../views/index'),
      children: [
        {
          path: '/blogManager/:id',
          name: 'blogManager',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/blogManager/index')
        },
        {
          path: '/addDoc/:id',
          name: 'addDoc',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/blogManager/addDoc')
        },
        {
          path: '/editDoc/:id',
          name: 'editDoc',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/blogManager/editDoc')
        },
        {
          path: '/imageManager1',
          name: 'imageManager',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/imageManager/index')
        },
        {
          path: '/imageManager2',
          name: 'imageManager2',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/imageManager/index')
        },
        {
          path: '/imageManager3',
          name: 'imageManager3',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/imageManager3/index')
        },
        {
          path: '/imageManager4',
          name: 'imageManager4',
          component: () => import(/* webpackChunkName: 'tab1' */ '../views/imageManager4/index')
        }
      ]
    }
  ]
})
