import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter) 

import routes from './routes'
import {getCookieKey} from "../utils/util"
var router=new VueRouter({
    mode: 'history',//去掉8080后面的#
    routes:routes
})


// router.beforeEach(function(to,from,next){
//     console.log(document.cookie);
//     console.log(getCookieKey("token"))
//     var token;
//     if(to.name=="favourite"){
//         token =getCookieKey("token")
//         if(token){
//             next()
//         }else{
//             alert("111")
//         }
//     }else{
//         next()
//     }
// })

//登录拦截
let hasLogin = false // 是否登录过
router.beforeEach((to, from, next) => {
  if(document.cookie.includes('_kuke_token')  ){
    next()
  }else{
    if(to.path==='/login'){
      next()
    }else{
      if(hasLogin){
        Cookie.clear('_kuke_token')
      }
      next({path: '/login'})
    }
  }
})



 export default router