import axios from 'axios';
import { SERVER_URL } from './api';
// import { Storage } from 'commons/js/utils';
// import router from "../router";

axios.defaults.baseURL = SERVER_URL; // 设置默认服务地址
axios.defaults.timeout = 0;//不设置超时时长

// http请求拦截器
axios.interceptors.request.use(config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上toke
    // let token = Storage.getItem('G_TOKEN');
    // config.headers.Authorization = '9e8a5cec41cf3442a5534c555a9e474d54f738aab69e18c19be943dc3d2456f7';
    // if (token) config.headers.Authorization = token;
    return config;
}, error => {
    return Promise.reject(error);
});

var is401 = false;

// http响应拦截器
axios.interceptors.response.use(res => {
    return res;
}, error => {
    return Promise.reject({
        response: {
            data: {
                msg: '服务器出错'
            }
        }
    });
});

export default axios;
