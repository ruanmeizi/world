<template>
<div>
    <header-bar></header-bar>
    <div class="middle-warp">
			<div class="middle-main">
				<p class="mTitle">
					<em></em>{{ $t("lang.Feedback")}}
				</p>
			</div>
			<div class="middle-main">
				<div class="conInfo">
					<p>{{ $t("lang.website")}}</p>
					<textarea id="suggest"></textarea>
					<p>{{ $t("lang.leaveyourcontact")}}</p>
					<div style="margin-bottom:30px">
						<label>{{ $t("lang.Mobilephone")}}</label><input type="text" id="tel"><span>{{ $t("lang.codeclearly")}}</span>
					</div>
					<div>
						<label style="letter-spacing: 2.4px;">E-Mail：</label><input type="text" id="email">
					</div>
					<button id="submit">{{ $t("lang.Submit")}}</button>
				</div>
			</div>
	    <login-foot></login-foot>
    </div>
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
.conInfo>p {
    margin-bottom: 20px;
    line-height: 22px;
}
.conInfo textarea#suggest {
    width: 100%;
    height: 300px;
    font-size: 16px;
    line-height: 28px;
    text-indent: 10px;
    margin-bottom: 60px;
}
.conInfo input {
    width: 260px;
    height: 24px;
    border-radius: 5px;
    border: 1px solid #999;
    outline: none;
    text-indent: 10px;
}
.conInfo button#submit {
    width: 260px;
    height: 40px;
    border: none;
    border-radius: 5px;
    color: #fff;
    background: #b53448;
    margin-top: 30px;
    margin-left: 70px;
    cursor: pointer;
}
</style>

