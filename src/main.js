import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import { Button, Dialog, Dropdown, DropdownItem, Input, Select, Form, Timeline, TimelineItem, Card, Upload, DatePicker } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 按需引入echarts
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
// 引入提示框、title等组件
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import App from './App'
import router from './router'
import store from './store/index'

const eleEnum = [Button, Dialog, Dropdown, DropdownItem, Input, Select, Form, Timeline, TimelineItem, Card, Upload, DatePicker]
eleEnum.forEach((item) => {
  Vue.use(item)
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
