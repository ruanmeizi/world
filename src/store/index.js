import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={//要设置的全局访问的state对象
    showFooter:true,
    fristtrackId:"",
    kuke:null,
    kuke1:'',
    login:false,
    hide:false,
    thirdpartylogins:false,
    loginTime:'',
    logoutTime:'',
    localLogoutTime:'',
}

const getters = {   //实时监听state值的变化(最新状态)
    isShow(state) {  //方法名随意,主要是来承载变化的showFooter的值
        return state.showFooter
     }
}
const mutations={
    frist(state,step) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.fristtrackId = step;
    },
    iskuke(state,msg){
        state.iskuke=msg,
        localStorage.setItem('kuke1',msg)
    },
    islogin(state,value){
        state.login=value
    },
    ishide(state,value){
        state.hide=value
    },
    isthirdpartylogins(state,value){
        state.thirdpartylogins=value
    },
    setloginTime(state,value){
        state.loginTime=value
        localStorage.setItem("loginTime",value)
    },
    setlogoutTime(state,value){
        state.logoutTime=value;
    },
    setlocalLogoutTime(state,value){
        state.localLogoutTime=value
        localStorage.setItem("localLogoutTime",value)
    }
}
 
const store = new Vuex.Store({
    state,
    getters,
    mutations
});

export default store;