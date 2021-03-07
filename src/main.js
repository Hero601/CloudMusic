import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import storage from './tools/Storage'

Vue.config.productionTip = false

// 允许携带cookie
axios.defaults.withCredentials = true
// 请求根路径
axios.defaults.baseURL = 'http://localhost:3000'

// axios挂载到根路由
Vue.prototype.$http = axios

Vue.prototype.$localStorage = storage

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
