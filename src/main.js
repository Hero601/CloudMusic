import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

Vue.config.productionTip = false

// 允许携带cookie
axios.defaults.withCredentials = true
// 请求根路径
axios.defaults.baseURL = 'http://localhost:3000'

// 设置cookie
// axios.interceptors.request.use(config => {
//   if (!document.cookie) return config
//   config.headers.cookie = document.cookie
//   return config
// })

// axios.interceptors.request.use(config => {
//   if (!document.cookie) return config
//   config.headers.Authorization = document.cookie
//   return config
// })

// 跨域携带cookie
// axios.interceptors.request.use(config => {
//   config.headers.withCredentials = true
//   return config
// })

// axios挂载到根路由
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
