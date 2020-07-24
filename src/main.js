import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import './plugins/vcharts.js'
import ECharts from 'echarts'
import VueEcharts from 'vue-echarts'
import './style/index.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts
// 这样每个组件引用echarts时不需要import，用$echarts即可
Vue.component('v-chart', VueEcharts)
// import之后，注册v-chart组件，该组件映射到的实例是VueEcharts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
