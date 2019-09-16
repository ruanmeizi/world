<template>
<div class="login-fogot">
    <header-bar></header-bar>

    <div class="">
            <!-- 验证账号 -->
            <div class="register_box" id="register_box">
               <form id="form" action="#" method="post" autocomplete="off">
                  <p class="regTitle">{{$t("lang.ResetPassword")}}</p>
                  <div class="regLabel forgot_sel" :data-value="$t('lang.fogotmode')">
                    <!-- <span class="pic_checked pic_checked_on" style="display:inline-block"> -->
                      <!-- <input type="radio" name="payMethod" value="phone" class="checked_init" checked=""> -->
                          <!-- </span> -->
                          <!-- <el-radio-group fill="#555" v-model="radio2">
                            <el-radio v-model="radio" label="1" fill="red">备选项</el-radio>
                            <el-radio v-model="radio" label="2">备选项</el-radio>
                         </el-radio-group > -->
                          <p>{{$t("lang.fogotMobile")}}</p>
                          <!-- <span class="pic_checked">
                      <input type="radio" name="payMethod" value="email" class="checked_init">
                          </span> -->
                          <p>{{$t("lang.fogotEmail")}}</p>
                  </div>
                  <!-- 手机号码 -->
                  <div id="phone-box">
                    <div class="regLabel" id="phone" :data-value="$t('lang.fogotmodephone')" data-msg="">
                      <input type="tel" name="txt_username" class="text" id="tel-int" autocomplete="off" maxlength="11" value="" :placeholder="$t('lang.fogotpleasephone')">
                    </div>
                    <div class="regLabel" id="phone-vcode-div" :data-value="$t('lang.fogotcode')">
                        <input name="txt_pop_sms_vcode" id="phone-vcode" autocomplete="off" maxlength="6" type="text" class="text pin" :placeholder="$t('lang.fogotinputcode')">
                        <button type="button" class="get_pin" id="phoneSendCode">{{$t("lang.fogotgetcode")}}</button>
                    </div>
                  </div>
                  <!-- 邮箱 -->
                  <div id="email-box" style="display:none;">
                    <div class="regLabel" id="email" data-value="邮箱" data-msg="">
                      <input type="email" class="text regist-pwd" id="email-int" onpaste="return false;" placeholder="请输入邮箱">
                    </div>
                    <div class="regLabel" id="email-vcode-div" data-value="短信验证码">
                            <button type="button" class="get_pin" id="emailSendCode">点击发送验证码至邮箱</button>
                            <input name="txt_pop_sms_vcode" id="email-vcode" autocomplete="off" maxlength="6" type="text" class="text pin" placeholder="请输入邮箱验证码">
                        </div>
                  </div>
                  <div class="clause"></div>
                  <p class="reg_msg"></p>
                  <button type="submit" class="btn-login">{{$t("lang.fogotsubmit")}}</button>
                </form>
              </div>
              <!-- 重置密码 -->
              <div class="changeP-main register_box" style="display:none;">
                <form id="pwd-form">
                  <div class="changP-tit">
                      <p class="regTitle">重置密码</p>
                  </div>
                  <div class="regLabel" id="pwd-tips" data-value="密码:" data-msg="">
                    <input type="password" name="resetPwd" class="resetPwd text" autocomplete="off" maxlength="12">
                  </div>
                  <div class="regLabel" id="pwdAgain-tips" data-value="确认密码:" data-msg="">
                    <input type="password" name="resetPwdAgain" class="resetPwdAgain text" autocomplete="off" maxlength="12">
                  </div>
                  <p class="reg_msg" style="margin-top:0px;"></p>
                  <button id="reset-passWord-btn" type="button" class="btn-login">提交</button>
                </form>
              </div>
            <input type="hidden" id="account">
            <input type="hidden" id="findPwdCode">
          </div>
    <login-foot></login-foot>
</div>

</template>
<script>
import header_bar from "../../components/header_bar"
import login_foot from "../../components/login_foot"
export default {
    data () {
      return {
        radio: '1',
        radio2:"2",
      }
    },
    components:{
        "header-bar":header_bar,
        "login-foot":login_foot,
    }
}
</script>
<style>
    .register_box {
        width: 950px;
        min-height: 364px;
        margin: 40px auto 60px;
        background: #fff;
    }
    .register_box form {
        padding-bottom: 40px;
    }
    .regTitle {
        height: 55px;
        line-height: 55px;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
    .register_box .regLabel {
        min-width: 350px;
        min-height: 38px;
        padding-top: 30px;
        margin-left: 300px;
        position: relative;
    }

.register_box .regLabel:before {
    content: attr(data-value);
    display: inline-block;
    width: 250px;
    height: 38px;
    line-height: 38px;
    text-align: right;
    position: absolute;
    top: 30px;
    left: -260px;
}
.register_box input.text {
    border: 1px solid #e6e6e6;
    font-family: 'Microsoft YaHei';
    height: 18px;
    width: 328px;
    margin-right: 10px;
    padding: 9px 10px;
    line-height: 18px;
    border-radius: 2px;
    color: #333;
}
.register_box .regLabel:after {
    position: absolute;
    content: attr(data-msg);
    display: block;
    width: 300px;
    height: 20px;
    left: 10px;
    font-size: 12px;
    line-height: 20px;
    color: #ff2832;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.register_box .btn-login {
    width: 258px;
    height: 40px;
    border: none;
    border-radius: 5px;
    color: #fff;
     background: #cc3d55;
    font-size: 17px;
    cursor: pointer;
    margin: 10px auto 0px;
    display: block;
}
.register_box .get_pin {
    display: inline-block;
    min-width: 136px;
    height: 38px;
    line-height: 38px;
    background: #f0f0f0;
    padding: 0 10px;
    cursor: pointer;
    border: 0;
    outline: 0;
    font-size: 12px;
    vertical-align: top;
}

.register_box .text.pin {
    width: 150px;
    margin-right: 0px;
    vertical-align: top;
}
.register_box .clause {
    width: 500px;
    margin: 30px auto;
    text-align: center;
}
</style>


