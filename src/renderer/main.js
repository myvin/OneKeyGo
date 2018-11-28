import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'font-awesome/css/font-awesome.min.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.use(mavonEditor)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
