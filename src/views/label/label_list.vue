<template>
    <div class="main">
        <div class="labelSeek list">
            <div class="nav-add">
				<span>{{$t("lang.labels")}}</span>
				<span>></span>
				<span>{{titinfo.displayName}}</span>
            </div>
            <div class="labelSeek-logo">
                <div> <img v-bind:src="[' https://naxosmusiclibrary.com/sharedfiles/images/labels/s_'+titinfo.catlabelId+'.gif']" alt="" /></div>
                <div class="labelSeek-con">
                    <div class="labelSeek-tit">{{titinfo.displayName}}</div>
					<p>{{titinfo.blurb}}</p>
                </div>
            </div>
            <div class="labelSeek-letter">
				<span v-for="(i,index,val) in cataloguealphaid" :key="index" class="labelSeek-letter-spangray" v-show="i!=0" :class="{lablistactive:changeclor==val}" @click="changelist(val,index)">{{index}}</span>
            </div>
			<div>
				<el-pagination
				background
				:current-page="pageNo"				
				@current-change="pageNoChange"
				layout="total, prev, pager, next, jumper"
				:page-size="pageSize"
				:total="total"
				></el-pagination>

				<!-- 加上loding -->
				<!-- <el-table :data="cataloguelistid" v-loading="loading"> -->
				<el-table :data="cataloguelistid">
					<el-table-column :label="$t('lang.albumTite')" prop="catalogueName">
						<template slot-scope="scope">
                         	<span @click="go_catalogue(scope.row.catalogueId)" class="cataloguelabel">{{scope.row.catalogueName}}</span>
                     	</template>
					</el-table-column>
					<el-table-column :label="$t('lang.catalogueNo')" prop="catalogueId" align="right"></el-table-column>
				</el-table>

				<el-pagination
				background
				:current-page="pageNo"				
				@current-change="pageNoChange"
				layout="total, prev, pager, next, jumper"
				:page-size="pageSize"
				:total="total"
				></el-pagination>
			</div>
        </div>
    </div>
</template>
<script>
import {catlabel,cataloguealpha,cataloguelist} from "../../api/api"
export default {
	data(){
		return{
			id:"",
			no:"",
			titinfo:[],
			cataloguealphaid:[],
			changeclor:0,
			cataloguelistid:[],

			pageNo:1, //初始页
			total:0,//默认数据总数
			pageSize:20,//每页的数据条数
			loading:true
		}
	},
	methods:{
		lode(){
			this.id=this.$route.params.id
			this.no=this.$route.params.no;
			if(this.no=="All"){
				this.no=""
			}
			catlabel({
				catlabelId:this.id
			}).then((res)=>{
				this.titinfo=res.data;
			}).catch((err)=>{
				console.log(err)
			})

			cataloguealpha({
				catlabelId:this.id
			}).then((res)=>{
				this.cataloguealphaid=res.data;
			}).catch((err)=>{
				console.log(err)
			})


			cataloguelist({
				alpha:this.no,
				catlabelId:this.id,
				pageNo:this.pageNo,
			}).then((res)=>{
				this.cataloguelistid=res.data.data;
				this.total=res.data.totalRows;
				this.pageSize=res.data.pageSize;
				console.log(res)
			}).catch((err)=>{
				console.log(err)
			})
		},
		changelist(i,index){
			this.pageNo=1;
			this.changeclor=i;
			this.$router.push({
				name:"label_list",
				params:{no:index}
			})
			this.lode();
		},
		pageNoChange(val) {
			this.pageNo = val;	
			this.lode();//点击分页重新请求此页数据	
			console.log(`当前页: ${val}`);
		},
		go_catalogue(i){
            this.$router.push({
               name: "detail",
                params: { id:i}
            });
        }
	},
	mounted(){
		this.lode();
	}
}
</script>
<style>

.labelSeek .el-pagination__jump{
	float: right;
	padding-right:10px;
}
.labelSeek .el-pagination{
    height: 30px;
    padding-top:6px;
    background: #f0f0f0;
    padding-left:20px
}
.labelSeek .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}
.labelSeek .el-table th>.cell{
    padding-left:20px;
    padding-right: 20px;
}
.labelSeek .el-table .cell{
    padding-left:20px;
    padding-right: 20px;
}
.labelSeek .el-pagination button, .el-pagination span:not([class*=suffix]){
    color:#999999;
    font-size:12px;
}
.labelSeek .el-table thead  th, .el-table thead tr{
	background: #ffffff;
	color:#999999;
}


.container .main .labelSeek .labelSeek-letter .lablistactive{
	color: #fff!important;
	background: #cc3d55;
}
.container .main .labelSeek {
	min-height:700px;
	margin-bottom:60px;
	background:#fff;
}
.container .main .labelSeek .cataloguelabel:hover{
	cursor: pointer;
	color:#cc3d55;
}
.container .main .labelSeek .nav-add {
	height:43px;
	line-height:43px;
	color:#999999;
	padding-left:20px;
}
.container .main .labelSeek .labelSeek-logo {
	overflow:hidden;
	padding-left:20px;
	display:flex;
	align-items:center;
}
.container .main .labelSeek .labelSeek-logo img {
	/* width:91px; */
	/*height:91px;*/
	/*margin-top:15px;*/
}
.container .main .labelSeek .labelSeek-logo .labelSeek-con .labelSeek-tit {
	height:48px;
	line-height:48px;
	font-size:18px;
}
.container .main .labelSeek .labelSeek-logo .labelSeek-con {
	flex:1;
	margin:0 30px;
}
.container .main .labelSeek .labelSeek-logo .labelSeek-con p {
	color:#666666;
	font-size:14px;
}
.container .main .labelSeek .labelSeek-letter {
	margin-top:30px;
	min-height:34px;
	border-top:1px solid #ebeff0;
	border-bottom:1px solid #ebeff0;
}
.container .main .labelSeek .labelSeek-letter a:first-child span{width:40px;}
.container .main .labelSeek .labelSeek-letter span {
	padding:0 10px;
	height:34px;
	line-height:34px;
	text-align:center;
	display:inline-block;
	color:#55a5d7;
}
.container .main .labelSeek .labelSeek-letter .labelSeek-letter-spangray {
	color:#666666;
}
.container .main .labelSeek .labelSeek-letter .labelSeek-letter-span:hover {
	background:#55a5d7;
	color:#fff;
}
.container .main .labelSeek .labelSeek-letter .spanhover {
	background:#55a5d7;
	color:#fff;
}
.container .main .labelSeek .categoryType-sort {
	margin-top:20px;
	height:40px;
	line-height:40px;
	background:#eeeff1;
	color:#55a5d7;
	font-size:14px;
	border-bottom:1px solid #fff;
}
.container .main .labelSeek .categoryType-sort a {
	color:#55a5d7;
	margin-left:20px;
}
.container .main .labelSeek .categoryType-sort .sort {
	float:right;
	margin-right:15px;
}
.container .main .labelSeek .categoryType-sort .ascending,.container .main .labelSeek .categoryType-sort .Descending {
	width:110px;
	height:24px;
	line-height:24px;
	background:#fff;
	border-radius:5px;
	text-align:center;
	display:inline-block;
	margin:4px;
}
</style>


