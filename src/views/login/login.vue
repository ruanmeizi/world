<template>
    <div class="login">
		<!-- 头部 -->
        <header-bar></header-bar>
        <div class="warp">
            <div class="login-main">
                <div class="login-left">
                    <div class="login-song">
                    	<p class="song-con">INDIA Baluji Shrivastav's Re-Orient (Indian World Music Fusion)</p>
                        <dl>
                            <dd>
                                <img src="../../assets/EUCD2275.gif" alt="">
                            </dd>
                            <dt>
                                <div class="song-control">
                                	<img :src='img' alt="" @click="audition()">
                                    <p class="listen">{{$t("lang.loginlisten")}}</p>
                                </div>
                            </dt>
                        </dl>
                    </div>
                    <div class="login-text">
                    	<div class="login-textTit">{{$t("lang.logincontent")}}</div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.logincontent1")}} </p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.logincontent2")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.logincontent3")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.logincontent4")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.logincontent5")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.logincontent6")}}</p>
                        </div>
                        <div class="song-more" v-if="showmore">
	                        <div class="login-con">
	                            <span>
	                                <img src="../../assets/icon-triangle.png" alt="">
	                            </span>
	                            <p>{{$t("lang.logincontent7")}}</p>
	                        </div>
                        </div>
                        <div class="More" @click="more">
                            <p v-if="showmore">{{$t("lang.close")}}</p>
                            <p v-else>{{$t("lang.more")}}</p>

                        </div>
                    </div>
                    <div class="login-text">
                    	<div class="login-textTit">{{$t("lang.loginfeatures")}}</div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p> {{$t("lang.loginfeatures1")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures2")}}</p>
                            <ul>
                                <li>{{$t("lang.loginfeatures2li1")}}</li>
                                <li>{{$t("lang.loginfeatures2li2")}}</li>
                                <li>{{$t("lang.loginfeatures2li3")}}</li>
                            </ul>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures3")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures4")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p> {{$t("lang.loginfeatures5")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures6")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures7")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures8")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures9")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures10")}}</p>
                        </div>
                        <div class="login-con">
                            <span>
                                <img src="../../assets/icon-triangle.png" alt="">
                            </span>
                            <p>{{$t("lang.loginfeatures11")}}</p>
                        </div>           
                    </div>
                </div>
                <div class="login-right">
                    <div class="userLogin">
                    	<!-- <form id="userLoginForm" disabled="false"> -->
                            <!-- 用户 -->
                            <p>{{$t("lang.user")}}</p>
                            <input type="text" name="loginID" id="user" class="user" required="" v-model="account">
                            <!-- 密码 -->
                            <p>{{$t("lang.password")}}</p>
                            <input type="password" name="password" id="password" class="password" minlength="2" required="" v-model="password">
                            
                            <!-- <input type="submit" name="Submit" value="登录" @click="go_to_login()" class="btn-login"> -->
                            <el-button :plain="true" class="btn-login" @click="go_to_login()">登录</el-button>


                            <!-- 忘记密码和注册 -->
                            <div>
                                <!-- <router-link class="login-fogot" :to="{name:'forgot'}">{{$t("lang.forgotpassword")}}</router-link>
                                <router-link class="login-fogot  fr" :to="{name:'regist'}">{{$t("lang.regist")}}</router-link> -->
                            </div>
                            <!-- 显示登录状态 -->
                            <div class="login-failed" v-show="flog">
                                登录失败！</div>
                            <div class="login-failedText" v-show="flog">
                                用户名或密码错误
                            </div>
                            <!-- qq 微信 微博 登录 -->
                            <div class="icon">
                                <!-- <a><img src="../../assets/icon_QQ.png" alt="" class="" @click="otherlogin('qq')"></a> -->
                                <a><img src="../../assets/icon_Wechat.png" alt="" class="" @click="otherlogin('wechat')"></a>
                                <a><img src="../../assets/icon_Blog.png" alt="" @click="otherlogin('sina')"></a>
                            </div>
                        <!-- </form> -->
                    </div>
                    <div class="subscribeNow">
                        <div id="free-15minute" class="free">
                            <dl>
                                <dd>
                                    <img src="../../assets/icon-listen.png" alt="">
                                </dd>
                                <dt>
                                    <p>{{$t("lang.loginfree")}}</p>
                                    <p>{{$t("lang.loginbroese")}}</p>
                                </dt>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <audio :src="location"  loop ref="tryaudio" @pause="onPause" @play="onPlay"></audio>
        <login-foot></login-foot>
    </div>
</template>

<script>
import {setCookie} from "../../utils/util"
import {loginaccount,loginlaunch,worldaddress,loginip,logintoken,loginInfo} from "../../api/api"
import header_bar from "../../components/header_bar"
import login_foot from "../../components/login_foot"
import crypto from 'crypto'

export default {
    data(){
        return{
            account:"",
            password:"",
            showmore:false,
            flog:false,
            location:"",
            playing:false,
            img:require('../../assets/icon-songplay.png'),
            worldname:'',
            worldexpire:"",
        }
    },
    created() {
        var lett = this;
        document.onkeydown = function(e) {
            var key = window.event.keyCode;
            if (key == 13) {
                lett.enterSearchMember();
            }
        }
    },
    methods:{
        getUrlParam:function (url,name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            url = url.substr(url.lastIndexOf("?"),url.length);
            var r = url.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
         go_to_login:function() {
             var  reg_phone=/^1[3578]\d{9}$/;
             var reg_password=/\w{6,12}/
            if(this.account==""){
                this.$message({
                    message: '请填写账户名',
                    type: 'warning'
                });
                return;
            }
            if(this.password=="" || !reg_password.test(this.password)){
                this.$message({
                    message: '请正确写入密码，要求6-12位数字或者字母',
                    type: 'warning'
                });
                return;
            }
            //用于返回请求的数据
            // this.axios.$http.post("/user/login",{account:this.account,password:this.password}).then(res=>{
            //     console.log(res)
                    // if(res.data.msg=="success"){
                    //     this.$router.push("/index/home",{
                    //         setCookie("token",res.data.token)
                    //     })
                    // }   
            // })
            const md5 = crypto.createHash('md5')
            md5.update(this.password)
            let password = md5.digest('hex')
            //console.log(password)

            loginaccount({
                account:this.account,
                passwd:password,
            }).then((res)=>{
                console.log(res.data);
                if(res.msg=="成功"){
            
                    this.worldname=res.data.userName || res.data.userNickName　|| res.data.userPhoneNo 
                    this.worldexpire=res.data.userAudioExprDate || res.data.orgAudioExprDate
                    this.$cookies.set('_kuke_name',this.worldname)
                    this.$cookies.set('_kuke_time',this.worldexpire)
                    this.$cookies.set('_kuke_loginType',res.data.loginType)
                    //本地
                    // this.$cookies.set('_kuke_token', res.data._kuke_token)
                    //document.cookie='_kuke_token='+res.data._kuke_token+';path=/;'
                    // 线上
                    document.cookie='_kuke_token='+res.data._kuke_token+';path=/;domain=.kuke.com'
                    this.resetSetItem('kuke',"{}")
                    this.$router.push("/index/home")
                    this.$store.commit('setloginTime',res.time)
                    this.$store.commit('setlocalLogoutTime',new Date().getTime())
                }else if(res.msg=="登录失败"){
                    this.flog=true
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        more:function(){
            if(this.showmore){
                this.showmore=false;
            }else{
                this.showmore=true;
            }
        },
        otherlogin(val){
            this.$store.commit("isthirdpartylogins", true);
            loginlaunch({
                type:val,
                referUrl:location.href
            }).then(res=>{
                // location.href = res.data;
                 window.open(res.data)
            }).catch(err=>{
                console.log(err)
            })
            //console.log(this.thirdpartylogins)
            var _this = this;
            if(this.thirdpartylogins){
                window.addEventListener('message', function (e) {
                    
                    //本地
                    //document.cookie='_kuke_token='+e.data+';path=/;'
                    // 线上
                    document.cookie='_kuke_token='+e.data+';path=/;domain=.kuke.com'
                    console.log(e.data)
                    if(e.data!=undefined){
                        loginInfo().then(res=>{
                            console.log(res)
                            this.worldname=res.data.userName || res.data.userNickName　|| res.data.userPhoneNo || res.data.orgName
                            this.worldexpire= res.data.userAudioExprDate || res.data.orgAudioExprDate

                            this.$cookies.set('_kuke_name',this.worldname)
                            this.$cookies.set('_kuke_time',this.worldexpire)
                            this.$cookies.set('_kuke_loginType',res.data.loginType)

                            _this.$router.push({path:"/index/home"})
                            this.$store.commit('setloginTime',res.time)
                            this.$store.commit('setlocalLogoutTime',new Date().getTime())
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                })
            }
        },
        audition(){
            return this.playing ? this.pause() : this.play()
        },
        // 播放音频
        play () {
            this.$refs.tryaudio.play()
            this.img=require('../../assets/icon-songpause.png')
        },
        // 暂停音频
        pause () {
            this.$refs.tryaudio.pause()
            this.img=require('../../assets/icon-songplay.png')
        },
        // 当音频播放
        onPlay () {
            this.playing = true
        },
        // 当音频暂停
        onPause () {
            this.playing = false
        },
        enterSearchMember() {
            this.go_to_login()
        }
    },
    components:{
        "header-bar":header_bar,
        "login-foot":login_foot,
    },
    computed:{
        login(){
            return this.$store.state.login;
        },
        thirdpartylogins(){
            return this.$store.state.thirdpartylogins;
        }
    },
    mounted(){
        if(this.login==false){
            logintoken().then(res=>{
                if(res.code=='success'){
                    this.worldname=res.data.userName || res.data.userNickName　|| res.data.userPhoneNo || res.data.orgName
                    this.worldexpire= res.data.userAudioExprDate || res.data.orgAudioExprDate

                    this.$cookies.set('_kuke_name',this.worldname)
                    this.$cookies.set('_kuke_time',this.worldexpire)
                    this.$cookies.set('_kuke_loginType',res.data.loginType)
                    //本地                   
                    //this.$cookies.set('_kuke_token',res.data._kuke_token)
                    // 线上
                    document.cookie='_kuke_token='+res.data._kuke_token+';path=/;domain=.kuke.com'
                    console.log(res.data)
                    this.$router.push("/index/home")
                    // this.$store.commit('setloginTime',new Date().getTime())
                    // console.log(res.time)
                    this.$store.commit('setloginTime',res.time)
                    this.$store.commit('setlocalLogoutTime',new Date().getTime())
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        worldaddress({  
            trackId:'3863239'
        })
        .then(res => {
            this.location=res.data
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        });    
        // var _this = this;
        // if(this.thirdpartylogins){
        //     window.addEventListener('message', function (e) {
                
        //         //本地
        //         document.cookie='_kuke_token='+e.data+';path=/;'
        //         // 线上
        //         //document.cookie='_kuke_token='+res.data._kuke_token+';path=/;domain=.kuke.com'
        //         console.log(e.data)
        //         if(e.data!=undefined){
        //             loginInfo().then(res=>{
        //                 console.log(res)
        //                 this.worldname=res.data.userName || res.data.userNickName　|| res.data.userPhoneNo || res.data.orgName
        //                 this.worldexpire= res.data.userAudioExprDate || res.data.orgAudioExprDate

        //                 this.$cookies.set('_kuke_name',this.worldname)
        //                 this.$cookies.set('_kuke_time',this.worldexpire)
        //                 this.$cookies.set('_kuke_loginType',res.data.loginType)

        //                 _this.$router.push({path:"/index/home"})
        //             }).catch(err=>{
        //                 console.log(err)
        //             })
        //         }
        //     })
        // }
    }
};
</script>
<style>

.login .warp,
.logout .warp {
  width: 100%;
  background: #f7f9fa;
  min-height: 520px;
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
.login .login-main .login-left {
  width: 675px;
  padding: 0 40px 0 0px;
  color: #666666;
  float: left;
}
.login .login-main .login-text {
  margin-top: 30px;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
}
.login .login-main .login-text .login-textTit {
  font-size: 24px;
  color: #cc3d55;
  height: 35px;
  border-bottom: 1px solid #ccc;
}
.login .login-main .login-con {
  padding: 5px 0;
  overflow: hidden;
}
.login .login-main .login-left .login-con span {
  width: 27px;
  display: block;
  float: left;
}
.login .login-main .login-left .login-con p {
  width: 587px;
  float: left;
}
.login .login-main .login-left .More {
  color: #cc3d55;
  height: 40px;
  line-height: 60px;
  padding-left: 28px;
}
.login .login-main .login-left .More p {
  display: inline-block;
  cursor: pointer;
}
/* .login .login-main .login-left .song-more {
  display: none;
} */
.login .login-main .login-left .login-song {
  height: 321px;
  background: #fff;
  padding: 30px;
}
.login .login-main .login-left .login-song .song-con {
  min-height: 30px;
  font-size: 18px;
  padding-bottom: 15px;
}
.login .login-main .login-left .login-song dd {
  width: 290px;
  height: 290px;
  border-radius: 10px;
  overflow: hidden;
  float: left;
}
.login .login-main .login-left .login-song dd img {
  width: 290px;
  height: 290px;
}
.login .login-main .login-left .login-song dt {
  margin-left: 30px;
  float: left;
  width: 295px;
}
.login .login-main .login-left .login-song dt .song-control {
  width: 100%;
  text-align: center;
  margin-top: 81px;
  cursor: pointer;
}
.login .login-main .login-left .login-song dt .song-tit {
  color: #cc3d55;
  height: 38px;
  line-height: 38px;
}
.login .login-main .login-left .login-song dt .listen {
  font-size: 18px;
  color: #cc3d55;
  margin-top: 20px;
}
.login .login-main .login-right {
  width: 308px;
  float: right;
}
.login .login-main .login-right .userLogin {
    width: 258px;
    background: #fff;
    border-radius: 10px;
    color: #999999;
    padding: 20px 25px 0;
}
.login .login-main .login-right .userLogin p {
  height: 30px;
  line-height: 30px;
}
.login .login-main .login-right .userLogin input {
  width: 256px;
  height: 40px;
  border: 1px solid #999999;
  border-radius: 5px;
  text-indent: 10px;
}
.login .login-main .login-right .userLogin .login-fogot {
   display: inline-block;
    height: 30px;
    line-height: 25px;
  color: #cc3d55;
}
.login .login-main .login-right .userLogin .btn-login {
  margin-top: 18px;
  width: 258px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background: #cc3d55;
  font-size: 17px;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
}
.login .login-main .login-right .userLogin .login-failed {
  height: 30px;
  line-height: 30px;
  color: #ef423b;
  font-size: 14px;
}
.login .login-main .login-right .userLogin .login-failedText {
  font-size: 14px;
  color: #666666;
  margin-bottom: 10px;
}
.login .login-main .login-right .userLogin .icon {
  padding: 20px 0;
  width: 258px;
  border-top: 1px solid #e6e6e6;
}
.login .login-main .login-right .userLogin .icon img {
    margin-top: 18px;
    cursor: pointer;
}
.login .login-main .login-right .userLogin .icon .icon-f {
  margin-top: 18px;
}
.login .login-main .login-right .latestNews {
  margin-top: 20px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.login .login-main .login-right .latestNews p {
  height: 52px;
  line-height: 52px;
  padding-left: 20px;
  color: #666666;
}
.login .login-main .login-right .latestNews img {
  width: 308px;
  height: 395px;
}
.login .login-main .login-right .subscribeNow {
  background: #fff;
  border-radius: 10px;
}
.login .login-main .login-right .subscribeNow .sub {
  text-align: center;
  margin-top: 20px;
  position: relative;
  display: block;
}
.login .login-main .login-right .subscribeNow .contactUs,
.login .login-main .login-right .subscribeNow .FAQS,
.login .login-main .login-right .subscribeNow .quick {
  text-align: center;
  position: relative;
  display: block;
}
.login .login-main .login-right .subscribeNow .sub button {
  width: 250px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background: #cc3d55;
  margin-top: 30px;
  cursor: pointer;
}
.login .login-main .login-right .subscribeNow .contactUs button,
.login .login-main .login-right .subscribeNow .FAQS button,
.login .login-main .login-right .subscribeNow .quick button {
  width: 250px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background: #cc3d55;
  margin-top: 14px;
  cursor: pointer;
}
.login .login-main .login-right .subscribeNow .quick button {
  margin-bottom: 30px;
  cursor: pointer;
}
.login .login-main .login-right .subscribeNow .sub img {
  position: absolute;
  left: 44px;
  bottom: 7px;
}
.login .login-main .login-right .subscribeNow .contactUs img,
.login .login-main .login-right .subscribeNow .FAQS img {
  position: absolute;
  left: 44px;
  bottom: 10px;
}
.login .login-main .login-right .subscribeNow .free {
    width: 248px;
    margin: 0 auto;
    margin-top: 20px;
    padding-top: 19px;
    padding-bottom: 19px;
    cursor: pointer;
}
.login .login-main .login-right .subscribeNow .free dl {
  display: flex;
}
.login .login-main .login-right .subscribeNow .free dl dd {
  margin-right: 9px;
}
.login .login-main .login-right .subscribeNow .free dl dt p:nth-child(1) {
  font-size: 13px;
  color: #666666;
}
.login .login-main .login-right .subscribeNow .free dl dt p:nth-child(2) {
  color: #999999;
}
.login-con ul,.login-con ul li{
    list-style-type:disc;
    padding-top:5px;
}
.login-con ul{
   padding-top:10px;
    padding-left:40px;
}
</style>


