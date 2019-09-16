<template>
<div>
    <header-bar></header-bar>
    <div class="middle-warp">
			<div class="middle-main">
				<p class="mTitle">
					<em></em>{{ $t("lang.Businesscooperation")}}
				</p>
			</div>
			<div class="middle-main">
				<div class="conInfo">
					<p>{{ $t("lang.Businesscooperation1")}}</p>
					<div class="con-table">
	                     <h3 class="style24 demotitle">{{ $t("lang.Businessdepartment")}}</h3>
	                     <p><b>{{ $t("lang.Telephone")}}：</b>010-65610392</p>
	                     <p><b>{{ $t("lang.Postcode")}}：</b>100024</p>
	                     <p class="eps"><b>Blogroll：</b>{{ $t("lang.detailedaddress")}}</p>
	                     <p style="overflow:hidden"><b>E-Mail：</b><a class="faqs-a" href="mailto:service@kuke.com" title="service@kuke.com">service@kuke.com</a></p>
	                </div>
					<p class="style24 demotitle">{{ $t("lang.Blogroll")}}</p>
					<ul class="demoul">
						<li>{{ $t("lang.poppcpopcom")}}</li>
						<li>{{ $t("lang.ZCOM")}}</li>
						<li>{{ $t("lang.FocusonTianjin")}}</li>
						<li>{{ $t("lang.jjshomecom")}}</li>
						<li>{{ $t("lang.Naxosradiostation")}}</li>
						<li>{{ $t("lang.TsinghuaUniversity")}}</li>
						<li>{{ $t("lang.PekingUniversity")}}</li>
						<li>{{ $t("lang.NanjingUniversity")}}</li>
						<li>{{ $t("lang.Huazhong")}}</li>
						<li>{{ $t("lang.TongjiUniversity")}}</li>
						<li>{{ $t("lang.CentralConservatory")}}</li>
						<li>{{ $t("lang.ShanghaiConservatory")}}</li>
						<li>{{ $t("lang.ynet")}}</li>
						<li>{{ $t("lang.BeijingConcertHall")}}</li>
						<li>{{ $t("lang.MusicBusinessChina")}}</li>
						<li>{{ $t("lang.LittleMusician")}}</li>
					</ul>
					<p class="style24 demotitle">{{ $t("lang.Partners")}}</p>
					<table class="privacyP-tab">
						<tbody>
							<tr>
								<td><img src="../../assets/friend01.jpg" width="169px"></td>
								<td><img src="../../assets/friend02.jpg" width="169px"></td>
								<td><img src="../../assets/friend03.jpg" width="169px"></td>
								<td><img src="../../assets/friend04.jpg" width="169px"></td>
								<td><img src="../../assets/friend05.jpg" width="169px"></td>
								<td><img src="../../assets/friend06.jpg" width="169px"></td>
							</tr>
							<tr>
								<td><img src="../../assets/friend07.jpg" width="169px"></td>
								<td><img src="../../assets/friend08.jpg" width="169px"></td>
								<td><img src="../../assets/friend09.jpg" width="169px"></td>
								<td><img src="../../assets/friend10.jpg" width="169px"></td>
								<td><img src="../../assets/friend11.jpg" width="169px"></td>
								<td><img src="../../assets/friend12.jpg" width="169px"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
    </div>
    <login-foot></login-foot>
</div>
</template>
<script>
import header_bar from "../../components/header_bar";
import login_foot from "../../components/login_foot";
export default {
  data() {
    return {};
  },
  components: {
    "header-bar": header_bar,
    "login-foot": login_foot
  }
};
</script>
<style>

</style>
