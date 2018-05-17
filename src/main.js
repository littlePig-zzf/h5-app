// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill()

import Vue from 'vue'
import { AlertPlugin,LoadingPlugin,ToastPlugin  } from 'vux'
import { WechatPlugin } from 'vux'

import axios from './request'
import { api } from './request/api.js'
import App from './App'
import router from './router'
import './assets/css/transition.less'
import GlobalComponents from './components/GlobalComponent.js'

Vue.use( WechatPlugin )
Vue.use( AlertPlugin )
Vue.use( LoadingPlugin )
Vue.use( ToastPlugin )
Vue.use( GlobalComponents )

// console.log(Vue.wechat)

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
