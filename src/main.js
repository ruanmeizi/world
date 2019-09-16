//main.js存放的是入口文件
import './common/base.css'

import Vue from 'vue'
import App from './App.vue'
import router from "./router/router.config"

import i18n from "./i18n/i18n"
import {setCookie} from "./utils/util"
// setCookie("token",'ajiewrierueirueiw')

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// import {Loading}from 'element-ui'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import axios from 'axios'
Vue.prototype.$axios = axios
import QS from 'qs'
Vue.prototype.qs = QS

import store from "./store"


Vue.config.productionTip = false
/* eslint-disable no-new */


//监听localstorage

Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'kuke') {
      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
            localStorage.setItem(k, val);

              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

              // 派发对象
              window.dispatchEvent(newStorageEvent)
              
          }
      }
      return storage.setItem(key, newVal);
  }
  if (key === 'songurl') {
    // 创建一个StorageEvent事件
    var newStorageEvents = document.createEvent('StorageEvent');
    const storages = {
      setItems: function (k, val) {
          localStorage.setItem(k, val);

            // 初始化创建的事件
            newStorageEvents.initStorageEvent('setItems', false, false, k, null, val, null, null);

            // 派发对象
            window.dispatchEvent(newStorageEvents)
            
        }
    }
    return storages.setItems(key, newVal);
  }
  if (key === 'songinfo') {
    // 创建一个StorageEvent事件
    var newStorageEventss = document.createEvent('StorageEvent');
    const storagess = {
      setItemss: function (k, val) {
          localStorage.setItem(k, val);

            // 初始化创建的事件
            newStorageEventss.initStorageEvent('setItemss', false, false, k, null, val, null, null);

            // 派发对象
            window.dispatchEvent(newStorageEventss)
            
        }
    }
    return storagess.setItemss(key, newVal);
  }
}


//全局设置loading
let loading

let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数

function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '努力加载中...',
    background: 'rgba(0,0,0,0.5)',
    target: document.querySelector('.loading-area') // 设置加载动画区域
  })
}
function endLoading () {
  loading.close()
}
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

//设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
       }
   }
  return "";
} 

router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if(to.meta.title) {
    if(getCookie('lang')=='en'){
      document.title = to.meta.title
    }else if(getCookie('lang')=='zh' || getCookie('lang')==''){
      document.title = to.meta.titleEn
    }
  }
  next();
})

new Vue({
  el: '#app',
  router:router,
  i18n:i18n,
  store,
  render: h => h(App)
})