<template>
  <div class="login-head">
    <div class="login-language">
      <div class="login-txt">
        <!-- <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ $t("lang.loginlanguage")}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="English">English</el-dropdown-item>
            <el-dropdown-item command="简体中文">简体中文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        {{ $t("lang.loginlanguage")}}  :
        <el-select  placeholder="选择夹子或新建夹子" v-model="value" @change="selectchange" value-key="id">
          <el-option value="Simplified Chinese (简体中文)" key="1"></el-option>
          <el-option value="English" key="2"></el-option>
        </el-select>
      </div>
    </div>
    <div class="login-title">
      <div class="title-img" @click="go_home()" style="cursor: pointer">
        <img src="../assets/logo.png" alt width="148px">
      </div>
      <p class="tit">
        <span>{{ $t("lang.logintitle1")}}</span>
        <span>{{$t("lang.logintitle2")}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value:'Simplified Chinese (简体中文)'
    };
  },
  methods: {
    // handleCommand(command) {
    //    location.reload()
    //   if (command == "English") {
    //     this.$i18n.locale = "en";
    //     document.cookie='lang=en;path=/'
    //   } else if (command == "简体中文") {
    //     this.$i18n.locale = "zh";
    //     document.cookie='lang=zh;path=/'
    //   }
    // },
    selectchange(){
      location.reload()
      if(this.value=='Simplified Chinese (简体中文)'){
        this.$i18n.locale = "zh";
        document.cookie='lang=zh;path=/'
      }else if(this.value=='English'){
        this.$i18n.locale = "en";
        document.cookie='lang=en;path=/'
      }
    },
    go_home(){
      this.$router.push({
          name: "home",
      });
    }
  },
  mounted(){
    var lang=this.$cookies.get("lang")
    if(lang=='en'){
      this.value='English'
    }else{
      this.value='Simplified Chinese (简体中文)'
    }
  }
};
</script>
<style>
.login-head,
.logout .login-head {
  width: 100%;
  height: 146px;
  background: #b53448;
  overflow: hidden;
}
.login-head .login-language,
.logout .login-head .login-language {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #cc3d55;
  overflow: hidden;
}
.login-head .login-language .login-txt,
.logout .login-head .login-language .login-txt {
  width: 1024px;
  margin: 0 auto;
  line-height: 40px;
  color: #fff;
  padding: 0 20px 0 0;
  text-align: right;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.login-head .login-language .login-txt p,
.logout .login-head .login-language .login-txt p {
  float: right;
  margin-right: 5px;
}
.login-head .login-language .login-txt select,
.logout .login-head .login-language .login-txt select {
  background: #77b7df;
  width: 225px;
  height: 40px;
}
.login-head .login-language .login-txt .ui-selectmenu-button.ui-state-default {
  background: #77b7df;
  float: right;
  color: #1e569f;
  margin-top: 10px;
}
.login-head .login-language .login-txt .ui-selectmenu-button .ui-icon {
  background-position: -9px;
}
.login-head
  .login-language
  .login-txt
  .ui-selectmenu-button
  span.ui-selectmenu-text {
  line-height: 1;
  padding: 0.2em 0em 0.2em 0.4em;
}
.login-head .login-title,
.logout .login-head .login-title {
  overflow: hidden;
  width: 1024px;
  margin: 0 auto;
}
.login-head .login-title .title-img,
.logout .login-head .login-title .title-img {
  height: 106px;
  line-height: 106px;
  display: inline-block;
  float: left;
}
.login-head .login-title .tit,
.logout .login-head .login-title .tit {
  float: left;
  width: 560px;
  margin-top: 24px;
  margin-left: 28px;
  color: #ffccd4;
  font-size: 14px;
}
.login-head .login-title .tit span:first-child {
    display: block;
    margin-bottom: 5px;
}
.login-head .login-title .figures,
.logout .login-head .login-title .figures {
  float: right;
  width: 175px;
  height: 90px;
  border-radius: 5px;
  background: #b4d5ff;
  text-align: center;
  margin-top: 24px;
}
.login-head .login-title .figures .figures-tit,
.logout .login-head .login-title .figures .figures-tit {
  width: 145px;
  height: 20px;
  color: #b4d5ff;
  line-height: 20px;
  background: #1e569f;
  margin: 0 auto;
  margin-top: 8px;
}
.login-head .login-title .figures p,
.logout .login-head .login-title .figures p {
  color: #1e569f;
  height: 18px;
  line-height: 18px;
}
.login-head .login-language .login-txt .el-input__inner{
  height:20px;
  line-height:20px;
}
.el-scrollbar .el-select-dropdown__item.selected{
  color:#000;
}
</style>


