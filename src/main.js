import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import App from './App'
import router from './router'
import store from './store/index'

Vue.use(elementUI, {
  size: 'medium'// set element-ui default size
})
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
