<template>
<div>
    <header-bar></header-bar>
    <div class="middle-warp">
            <div class="middle-main">
                <p class="mTitle"><em></em>{{ $t("lang.Contactus")}}</p>
            </div>
            <div class="middle-main">				            
                <p class="conInfo style24 demotitle">{{ $t("lang.KukeKuke")}}</p>
				<p><img src="../../assets/comSite478.jpg" width="100%"></p>
                <p class="conInfo style24 demotitle">Contact</p>
                <div class="con-list cf">
                <ul class="con-ul">
                    <li>
                        <p><b>{{ $t("lang.address")}}:</b>{{ $t("lang.detailedaddress")}}</p>
                        <!-- <p>
                            <span>Email:</span> 
                            <a class="faqs-a" href="mailto:service@kuke.com" title="service@kuke.com">service@kuke.com</a>
                        </p> -->
                    </li>
                    <!-- <li>
                    	<p><b>电 话：</b>010-65610392</p>
                    </li> -->
                </ul>
                <ul class="con-ul">
                    <li>
                        <p><b>{{ $t("lang.Faxes")}}：</b>010-65618079</p>
                    </li>
                    <li>
                    	<p><b>{{ $t("lang.Telephone")}}：</b>010-65610392</p>
                    </li>
                </ul>
                </div>
                <div class="con-table">
                     <h3 class="style24 demotitle">{{ $t("lang.Customerservicecenter")}}</h3>
                     <p><b>E-Mail：</b> <a class="faqs-a" href="mailto:service@kuke.com" title="service@kuke.com">service@kuke.com</a></p>
                     <p><b>{{ $t("lang.Telephone")}}：</b>400-650-1812</p>
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
