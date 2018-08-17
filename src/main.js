// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'
import { AlertPlugin, LoadingPlugin, ToastPlugin } from 'vux'
import App from './App'
import router from './router'
import store from './store'
import { api } from './request/api'

/**
 * 需要兼容低版本浏览器的 es6 方法分别单个引入, 减小打包体积
 * @see https://github.com/zloirock/core-js/tree/v2 项目 README.md
 * @see https://babeljs.io/docs/en/babel-polyfill#details babel 的说明
 */
require('core-js/fn/object/assign')
require('core-js/es6/promise')

// if (process.env.NODE_ENV === 'production' || process.argv.includes('-p')) {
//   Raven
//     .config('https://7557f5d2900e48c1b3546b17e4c0fc36@sentry.alaskamob.com/2', {
//       whitelistUrls: [
//         /comic\.alaskamob\.com/,
//       ],
//       ignoreErrors: [
//         'WeixinJSBridge is not defined',
//         "Can't find variable: WeixinJSBridge",
//       ],
//     })
//     .addPlugin(RavenVue, Vue)
//     .install()
// }

Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.prototype.$api = api

Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})
