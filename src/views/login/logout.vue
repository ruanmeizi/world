<template>
    <div class="logout">
		<!-- 头部 -->
        <header-bar></header-bar>
        <div class="warp">
            <div class="logout-main">
                <p>{{$t('lang.loggedout')}}</p>
            </div>
        </div>
        <!-- 尾部-->
        <login-foot></login-foot>
    </div>
</template>
<script>
import header_bar from "../../components/header_bar"
import login_foot from "../../components/login_foot"
export default {
    data(){
        return{
            myVar:""
        }
    },
    components:{
        "header-bar":header_bar,
        "login-foot":login_foot,
    },
    created(){
      this.myVar=setInterval(()=>{
          this.$router.push('/login')
      },2000)
    },
    beforeDestroy(){
        clearInterval(this.myVar);
    }
}
</script>
<style>

.login .warp,
.logout .warp {
  width: 100%;
  background: #f7f9fa;
  /* min-height: 520px; */
}
.login .login-main {
  width: 1024px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  padding-bottom: 40px;
}
.logout .logout-main {
  width: 1200px;
  margin: 40px auto 60px;
  height: 280px;
  padding-top: 40px;
  background: #fff;
  text-align: center;
  line-height: 280px;
  font-size: 14px;
  color: #999999;
}
</style>


