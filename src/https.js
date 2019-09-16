/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import Vue from 'vue'
import axios from 'axios'
import QS from 'qs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//axios.defaults.baseURL = 'http://192.168.0.56:8763/world-api';  //配置接口地址
axios.defaults.timeout = 20000; // 请求超时时间

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';  //配置post请求头

axios.defaults.withCredentials = true;


//全局设置loading
let loading

let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数

function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0,0,0,0.7)',
    target: document.querySelector('.loading-area'), // 设置加载动画区域
  })
}
function endLoading () {
  loading.close()
}
//拦截器
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

axios.interceptors.request.use((config) => {
    showFullScreenLoading()
    return config;
},(error) =>{
    console.log('错误的传参')
    hideFullScreenLoading()
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
     hideFullScreenLoading()
     return response;
    },
    error => {
    hideFullScreenLoading()
     return Promise.reject(error)
    }
)
// // http响应拦截器
// axios.interceptors.response.use(data => {
//     hideFullScreenLoading() // 响应成功关闭loading
//     return data
// }, error => {
//     hideFullScreenLoading()
//     let _status = error.response && error.response.status
//     if (_status === 504 || _status === 404) {
//       // 跳转404页面（目前没有，只能先跳转首页）
//       //router.push({ path: '/' })
//     }
//     return Promise.reject(error)
// })

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){ 
 return new Promise((resolve, reject) =>{  
  axios.get(url, {   
   params: params  
  })  
  .then(res => {   
   resolve(res.data);  
  })  
  .catch(err => {   
   reject(err.data)  
  }) 
 });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) { 
    return new Promise((resolve, reject) => {   
        axios.post(url, QS.stringify(params))  
        .then(res => {   
        resolve(res.data);  
        })  
        .catch(err => {   
        reject(err.data)  
        }) 
    });
}
/** 
 * detele方法，对应detele请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function detele(url, params) { 
    return new Promise((resolve, reject) => {   
        axios.delete(url, QS.stringify(params))  
        .then(res => {   
        resolve(res.data);  
        })  
        .catch(err => {   
        reject(err.data)  
        }) 
    });
}

/** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function put(url, params) { 
    return new Promise((resolve, reject) => {   
        axios.put(url, QS.stringify(params))  
        .then(res => {   
        resolve(res.data);  
        })  
        .catch(err => {   
        reject(err.data)  
        }) 
    });
}
    