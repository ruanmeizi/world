<template>
    <div class="regist">
        <header-bar></header-bar>
        <div class="warp">
            <div class="register_box">
            	<form id="regist-form" action="#" method="post" autocomplete="off">
            		<p class="regTitle">注册</p>
            		<div class="regLabel" id="username-div" :data-value="$t('lang.mobilephone')" data-msg="">
            			<input type="tel" name="txt_username" class="text" id="txt_username" autocomplete="off" maxlength="40" tabindex="1" value="" :placeholder="$t('lang.inputmobilephone')">
            		</div>
            		<div class="regLabel" id="pwd-div" :data-value="$t('lang.password')" data-msg="">
            			<input type="password" class="text regist-pwd" onpaste="return false;" autocomplete="new-password" tabindex="2" maxlength="12">
            		</div>
            		<div class="regLabel" id="pwdAgain-div" :data-value="$t('lang.repeatpassword')" data-msg="">
            			<input type="password" class="text regist-pwd-again" onpaste="return false" autocomplete="new-password" tabindex="3" maxlength="12">
            		</div>
            		<div class="regLabel" id="vcode-div" :data-value="$t('lang.massgescode')">
            		<input name="txt_pop_sms_vcode" id="regist-vcode" autocomplete="off" maxlength="6" type="text" class="text pin" :placeholder='$t("lang.registinputcode")'>
						<button type="button" class="get_pin" id="sendVcode">{{$t("lang.registcode")}}</button>
            		</div>
            		<div class="clause">
            			<span class="pic_checked pic_checked_on">
                            <input type="checkbox" id="agreement" class="checked_init" checked="checked">
                        </span>
                      	{{$t("lang.registagreed")}}<router-link tag="a" target="_blank" :to="{name:'agreement'}">{{$t("lang.registagreement")}}</router-link>
            		</div>
            		<p class="reg_msg"></p>
            		<button id="registBtn" type="submit" class="btn-login">{{$t("lang.submitnow")}}</button>
            	</form>
            </div>
        </div>
        <login-foot></login-foot>
    </div>
</template>
<script>
import header_bar from "../../components/header_bar"
import login_foot from "../../components/login_foot"
export default {
    data(){
        return{

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
.register_box .clause a {
    color: #cc3d55;
}
</style>


