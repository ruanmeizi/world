<template>
<div class="main" id="main">
    <div class="peopleComposers list">
        <div class="cpmposers-wrap">
			<div class="con-peopleComposers">
				<div class="peopleComposers-index">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ path: '/index/home' }">{{$t('lang.lefterhome')}}</el-breadcrumb-item>
						<el-breadcrumb-item>{{worldworkid.workDesc}}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<table class="authorInfo">
					<tbody>
						<tr>
							<td width="20%">古典音乐作曲家: </td>
							<td>{{worldworkid.sortWorkName}}</td>
						</tr>
						<tr>
							<td>作品名称:</td>
							<td>{{worldworkid.workDesc}}</td>
						</tr>
						<tr>
							<td>时长:</td>
							<td>{{worldworkid.yearComposed}}</td>
						</tr>
						<tr>
							<td>作品分类:&nbsp;</td>
							<td>{{worldworkid.categoryName}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="con-table">
				<div class="tab-nav">
					<p>专辑列表</p>
				</div>
				<div class="composers-tab">
					<div id="workInformationContent" class="tab-con" style="display:none;">
						<div style="padding-top:20px;padding-bottom:30px;">
							</div>
					</div>
					<div id="workCatalogueContent" class="tab-con" style="display:block;">
						<div class="discography eps">{{worldworkid.workDesc}}:</div>
						<div class="table-list">
							<el-table :data="cataloguework" style="width: 100%">
								<el-table-column label="序号" width="180">
									<template slot-scope="scope"> <span>{{scope.$index + 1}} </span> </template> 
                            	</el-table-column>
								<el-table-column prop="catalogueId" label="专辑号" width="180">
                            	</el-table-column>
								<el-table-column prop="catalogueName" label="专辑名称">
									<template slot-scope="scope">
										<p class="workName" @click="go_catalogue(scope.row.catalogueId)">{{scope.row.catalogueName}}</p>
									</template>
								</el-table-column>
								<el-table-column prop="catlabelDisplayName" label="厂牌" width="180">
                            	</el-table-column>
								<el-table-column prop="catlabelDisplayName" label="特色艺术家" width="180">
									<template slot-scope="scope">
										<p v-for="(i,index) in scope.row.featuredArtists" :key="index">{{i.fullName}}</p>
									</template>
                            	</el-table-column>
							</el-table>
						</div>
						<div class="waiting-img" id="waiting-img" style="display:none;"><img alt="waiting" src="/static/images/waiting.gif"></div>
					</div>
				</div>
			</div>
		</div>
    </div>
</div>
</template>
<script>
import { worldwork ,cataloguework} from "../../api/api.js";
export default {
    data(){
		return{
			num:'',
			worldworkid:[],
			cataloguework:[],
		}
	},
	methods:{
		go_catalogue(i){
			this.$router.push({
              	name: "detail",
                params: { id:i}
            });
		}
	},
	mounted(){
		this.num= this.$route.params.id;
		worldwork({
			workId:this.num
		}).then(res=>{
			this.worldworkid=res.data
			// console.log(this.worldworkid)
		}).catch(err=>{
			console.log(err)
		})
		cataloguework({
			featuredArtistInclude:true,
			workId:this.num
		})
		.then(res=>{
			this.cataloguework=res.data
			// console.log(this.cataloguework)
		}).catch(err=>{
			console.log(err)
		})

	}
}
</script>
<style>
.container .main .peopleComposers {
    min-height: 600px;
}
.container .main .list {
    min-width: 904px;
    margin: 0 auto 30px;
    max-width: 1480px;
}
.container .main .peopleComposers .cpmposers-wrap {
    background: #f7f9fa;
}
.container .main .peopleComposers .con-peopleComposers {
    margin: 0 auto;
    position: relative;
}
.container .main .peopleComposers .peopleComposers-index {
    color: #999999;
    padding: 15px 0;
}
table.authorInfo {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 30px;
    border-collapse: collapse;
}
table.authorInfo tr td {
    font-size: 14px;
    color: #000;
    line-height: 20px;
    height: 18px;
    padding-top: 16px;
    text-align: left;
    vertical-align: top;
    min-width: 200px;
}
.container .main .peopleComposers .con-table {
    background: #fff;
}
.container .main .peopleComposers .con-table .tab-nav {
    width: 100%;
    padding: 20px 30px 6px 30px;
    box-sizing: border-box;
    height: 41px;
}
.container .main .peopleComposers .con-table .tab-nav p {
    float: left;
    padding: 0 20px 0 0;
    padding-bottom: 5px;
    cursor: pointer;
}
.container .main .peopleComposers .con-table .tab-con {
    margin: 0 30px;
}
.container .main .peopleComposers .con-table .discography {
    height: 40px;
    line-height: 40px;
    text-align: left;
    clear: both;
}
.container .main .peopleComposers .con-table .table-list .workName:hover{
    color: #b53448;
    cursor: pointer;
}
</style>


