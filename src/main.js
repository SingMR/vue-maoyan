// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './mint/mint.js'
import 'mint-ui/lib/style.css'
import '../static/css/global.css'
import './assets/iconfont/iconfont.css'
import store from './store/store'

Vue.config.productionTip = false

axios.defaults.timeout = 10000
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.filter('imgfliter',function(data) {
  return data.replace(/w.h/, '64.90')  
})
