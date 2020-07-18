import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ECharts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts
// 这样每个组件引用echarts时不需要import，用$echarts即可

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
