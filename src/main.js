// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill()
//注册时，vux必须放在 import Vue from 'vue'; 之前，否侧打包的体积非常大，估计是vux OR vue 抽风了
import { AlertPlugin,LoadingPlugin,ToastPlugin  } from 'vux'

import Vue from 'vue'

Vue.use( AlertPlugin )
Vue.use( LoadingPlugin )
Vue.use( ToastPlugin )

import axios from './request/axios'
import api from './request/api'
import App from './App'
import router from './router'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  components: { App },
  template: '<App/>'
})
