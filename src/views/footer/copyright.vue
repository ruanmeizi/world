<template>
<div>
    <header-bar></header-bar>
    <div class="middle-warp">
			<div class="middle-main">
				<p class="mTitle">
					<em></em>{{ $t("lang.Copyrightinformation")}}
				</p>
			</div>
			<div class="middle-main">
				<div class="conInfo">
					<p class="style24 demotitle">{{ $t("lang.Copyrightstatement")}}</p>					
					<p>{{ $t("lang.Copyrightstatement1")}}</p>
					<p class="style24 demotitle">{{ $t("lang.CooperationrecordcompaniesL")}}</p>
					<table class="privacyP-tab">
						<tbody>
							<tr>
								<td><img src="../../assets/company01.jpg" width="145px"></td>
								<td><img src="../../assets/company02.jpg" width="145px"></td>
								<td><img src="../../assets/company03.jpg" width="145px"></td>
								<td><img src="../../assets/company04.jpg" width="145px"></td>
								<td><img src="../../assets/company05.jpg" width="145px"></td>
								<td><img src="../../assets/company06.jpg" width="145px"></td>
								<td><img src="../../assets/company07.jpg" width="145px"></td>
							</tr>
							<tr>
								<td><img src="../../assets/company08.jpg" width="145px"></td>
								<td><img src="../../assets/company09.jpg" width="145px"></td>
								<td><img src="../../assets/company10.jpg" width="145px"></td>
								<td><img src="../../assets/company11.jpg" width="145px"></td>
								<td><img src="../../assets/company12.jpg" width="145px"></td>
								<td><img src="../../assets/company13.jpg" width="145px"></td>
								<td><img src="../../assets/company14.jpg" width="145px"></td>
							</tr>
						</tbody>
					</table>
					<p class="style24 demotitle">{{ $t("lang.HNHInternationalLtd")}}</p>
					<p>{{ $t("lang.Copyrightstatement2")}}</p>
					<p>{{ $t("lang.Copyrightstatement3")}}</p>
					<p>{{ $t("lang.Copyrightstatement4")}}</p>
					<p>{{ $t("lang.Copyrightstatement5")}}</p>
					<p>{{ $t("lang.Copyrightstatement6")}}</p>
					<p class="style24 demotitle">{{ $t("lang.CountdownRecord")}}</p>
					<p>{{ $t("lang.Copyrightstatement7")}}</p>
					<p>{{ $t("lang.Copyrightstatement8")}}</p>
					<p>{{ $t("lang.Copyrightstatement9")}}</p>
					<p>{{ $t("lang.Copyrightstatement10")}}</p>					
				</div>
			</div>
	     <!-- footer底部 -->
         <!-- loading -->
 

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

</style>

