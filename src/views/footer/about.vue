<template>
<div>
    <header-bar></header-bar>
    <div class="middle-warp">
        <div class="middle-main">
            <p class="mTitle"><em></em>{{ $t("lang.Aboutus")}}</p>
        </div>
        <div class="middle-main">
            <div class="conInfo">
                <p class="style24 mBottom demotitle">{{ $t("lang.CompanyProfile")}}</p>
                <p>{{ $t("lang.Aboutusfield1")}}</p>
                <p>{{ $t("lang.Aboutusfield2")}}</p>
                <p>{{ $t("lang.Aboutusfield3")}}</p>
                <p>{{ $t("lang.Aboutusfield4")}}</p>
                <p>{{ $t("lang.Aboutusfield5")}}</p>
                <p class="style24 mBottom demotitle">{{ $t("lang.WorkEnvironment")}}</p>
                <p><img src="../../assets/comBanner05.jpg" width="100%"></p>
                <p class="style24 mBottom demotitle">{{ $t("lang.OfficialWeChat")}}</p>
                <div class="mBottom">
                    <img src="../../assets/qrcode-weixin.jpg" width="154px">
                    <div style="display:inline-block;vertical-align:top;padding-top:20px;padding-left:30px;">
                        <p class="style24 mBottom">{{ $t("lang.KukeArtistCenter")}}</p>
                        <p class="faqs_A">{{ $t("lang.recommendation1")}}</p>
                        <p class="faqs_A">{{ $t("lang.recommendation2")}}</p>
                    </div>						                    	
                </div>
                <p class="style24 mBottom demotitle">{{ $t("lang.OfficialMicroblog")}}</p>
                <div class="mBottom">
                    <img src="../../assets/qrcode-weixin-kuke.png">
                    <div style="display:inline-block;vertical-align:top;padding-top:20px;padding-left:30px;">
                        <p class="style24 mBottom">{{ $t("lang.kukemicroblog")}}</p>
                        <a href="http://weibo.com/kukemusic" target="_blank"><img src="../../assets/guanzhu.jpg" alt=""></a>
                    </div>						                    	
                </div>
                <p class="style24 mBottom demotitle">{{ $t("lang.Doubansite")}}</p>
                <div class="mBottom">
                    <img src="../../assets/kuke-douban.png">
                    <div style="display:inline-block;vertical-align:top;padding-top:20px;padding-left:30px;">
                        <p class="style24 mBottom">库客音乐</p>
                        <a href="https://site.douban.com/125361/" target="_blank"><img src="../../assets/guanzhu1.jpg" alt=""></a>
                    </div>						                    	
                </div>
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

