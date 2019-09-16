<template>
  <div class="container">
    <div class="side">
      <div class="logo" @click="go_tohome">
        <img src="../assets/logo.png" alt>
      </div>
      <ul class="nav" @click="toRoute">
        <router-link :tag="'li'" :to="{name:'home'}" class="lis" dir='/index/home'>
          <span class="navtab-home">{{ $t("lang.lefterhome")}}</span>
        </router-link>
        <router-link :tag="'li'" :to="{name:'person'}" class="lis" dir='/index/person/composer_list/A'>
          <span class="navtab-person" >{{ $t("lang.lefterpeople")}}</span>
        </router-link>
        <!-- <router-link :tag="'li'" :to="{name:'category'}" class="lis" dir='/index/category'>
          <span class="navtab-category">{{ $t("lang.leftercatagories")}}</span>
        </router-link> -->
        <router-link :tag="'li'" :to="{name:'culture'}" class="lis" dir='/index/culture'>
          <span class="navtab-culture">{{ $t("lang.lefterculture")}}</span>
        </router-link>
        <router-link :tag="'li'" :to="{name:'range'}" class="lis" dir='/index/area/range'>
          <span class="navtab-area">{{ $t("lang.lefterarea")}}</span>
        </router-link>
        <router-link :tag="'li'" :to="{name:'label'}" class="lis" dir='/index/label'>
          <span class="navtab-labels">{{ $t("lang.lefterlabels")}}</span>
        </router-link>
        <router-link :tag="'li'" :to="{name:'playlist_my'}" class="lis" dir='/index/playlist/playlist_my' v-if="this.cooklogin!='ip'">
          <span class="navtab-playlists">{{ $t("lang.lefterplaylists")}}</span>
        </router-link>
        <router-link :tag="'li'" :to="{name:'playlist_naxos'}" class="lis" dir='/index/playlist/playlist_my' v-show="this.cooklogin=='ip'">
          <span class="navtab-playlists">{{ $t("lang.lefterplaylists")}}</span>
        </router-link>
        <router-link :tag="'li'" :to="{name:'favourite'}" class="lis" dir='/index/favourite'>
          <span class="navtab-favourite">{{ $t("lang.lefterfavourite")}}</span>
        </router-link>
      </ul>

      <div class="pop18" id="login-pop" v-show="hide">
        <input type="hidden" id="indexFav">
        <div class="overlay"></div>
        <div class="pop">
          <div class="popTitle">
            <p>{{ $t("lang.UserLogin")}}</p>
          </div>
          <div class="poppeople-logo">
            <div class="popAside">
              <form id="login-form" method="post">
                <input type="text" id="login-username" name="login-username" :placeholder='$t("lang.Account")' v-model="username">
                <br><br><br>
                <input type="password" id="login-password" name="login-password" :placeholder='$t("lang.Password")' v-model="password">
              </form>
            </div>
          </div>
          <p class="pop-msg" color="red" ref="red" id="popmsgred">{{remind}}</p>
          <p class="popExplain">{{ $t("lang.Pleaseenter")}}</p>
          <div class="btnBox">
            <button class="btn save saveTrackFolder" id="login-submit" @click="gologin()">{{ $t("lang.Enter")}}</button>
            <button class="btn cancel" id="login-cancel" @click="cancel()">{{ $t("lang.Cancel")}}</button>
          </div>
        </div>
		  </div>
  
    </div>
    <div class="head">
      <div class="user">
        <img src="../assets/icon-user.png" alt>
        <span>{{cookname}}</span>
      </div>
      <div class="head-use">
        <a class="headTime"><span>{{ $t("lang.expiredate")}}:{{cooktime | formatDate}}</span></a>
        <!-- 退出登录 -->
        <a class="exit logout" @click="exit">
          <img src="../assets/icon-exit.png" alt>
        </a>
        <!-- 国际化 -->
        <a class="language">
          <img src="../assets/icon-language.png" alt>
          <ul>
            <li @click="changeLangEvent($event)">English</li>
            <li @click="changeLangEvent($event)">Simplified Chinese (简体中文)</li>
          </ul>
        </a>
      </div>
      <!-- 高级搜索 -->
      <a class="seach">
        <button id="AdSearch" @click="gotoadvancedsearch()">{{ $t("lang.headersearch")}}</button>
        <!-- <router-link :tag="'button'" :to="{name:'advancedsearch'}">{{ $t("lang.headersearch")}}</router-link> -->
      </a>
      <div class="searchp"></div>
      <div id="search-form" class="seach-input" autocomplete="off">
        <button type="submit" id="search-click" class="seach-icon" @click="gotosearch()"></button>
        <!-- <router-link :tag="'button'" :to="{name:'search'}"  class="seach-icon"></router-link> -->
        <!-- <a id="search-href">
          <span></span>
        </a> -->
        <!-- <input
          type="search"
          name="q"
          placeholder="Keyword Search"
          id="searchKeyword"
          class="search ui-autocomplete-input"
          autocomplete="off"
          v-model="keyword"
        > -->
        <input type="search" placeholder="Keyword Search" id="searchKeyword" class="search ui-autocomplete-input" autocomplete="off" v-model="keyword"> 
      </div>
    </div>
    <!-- 主体 -->
    <router-view class="warp"></router-view>
    <!-- 播放器 -->
    <player @child='show'></player>
    <!-- footer -->
    <login-foot></login-foot>
  </div>
</template>
<script>
function formatDate(timestamp) {     
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  console.log(Y);
  return Y + M + D;
}  

import login_foot from "../components/login_foot";
import player from "../components/player";
import { logout,loginaccount,online,visit,playTrack} from "../api/api";
import {worldcatalogue,personinfo,worldcultural,arearegion,worldcountry,catlabel,worldplaylistinfo} from "../api/api";
import crypto from 'crypto'
export default {
  data() {
    return {
      flag: false,
      keyword: "",
      cookname: "",
      cooktime: "",
      cooklogin: "",
      username:'',
      password:'',
      routerpath:'',
      isturefavourite:false,
      remind:'',
      timer:'',
      sourceName:''
    };
  },
  created() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.enterSearchMember();
      }
    };
  },
  components: {
    "login-foot": login_foot,
    player: player
  },
  computed:{
    hide(){
        return this.$store.state.hide;
    },
    loginTime(){
        return this.$store.state.setloginTime=localStorage.getItem('loginTime')
    },
    localLogoutTime(){
        return this.$store.state.setlocalLogoutTime=localStorage.getItem('localLogoutTime')
    }
  },
  watch: {
    $route(to, from) {
      if(to.name=='favourite' &&this.cooklogin=='ip'){
        this.$store.commit("ishide", true);
      }
    this.routerpath=this.$route.path
    let path = this.$route.path;
    let lis = document.querySelectorAll(".lis");

    let url='test-world.kuke.com'+this.$route.path;
    let newpath = this.$route.path;
    let sourceType=''
    let sourceId=''
    //资源名称
    let sourceName=''
    let sourceCName=''

    //home
    if(newpath=='/index/home'){
      sourceType='index'
      visit({
        sourceType:sourceType,
        url:url,
      }).then(v=>{
        console.log(v)
      }).catch(err=>{
        console.log(err)
      })
    }
    //catalogue
    var _this=this;
    if(newpath.indexOf("/catalogue/") != -1){
      sourceType='catalogue'
      sourceId=newpath.split('/')[2]
      worldcatalogue({
        catalogueFields:'catalogueName',
        catalogueId:sourceId
      })
      .then(res=>{
        console.log(sourceId)
        console.log(sourceType)
        console.log(url)
        console.log(res.data.catalogueName)
        visit({
          sourceId:sourceId,
          sourceType:sourceType,
          url:url,
          sourceName:res.data.catalogueName
        }).then(v=>{
          console.log(v)
        }).catch(err=>{
          console.log(err)
        })
      })
      .catch(err=>{});
    }
    //composer
    if(newpath.indexOf("composer") != -1 &&newpath.indexOf("/composer_info/") == -1){
        sourceType='composer'
        console.log(sourceType)
        console.log(url)
        visit({
          sourceType:sourceType,
          url:url,
        }).then(v=>{
          console.log(v)
        }).catch(err=>{
          console.log(err)
        })
       
    }
    if(newpath.indexOf("/composer_info/") != -1){
      sourceType='composer'
      sourceId=newpath.split('/')[3]
      personinfo({
        personId:sourceId
      }).then(res=>{
        console.log(res.data.fullCName)
        console.log(res.data.fullName)
        console.log(url)
        console.log(sourceType)
        console.log(sourceId)
        visit({
          sourceType:sourceType,
          url:url,
          sourceName:res.data.fullName,
          sourceCName:res.data.fullCName,
          sourceId:sourceId,
        }).then(v=>{
          console.log(v)
        }).catch(err=>{
          console.log(err)
        })
      }).catch(err=>{
        console.log(err)
      })
    }
    //artist  
    if(newpath.indexOf("artist") != -1 && newpath.indexOf("/artist_info/") == -1){
      sourceType='composer'
      visit({
        sourceType:sourceType,
        url:url,
      }).then(v=>{
        console.log(v)
      }).catch(err=>{
        console.log(err)
      })
    }
    if(newpath.indexOf("/artist_info/") != -1){
      sourceType='composer'
      sourceId=newpath.split('/')[3]
      personinfo({
        personId:sourceId
      }).then(res=>{
        console.log(res.data.fullCName)
        console.log(res.data.fullName)
        console.log(url)
        console.log(sourceType)
        console.log(sourceId)
        visit({
          sourceType:sourceType,
          url:url,
          sourceName:res.data.fullName,
          sourceCName:res.data.fullCName,
          sourceId:sourceId,
        }).then(v=>{
          console.log(v)
        }).catch(err=>{
          console.log(err)
        })
      }).catch(err=>{
        console.log(err)
      })
    }

    //culturelist  culture
    if(newpath.indexOf("culture") != -1 &&newpath.indexOf("/culturelist/") == -1){
      sourceType='culture'
      visit({
        sourceType:sourceType,
        url:url,
      }).then(v=>{
        console.log(v)
      }).catch(err=>{
        console.log(err)
      })
    }
    if(newpath.indexOf("/culturelist/") != -1){
        sourceId=newpath.split('/')[3]
        sourceType='culture'
        worldcultural({
          workSubCatCode:sourceId,
        }).then((res)=>{
          console.log(res.data.workSubCatCName)
          console.log(res.data.workSubCatDesc)
          console.log(url)
          console.log(sourceType)
          console.log(sourceId)
          visit({
            sourceType:sourceType,
            url:url,
            sourceName:res.data.workSubCatDesc,
            sourceCName:res.data.workSubCatCName,
            sourceId:sourceId,
          }).then(v=>{
            console.log(v)
          }).catch(err=>{
            console.log(err)
          })
        })
    }

    //area
    if(newpath.indexOf("area") != -1 && newpath.indexOf("/arealist/") == -1 && newpath.indexOf("/areatable/") == -1){
      sourceType='area'
      visit({
        sourceType:sourceType,
        url:url,
      }).then(v=>{
        console.log(v)
      }).catch(err=>{
        console.log(err)
      })
    }
    if(newpath.indexOf("/arealist/") != -1){
      sourceId=newpath.split('/')[3]
      sourceType='area'
      arearegion({
        regionId:sourceId
      }).then(res=>{
        console.log(res.data.cname)
        console.log(res.data.name)
        console.log(url)
        console.log(sourceType)
        console.log(sourceId)
        visit({
          sourceType:sourceType,
          url:url,
          sourceName:res.data.name,
          sourceCName:res.data.cname,
          sourceId:sourceId,
        }).then(v=>{
          console.log(v)
        }).catch(err=>{
          console.log(err)
        })
      })
    }
    if(newpath.indexOf("/areatable/") != -1){
      sourceId=newpath.split('/')[3]
      sourceType='area'
      worldcountry({
        countryId:sourceId
      }).then(res=>{
        console.log(res.data.displayCName)
        console.log(res.data.displayName)
        console.log(url)
        console.log(sourceType)
        console.log(sourceId)
        visit({
          sourceType:sourceType,
          url:url,
          sourceName:res.data.displayName,
          sourceCName:res.data.displayCName,
          sourceId:sourceId,
        }).then(v=>{
          console.log(v)
        }).catch(err=>{
          console.log(err)
        })
      }).catch(err=>{
        console.log(err)
      })
    }
    //label
    if(newpath.indexOf("label") != -1 && newpath.indexOf("/label_list/") == -1){
      sourceType='label'
      visit({
        sourceType:sourceType,
        url:url,
      }).then(v=>{
        console.log(v)
      }).catch(err=>{
        console.log(err)
      })
    }
    if(newpath.indexOf("/label_list/") != -1){
      sourceType='label'
      sourceId=newpath.split('/')[3]
      catlabel({
        catlabelId:sourceId
      }).then(res=>{
        console.log(res.data.displayName)
        console.log(url)
        console.log(sourceType)
        console.log(sourceId)
        visit({
          sourceType:sourceType,
          url:url,
          sourceName:res.data.displayName,
          sourceId:sourceId,
        }).then(v=>{
          console.log(v)
        }).catch(err=>{
          console.log(err)
        })
      }).catch(err=>{
        console.log(err)
      })
    }

    //playlist
    if(newpath.indexOf("playlist") != -1 && newpath.indexOf("playlist/tracklist") == -1){
      sourceType='playlist'
      visit({
        sourceType:sourceType,
        url:url,
      }).then(v=>{
        console.log(v)
      }).catch(err=>{
        console.log(err)
      })
    }
    if(newpath.indexOf("playlist/tracklist") != -1){
      sourceType='playlist'
      sourceId=newpath.split('/')[4]
      worldplaylistinfo({
        playlistId:sourceId
      }).then(res=>{
        console.log(res.data.playlistName)
        console.log(url)
        console.log(sourceType)
        console.log(sourceId)
        visit({
          sourceType:sourceType,
          url:url,
          sourceName:res.data.playlistName,
          sourceId:sourceId,
        }).then(v=>{
          console.log(v)
        }).catch(err=>{
          console.log(err)
        })
      }).catch(err=>{
        console.log(err)
      })
    }

    //favourite
    if(newpath.indexOf("favourite") != -1){
      sourceType='favourite'
      visit({
        sourceType:sourceType,
        url:url,
      }).then(v=>{
        console.log(v)
      }).catch(err=>{
        console.log(err)
      })
    }

    // visit({
    //   sourceId:sourceId,
    //   sourceType:sourceType,
    //   url:url,
    //   sourceName:this.sourceName
    // }).then(res=>{
    //   console.log(res)
    // }).catch(err=>{
    //   console.og(err)
    // })


    //首页
    //更多
      if (path == "/moredetail") {
        path = "/index/home";
    }
    //people
    if (path.indexOf("/index/person/") != -1) {
        path = "/index/person/composer_list/A";
      // window.changeFlog(false)
    }
    if (path.indexOf("/index/work") != -1) {
        path = "/index/person/composer_list/A";
    }
    if (path.indexOf("/index/composer_info") != -1) {
        path = "/index/person/composer_list/A";
    }
    if (path.indexOf("/index/artist_info") != -1) {
        path = "/index/person/composer_list/A";
    }
  
    //文化
      if (path.indexOf("/index/culture/") != -1) {
        path = "/index/culture";
    }
      if (path.indexOf("/index/culturelist") != -1) {
        path = "/index/culture";
    }
     //地区
      if (path.indexOf("/index/area") != -1) {
        path = "/index/area/range";
    }
    //厂牌
      if (path.indexOf("/index/label") != -1) {
        path = "/index/label";
    }
    //播放列表
      if (path.indexOf("/index/playlist") != -1) {
        path = "/index/playlist/playlist_my";
    }
    //根据router添加添加class
    lis.forEach(function(item) {
      item.firstElementChild.classList.remove("listselect");
      // console.log(item.getAttribute("dir"))
      if (item.getAttribute("dir") == path) {
        item.firstElementChild.classList.add("listselect");
      }
    });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    changeLangEvent(e) {
      location.reload();
      if (e.currentTarget.innerHTML == "English") {
        this.$i18n.locale = "en"; //关键语句
        document.cookie = "lang=en;path=/";
      } else if (e.currentTarget.innerHTML == "Simplified Chinese (简体中文)") {
        this.$i18n.locale = "zh";
        document.cookie = "lang=zh;path=/";
      }
    },
    // nav的路由跳转
    toRoute(e) {
      let lis = document.querySelectorAll(".lis");
      lis.forEach(function(item) {
        item.firstElementChild.classList.remove("listselect");
      });
      e.target.classList.add("listselect");
      window.changeFlog(false);
    },
    // 点击退出
    exit() {
      this.$router.push("/logout");
      this.$store.commit("islogin", true);
      // this.$store.commit("setlogoutTime", new Date().getTime());
      var now=new Date().getTime()
      //本地时间差
      var timedifference=now-this.localLogoutTime
      //推出时间
      var logoutTime=this.loginTime*1+timedifference*1

      console.log(timedifference)
      console.log(logoutTime)
      console.log(this.loginTime)

      online({
        duration:timedifference,
        loginTime:this.loginTime,
        logoutTime:logoutTime
      }).then(c=>{
        console.log(c)
      }).catch(err=>{
        console.log(err)
      })

      this.timer=setInterval(function(){
        logout()
        .then(res => {
          console.log("123354365767687")
          console.log(res)
        })
        .catch(err => {
          console.log(err);
        });
        this.$cookies.remove("_kuke_name");
        this.$cookies.remove("_kuke_token");
        this.$cookies.remove("_kuke_loginType");
      }, 500);
    },
    go_tohome() {
      this.$router.push("/index/home");
    },
    go_player() {
      // this.$router.push({
      //   name: "player"
      // });
    },
    gotosearch() {
      if (this.keyword != "") {
        this.$router.push({
          name: "search",
          params: { id: this.keyword }
        });
      }
    },
    gotoadvancedsearch() {
       this.$router.push({
        name: "advancedsearch"
      });
    },
    enterSearchMember() {
      this.gotosearch();
    },
    gologin(){
      var  reg_phone=/^1[3578]\d{9}$/;
      var reg_password=/\w{6,12}/
      var red=document.getElementById('popmsgred')
      var lang=this.$cookies.get("lang")
      if(this.username==""){
        if(lang=='en'){
          this.remind='Please enter your account number.'
        }else{
          this.remind='请输入账号'
        }
        return;
      }
      if(this.password=="" || !reg_password.test(this.password)){
          if(lang=='en'){
            this.remind='Please input your password with 6 to 12 numbers.'
          }else{
            this.remind='请输入密码（长度为6-12位）'
          }
          return;
      }
      const md5 = crypto.createHash('md5')
            md5.update(this.password)
            let password = md5.digest('hex')
      loginaccount({
          account:this.username,
          passwd:password,
      }).then((res)=>{
          console.log(res);
          if(res.msg=="成功"){
              
              this.worldname=res.data.userName || res.data.userNickName　|| res.data.userPhoneNo
              this.worldexpire=res.data.userAudioExprDate || res.data.orgAudioExprDate
              this.$cookies.set('_kuke_name',this.worldname)
              this.$cookies.set('_kuke_time',this.worldexpire)
              this.$cookies.set('_kuke_loginType',res.data.loginType)
              //本地
              //this.$cookies.set('_kuke_token', res.data._kuke_token)
              // 线上
              document.cookie='_kuke_token='+res.data._kuke_token+';path=/;domain=.kuke.com'
              this.resetSetItem('kuke',"{}")

              this.$store.commit("ishide", false);

              location.reload();
              this.$router.push("/index/favourite")
          }else if(res.msg=="登录失败"){
              //this.flog=true
              if(lang=='en'){
                this.remind=' ERROR Incorrect username or password .'
              }else{
                this.remind='用户名或密码错误'
              }
              
          }
      }).catch((err)=>{
          console.log(err)
      })
    },
    cancel(){
      console.log()
      if(this.routerpath.indexOf("/index/favourite") != -1){
        console.log(this.isturefavourite)
        if(this.isturefavourite){
          this.$router.push({name:'home'})
        }else{
          this.$router.go(-1)
        }
        
      }
      this.$store.commit("ishide", false);
    },
    show(data){
      console.log(data)
    }
  },
  filters: {
      //时间戳
      formatDate(time) {
          let date = new Date(time);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ';
    }
  },
  // 刷新的时候防止跳转
  mounted() {
    this.cookname = this.$cookies.get("_kuke_name");
    this.cooktime = this.$cookies.get("_kuke_time") * 1;
    this.cooklogin = this.$cookies.get("_kuke_loginType");
    console.log(this.cooktime);
    let path = this.$route.path;
    let lis = document.querySelectorAll(".lis");
    if(path=='/index/favourite' &&this.cooklogin=='ip'){
      this.$store.commit("ishide", true);
      this.isturefavourite=true
    }
    this.routerpath=path;
    //首页
    //更多
    if (path == "/moredetail") {
      path = "/index/home";
    }
    //people
    if (path.indexOf("/index/person/") != -1) {
      path = "/index/person/composer_list/A";
    }
    if (path.indexOf("/index/work") != -1) {
      path = "/index/person/composer_list/A";
    }
    if (path.indexOf("/index/composer_info") != -1) {
        path = "/index/person/composer_list/A";
    }
    if (path.indexOf("/index/artist_info") != -1) {
        path = "/index/person/composer_list/A";
    }
    //文化
    if (path.indexOf("/index/culture/") != -1) {
      path = "/index/culture";
    }
    if (path.indexOf("/index/culturelist") != -1) {
      path = "/index/culture";
    }
    //地区
    if (path.indexOf("/index/area") != -1) {
      path = "/index/area/range";
    }
    //厂牌
    if (path.indexOf("/index/label") != -1) {
      path = "/index/label";
    }
    //播放列表
    if (path.indexOf("/index/playlist") != -1) {
      path = "/index/playlist/playlist_my";
    }
    //根据router添加添加class
    lis.forEach(function(item) {
      // console.log(item.getAttribute("dir"))
      if (item.getAttribute("dir") == path) {
        item.firstElementChild.classList.add("listselect");
      }
    });
     // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
     //页面刷新时，只执行onunload；页面关闭时，只执行onbeforeunload
    window.onbeforeunload = function (e) {
          // var storage = window.localStorage;
          // storage.clear()
          // localStorage.setItem('name',new Date().getTime())
          // var  n= window.event.screenX - window.screenLeft; 
          // if(window.event.clientY < 0 || window.event.altKey){
          //     // alert("是关闭而非刷新");
          //     localStorage.setItem('name',new Date().getTime())
          // }
          window.sessionStorage["tempFlag"] = true;
          
          if(localStorage.getItem('playercurrentTime')!=0){
              this.imgindex=localStorage.getItem('imgindex')
              console.log(this.imgindex)
              //单曲ID
              console.log(this.imgindex.trackId)
              //单曲来源
              console.log(this.imgindex.origin)
              //厂牌ID
              console.log(this.imgindex.catlabelId)
              //专辑ID
              console.log(this.imgindex.catalogueId)
              //时长
             
              var durationtime=localStorage.getItem('playercurrentTime')
              //结束时间
              console.log(new Date().getTime())
              var endtime=new Date().getTime()
              //开始时间
              // console.log(this.nowtime)
              this.nowtime=localStorage.getItem('playertime')
              playTrack({
                catalogueId:this.imgindex.catalogueId,
                catlabelId:this.imgindex.catlabelId,
                duration:durationtime,
                endTime:endtime,
                origin:this.imgindex.origin,
                startTime:this.nowtime,
                trackId:this.imgindex.trackId
              }).then(res=>{
                console.log(res)
              }).catch(err=>{
                console.log(err)
              })
          }
      }
      window.onload = function(){
        if(!window.sessionStorage["tempFlag"]){
          // localStorage.setItem('name',new Date().getTime())

          var now=new Date().getTime()
          //本地时间差
          var timedifference=now-this.localLogoutTime
          //推出时间
          var logoutTime=this.loginTime*1+timedifference*1

          console.log(timedifference)
          console.log(logoutTime)
          console.log(this.loginTime)

          online({
            duration:timedifference,
            loginTime:this.loginTime,
            logoutTime:logoutTime
          }).then(c=>{
            console.log(c)
          }).catch(err=>{
            console.log(err)
          })
        }
      }
  }
};
</script>
<style>
.container .side {
  z-index: 100;
  width: 120px;
  height: 1300px;
  background: #b3364a;
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
}
.container .side .logo {
  width: 120px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #bd475a;
}
.container .side .nav span {
  width: 120px;
  height: 70px;
  display: block;
  border-bottom: 1px solid #bd475a;
  text-align: center;
  color: #ffccd4;
  cursor: pointer;
  line-height: 106px;
  background: transparent no-repeat center 12px;
}
.container .side .logo img {
  width: 85px;
  height: 40px;
}
.container .side .nav .navtab-home {
  background-image: url("../assets/icon-side1.png");
  background-size: 28px 28px;
}
.container .side .nav .navtab-person {
  background-image: url("../assets/icon-side2.png");
  background-size: 28px 28px;
}
.container .side .nav .navtab-category {
  background-image: url("../assets/icon-side3.png");
  background-size: 28px 28px;
}
.container .side .nav .navtab-culture {
  background-image: url("../assets/icon-side4.png");
  background-size: 28px 28px;
}
.container .side .nav .navtab-area {
  background-image: url("../assets/icon-side5.png");
  background-size: 28px 28px;
}
.container .side .nav .navtab-labels {
  background-image: url("../assets/icon-side6.png");
  background-size: 28px 28px;
}
.container .side .nav .navtab-playlists {
  background-image: url("../assets/icon-side7.png");
  background-size: 28px 28px;
}
.container .side .nav .navtab-favourite {
  background-image: url("../assets/icon-side8.png");
  background-size: 28px 28px;
}

/* .container .side .nav .router-link-active .navtab-home {
  background-image: url("../assets/icon-blue1.png");
}
.container .side .nav .router-link-active .navtab-person {
  background-image: url("../assets/icon-blue2.png");
}
.container .side .nav .router-link-active .navtab-category {
  background-image: url("../assets/icon-blue3.png");
}
.container .side .nav .router-link-active .navtab-culture {
  background-image: url("../assets/icon-blue4.png");
}
.container .side .nav .router-link-active .navtab-area {
  background-image: url("../assets/icon-blue5.png");
}
.container .side .nav .router-link-active .navtab-labels {
  background-image: url("../assets/icon-blue6.png");
}
.container .side .nav .router-link-active .navtab-playlists {
  background-image: url("../assets/icon-blue7.png");
}
.container .side .nav .router-link-active .navtab-favourite {
  background-image: url("../assets/icon-blue8.png");
} */

.container .side .nav .lis .navtab-home.listselect {
  background-image: url("../assets/icon-blue1.png");
}
.container .side .nav .lis .navtab-person.listselect {
  background-image: url("../assets/icon-blue2.png");
}
.container .side .nav .lis .navtab-category.listselect {
  background-image: url("../assets/icon-blue3.png");
}
.container .side .nav .lis .navtab-culture.listselect {
  background-image: url("../assets/icon-blue4.png");
}
.container .side .nav .lis .navtab-area.listselect {
  background-image: url("../assets/icon-blue5.png");
}
.container .side .nav .lis .navtab-labels.listselect {
  background-image: url("../assets/icon-blue6.png");
}
.container .side .nav .lis .navtab-playlists.listselect {
  background-image: url("../assets/icon-blue7.png");
}
.container .side .nav .lis .navtab-favourite.listselect {
  background-image: url("../assets/icon-blue8.png");
}
/* header */
.container .head {
  width: 100%;
  margin-left: -120px;
  height: 40px;
  background: #b53448;
  position: fixed;
  line-height: 40px;
  left: 120px;
  top: 0;
  z-index: 3;
}
.container .head .user {
  float: left;
  margin-left: 150px;
  color: #e58a99;
}
/* .container .head .head-use {
  float: left;
  margin-left: 1px;
  color: #e58a99;
  border-left: 1px solid #cc3d55;
  padding: 0 10px;
} */
.container .head .user span {
  padding: 0px 5px;
}
.container .head .head-use .headTime span {
  color: #e58a99;
}
.container .head .head-use .headTime:hover {
  color: #e58a99;
}
.container .sp-user {
  float: left;
}
.container .head .logout {
  cursor: pointer;
}
.container .sp-user button {
  width: 80px;
  line-height: 20px;
  background: #ff6969;
  color: #fff;
  border: none;
  border-radius: 20px;
  margin: 0 10px;
  outline: none;
  vertical-align: middle;
  z-index: 20;
}
.container .head-use a {
  float: left;
  padding: 0 10px;
  border-left: 1px solid #bd475a;
}
.head .head-use .language {
  position: relative;
  cursor: pointer;
}
.head .head-use .language:hover {
  background: #e5e5e5;
}
.head .head-use .language:hover ul {
  display: block;
}
.head .head-use .language ul {
  display: none;
  position: absolute;
  width: 183px;
  top: 40px;
  left: 0;
}
.head .head-use .language ul li {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-indent: 5px;
  background: #e5e5e5;
  color: #333;
}
.head .head-use .language ul li:hover {
  color: #fff;
  background: #b3364a;
  outline: none;
  border: none;
  vertical-align: middle;
}
.container .warp {
  padding: 40px 0 0 120px;
}
/* .container .side .nav .router-link-active span {
  background-color: #fff;
  color: #cc3d55 !important;
} */
.container .side .nav .lis .listselect {
  background-color: #fff;
  color: #cc3d55 !important;
}
.container .seach {
  float: right;
  margin-right: 31px;
  margin-left:17px;
}
.container .searchp{
  float: right;
  height:12px;
  width:1px;
  background: #992e40;
  margin-top:14px;
}
.container .seach button {
  width: 130px;
  color: #222;
  background: #e6a78b;
  border-radius: 5px;
  outline: none;
  border: none;
  vertical-align: middle;
  line-height: 24px;
  z-index: 55;
  cursor: pointer;
}
.container .seach-input {
  float: right;
}
.container .seach-input .ui-autocomplete-input {
  width: 260px;
  height: 24px;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 9px;
}
.container .seach-icon {
  float: right;
  margin-left: 6px;
  margin-right: 14px;
  margin-top: 12px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(../assets/icon-seachwrite.png) no-repeat;
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
}
.router_link_active {
  background: blue;
}

.slide-arrows {
  position: fixed;
  top: 50%;
  right: 0;
  margin-top: -6px;
  z-index: 2;
  cursor: pointer;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.7;
  filter: alpha(opacity=70);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
}
.pop {
  position: fixed;
  left: 50%;
  top: 5%;
  margin-left: -320px;
  z-index: 2001;
}
.pop {
  width: 540px;
  padding: 0 50px;
  background-color: #f5f6fa;
}
.pop .popTitle {
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 24px;
  color: #333;
}
.pop .poppeople-logo {
  height: 250px;
}
.pop .popAside {
  margin-top: 40px;
}
.pop input[type="text"],
.pop input[type="password"],
.pop select {
  width: 538px;
  height: 38px;
  line-height: 38px;
  text-indent: 15px;
  border-radius: 5px;
  border: 1px solid #999;
  background: #fff;
  color: #999;
  font-size: 14px;
}
.pop .popExplain {
  width: 540px;
  height: 28px;
  line-height: 28px;
  text-align: left;
  color: #666;
  font-size: 14px;
}
.pop .btnBox {
  height: 80px;
  text-align: center;
}
.pop .btn,
#setting-ok {
  display: inline-block;
  width: 268px;
  height: 40px;
  font-size: 19px;
  color: #fff;
  background: #b53448;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>