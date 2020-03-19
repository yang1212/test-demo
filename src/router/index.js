import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/home/homePage'
// import Detail from '@/pages/detail/detailPage'
// import Content from '@/pages/content/contentPage'
// import Index from '@/pages/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: () => import(/* webpackChunkName: 'index' */ '../pages/index'),
      children: [
        {
          path: '/user/:userId', 
          name: 'user',
          component: () => import(/* webpackChunkName: 'index/tab1' */ '../pages/home/HomePage')
        }
      ]
    }
  ]
  // routes: [
  //   {
  //     path: '/from',
  //     name: 'index',
  //     // component: Index,
  //     component: () => import(/* webpackChunkName: 'index' */ '../pages/index'),
  //     children: [
  //       {
  //         path: 'page1',
  //         name: 'tab1',
  //         // component: Home
  //         component: () => import(/* webpackChunkName: 'index/tab1' */ '../pages/home/HomePage')
  //       },
  //       {
  //         path: 'page2',
  //         name: 'tab2',
  //         // component: Detail
  //         component: () => import(/* webpackChunkName: 'index/tab2' */ '../pages/detail/detailPage')
  //       },
  //       {
  //         path: 'page3',
  //         name: 'tab3',
  //         // component: Content
  //         component: () => import(/* webpackChunkName: 'index/tab3' */ '../pages/content/contentPage')
  //       }
  //     ]
  //   }
  // ]
})