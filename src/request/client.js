import axios from 'axios'
import Vue from 'vue'
import {API_URL, BASE_URL} from './api'

// 弹窗
function toastShow (msg, time = 2000) {
  Vue.$vux.toast.show({
    type: 'text',
    time: time,
    text: msg,
  })
}

// 错误统一处理
function errorHandler (error) {
  // 断网或请求超时提示
  const errorStr = error.toString()
  let networkError
  if (errorStr === 'Error: Network Error') {
    networkError = '请检查网络连接'
  } else if (errorStr.indexOf('Error: timeout') >= 0) {
    networkError = '加载失败, 请稍后重试'
  }

  if (networkError) {
    Vue.$vux.toast.show({
      type: 'text',
      text: networkError,
      position: 'middle',
      width: '60%',
      isShowMask: true,
    })
    return
  }

  const {data, status} = error.response
  const {code, message} = (data && data.errors) || {}

  // 如果 token 为空, 过期或错误
  if (status === 419) {
    console.error('TOKEN 过期')

    return axios.get(`${API_URL}token`)
      .then(({data}) => {
        document.head.querySelector('meta[name="csrf-token"]').content = data.data.token
        toastShow('请求失败, 请重试')
      })
  }

  if (status === 404) {
    return toastShow('页面对象不存在')
  }

  const actions = {
    1001: () => {
      toastShow('验证失败')
    },

    2000: () => {
      toastShow('请授权登录用户信息')
      window.location.href = `${BASE_URL}/user/login`
    },

    2001: () => {
      toastShow('请关注微信公众号')
      window.location.href = `${BASE_URL}/qrcode`
    },

    2002: () => {
      toastShow(message)
    },

    3000: () => {
      toastShow('漫画已购买')
    },
  }

  if (actions[code]) {
    actions[code].call()
  } else {
    toastShow(message || '服务异常', 3000)
  }
}

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {
  const token = document.head.querySelector('meta[name="csrf-token"]').content
  const options = {
    baseURL: baseUrl,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'X-CSRF-TOKEN': token,
      'X-Requested-With': 'XMLHttpRequest',
    },
  }

  const client = axios.create(options)
  client.interceptors.request.use(
    config => {
      Vue.$vux.loading.show('Loading')
      return config
    },
    error => {
      Vue.$vux.toast.show({
        type: 'text',
        text: '网络出错',
        position: 'middle',
        width: '60%',
        isShowMask: true,
      })
      return Promise.reject(error)
    }
  )

  client.interceptors.response.use(
    response => {
      Vue.$vux.loading.hide()
      return response.data
    },
    error => {
      Vue.$vux.loading.hide()
      errorHandler(error)

      // For try...catch(e)
      return Promise.reject(error)
    }
  )

  return client
}

export default getClient
