<template>
        <div class="footer">
	    <p class="footer-one">
	    	<img src="../assets/footer-kuke.png">
	    	<span></span>
	    	<img src="../assets/footer-naxos.png" width="48px">
	        <span>|</span><img src="../assets/footer-word.png">
	    </p>
	    <p class="footer-two">
            <router-link tag="a" target="_blank" :to="{name:'about'}">{{ $t("lang.footabout")}}</router-link>
            <span>|</span><router-link tag="a" target="_blank" :to="{name:'termsofuse'}">{{ $t("lang.footprivacy")}}</router-link>
	        <span>|</span><router-link tag="a" target="_blank" :to="{name:'policy'}">{{ $t("lang.footbusiness")}}</router-link>
	        <span>|</span><router-link tag="a" target="_blank" :to="{name:'copyright'}">{{ $t("lang.footcopyright")}}</router-link>        
	        <span>|</span><router-link tag="a" target="_blank" :to="{name:'contactus'}">{{ $t("lang.footcontact")}}</router-link>
	        <span>|</span><router-link tag="a" target="_blank" :to="{name:'advise'}">{{ $t("lang.footfeedback")}}</router-link>
	    </p>
	    <p>
					<router-link tag="a" target="_blank" :to="{name:'network'}">{{ $t("lang.footnetwork")}}</router-link>
	        <span></span><router-link tag="a" target="_blank" :to="{name:'production'}">{{ $t("lang.footRadio")}}</router-link>
	        <span></span><router-link tag="a" target="_blank" :to="{name:'publish'}">{{ $t("lang.footRepublic")}}</router-link>
	    </p>
	    <p>
	    		<router-link tag="a" target="_blank" :to="{name:'footculture'}">{{ $t("lang.footculture")}}</router-link>
	        <span></span><a href="http://www.itrust.org.cn/home/index/wx_certifi/wm/1171774136.html" rel="nofollow" target="_blank">{{ $t("lang.footalliance")}}</a>
	    </p>
	    <p> 
	    		<router-link tag="a" target="_blank" :to="{name:'icp'}">京ICP证030879号</router-link>
	        <span></span><a href="http://www.miibeian.gov.cn/publish/query/indexFirst.action" rel="nofollow" target="_blank">京ICP备09081529号</a>
	        <span></span><span>COPYRIGHT KUKE.COM.ALL RIGHTS RESERVED</span>
	    </p>
	</div>
</template>
<script>
export default {
    methods:{
        test(){
            let target = this.$refs.target
            target.setAttribute('href', window.location.origin + '/home/integral-record')
            target.click()
        }
    }
};
</script>
<style>
.footer {
  width: 100%;
  height: 300px;
  background: #ebeff0;
  text-align: center;
}
.footer p {
  color: #999999;
  padding-top: 20px;
}
.footer p a {
  color: #999999;
  padding-top: 20px;
}
.footer p span {
  padding: 0px 20px;
}
.footer .footer-one {
  padding-top: 40px;
}
.footer .footer-one a {
  color: #999999;
  cursor: pointer;
}
.footer .icon-footer {
  padding-top: 10px;
}
.footer .icon-footer img {
  margin: 0 5px;
}
</style>


