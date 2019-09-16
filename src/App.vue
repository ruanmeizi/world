<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
        msg:'App.vue',
        currentRouter:'/'
      }
  },
   watch:{
      '$route':function(to,from){
          this.currentRouter=to.path;
      }
    },
    beforeMount(){
        this.currentRouter=this.$route.path;
    },
    mounted(){
      // // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
      // window.onbeforeunload = function (e) {
      //     // var storage = window.localStorage;
      //     // storage.clear()
      //     // localStorage.setItem('name',new Date().getTime())
      //     // var  n= window.event.screenX - window.screenLeft; 
      //     // if(window.event.clientY < 0 || window.event.altKey){
      //     //     // alert("是关闭而非刷新");
      //     //     localStorage.setItem('name',new Date().getTime())
      //     // }
      //     window.sessionStorage["tempFlag"] = true;
      // }
      // window.onload = function(){
      //   if(!window.sessionStorage["tempFlag"]){
      //     localStorage.setItem('name',new Date().getTime())
      //   }
      // }
    }
}
</script>
<style>
</style>
