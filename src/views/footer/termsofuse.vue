<template>
    <div>
        <header-bar></header-bar>
        <div class="middle-warp">
            <div class="middle-main">
                <p class="mTitle"><em></em>{{ $t("lang.Privacystatement")}}</p>
            </div>
            <div class="middle-main">
                <div class="conInfo">
                    <p>{{ $t("lang.Privacystatement1")}}</p>
                    <p class="style24 demotitle">{{ $t("lang.Aboutinformation")}}</p>
                    <p>{{ $t("lang.Privacystatement2")}}</p>
                    <p class="style24 demotitle">{{ $t("lang.Aboutuserinformation")}}</p>
                    <p>{{ $t("lang.Privacystatement3")}}</p>
                    <p>{{ $t("lang.Privacystatement4")}}</p>
                    <ol class="demoli">
                    	<li>{{ $t("lang.Privacystatement4a")}}</li>
                    	<li>{{ $t("lang.Privacystatement4b")}}</li>
                    	<li>{{ $t("lang.Privacystatement4c")}}</li>
                    	<li>{{ $t("lang.Privacystatement4d")}}</li>
                    </ol>
                    <p>{{ $t("lang.Privacystatement5")}}</p>
                    <p class="style24 demotitle">{{ $t("lang.UseofCookie")}}</p>
                    <p>{{ $t("lang.Privacystatement6")}}</p>
                    <p>{{ $t("lang.Privacystatement7")}}</p>
                    <p>{{ $t("lang.Privacystatement8")}}</p>
                    <p class="style24 demotitle">{{ $t("lang.Externallinks")}} </p>
                    <p>{{ $t("lang.Privacystatement9")}}</p>
                    <p>{{ $t("lang.Privacystatement10")}}</p>
                    <p class="style24 demotitle">{{ $t("lang.AboutDisclaimer")}}</p>
                    <p>{{ $t("lang.Privacystatement11")}}</p>
                    <ul class="demoul">
                    	<li>{{ $t("lang.Privacystatement12")}}</li>
                    	<li>{{ $t("lang.Privacystatement13")}}</li>
                    	<li>{{ $t("lang.Privacystatement14")}}</li>
                    	<li>{{ $t("lang.Privacystatement15")}}</li>
                    	<li>{{ $t("lang.Privacystatement16")}}</li>
                    	<li>{{ $t("lang.Privacystatement17")}}</li>
                    </ul>
                    <p>{{ $t("lang.Privacystatement18")}}</p>
                </div>
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

</style>

