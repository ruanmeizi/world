<template>
    <div class="main">
        <div class="list arealist">
            <div class="nav-add">
				<span>{{$t("lang.lefterarea")}}</span>
				<span>></span>
				<span v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{arearegionid.name}} {{arearegionid.cname}}</span>
                <span v-show="getCookie('lang')=='en'"> {{arearegionid.name}}</span>
            </div>
            <div class="areacon">
                <span v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{arearegionid.name}} {{arearegionid.cname}}</span>
                <span v-show="getCookie('lang')=='en'"> {{arearegionid.name}}</span>
            </div>
            <div class="arealistTop">
                <div v-if="getCookie('lang')=='en'">
                    <el-radio-group v-model="radio" @change="reqnalist()" >
                        <el-radio :label="-1">ALL</el-radio>
                        <el-radio v-for="(i,index) in areacountryid" :key="index" :label="i.countryId" > {{i.displayName}}</el-radio>
                    </el-radio-group>
                </div>
                <el-radio-group v-model="radio" @change="reqnalist()" v-if="getCookie('lang')=='zh' || getCookie('lang')==''">
                    <el-radio :label="-1">全部</el-radio>
                    <el-radio v-for="(i,index) in areacountryid" :key="index" :label="i.countryId" > {{i.displayCName}}</el-radio>
                </el-radio-group>
            </div>
            <div class="areaellist">
                <el-pagination
				background
				:current-page="pageNo"				
				@current-change="pageNoChange"
				layout="total, prev, pager, next, jumper"
				:page-size="pageSize"
				:total="total"
				></el-pagination>

				<el-table :data="areacatalogueid">
					<el-table-column :label="$t('lang.albumTite')" prop="catalogueName">
                        <template slot-scope="scope">
                            <p @click="go_catalogue(scope.row.catalogueId)" class="areastarea">{{scope.row.catalogueName}}</p>
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
import {areacountry,areacatalogue,countrycatalogue,arearegion} from "../../api/api"
export default {
    data(){
        return{
            radio:-1,
            id:"",
            tit:"",
            areacountryid:[],
            areacatalogueid:[],
            arearegionid:[],

            pageNo:1, //初始页
			total:0,//默认数据总数
			pageSize:20,//每页的数据条数
        }
    },
    methods:{
        lode(){
            this.id=this.$route.params.id
            this.tit=this.$route.params.tit
            areacountry({
                regionId:this.id
            }).then((res)=>{
                this.areacountryid=res.data;
                //console.log( this.areacountryid)
            }).catch((err)=>{
                console.log(err)
            })

            areacatalogue({
                regionId:this.id,
                pageNo:this.pageNo
            }).then((res)=>{
                this.areacatalogueid=res.data.data;
                this.total=res.data.totalRows;
                this.pageSize=res.data.pageSize;
                //console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })

            arearegion({
                regionId:this.$route.params.id
            }).then((res)=>{
                this.arearegionid=res.data
                console.log(this.arearegionid)
            }).catch((err)=>{
                console.log(err)
            })
        },
        pageNoChange(val) {
			this.pageNo = val;	
            if(this.radio=="-1"){
                this.lode();
            }else{
                countrycatalogue({
                    countryId:this.radio,
                    pageNo:this.pageNo
                }).then((res)=>{
                    console.log(res.data.data);
                    this.areacatalogueid=res.data.data;
                    this.total=res.data.totalRows;
                    this.pageSize=res.data.pageSize;
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        reqnalist(){
            console.log(this.radio);
            if(this.radio=='-1'){
                this.lode()
            }else{
                this.pageNo=1;
                countrycatalogue({
                    countryId:this.radio,
                    pageNo:this.pageNo
                }).then((res)=>{
                    console.log(res.data.data);
                    this.areacatalogueid=res.data.data;
                    this.total=res.data.totalRows;
                    this.pageSize=res.data.pageSize;
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        go_catalogue(i){
			this.$router.push({
              	name: "detail",
                params: { id:i}
            });
        },
        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        } 
    },
    mounted(){
        this.lode()
    }
}
</script>
<style>
.arealist .arealistTop .el-radio-group .el-radio{
    height:30px;
    line-height: 30px
}
.el-radio__inner:hover {
    border-color: #cc3d55;
}
.el-radio__input.is-checked .el-radio__inner{
    background-color: #cc3d55;
    border-color: #cc3d55;
}
.el-radio__input.is-checked+.el-radio__label{
    color:#cc3d55;
}
.arealist .el-pagination__jump{
	float: right;
	padding-right:10px;
}
.arealist .el-pagination{
	height: 38px;
	padding-top:10px;
	background: #f0f0f0;
}
.arealist .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}
.container .main .labelSeek .labelSeek-letter .lablistactive{
	color: #fff!important;
	background: #cc3d55;
}

.main .arealist{
    min-height:400px;
}
.container .main .arealist .nav-add {
	height:43px;
	line-height:43px;
	color:#999999;
	padding-left:20px;
    background: #fff;
}
.container .main .arealist .areacon{
    padding-left:20px;
    height:20px;
    line-height:20px;
    font-size: 20px;
    background: #fff;
}
.container .main .arealistTop{
    /* background: red; */
    /* padding-left:30px; */
    /* height:40px; */
    line-height:40px;
    padding:10px 20px;
    background: #fff;
}
.container .main .arealist .areastarea:hover{
    color:#cc3d55;
    cursor: pointer;
}


.arealist .el-pagination__jump{
	float: right;
	padding-right:10px;
}
.arealist .el-pagination{
    height: 30px;
    padding-top:6px;
    background: #f0f0f0;
    padding-left:20px
}
.arealist .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}
.arealist  .el-table th>.cell{
    padding-left:20px;
    padding-right: 20px;
}
.arealist  .el-table .cell{
    padding-left:20px;
    padding-right: 20px;
}
.arealist .culturelist-con .el-pagination button, .el-pagination span:not([class*=suffix]){
    color:#999999;
    font-size:12px;
}
.arealist .el-table thead  th, .el-table thead tr{
	background: #ffffff;
	color:#999999;
}

</style>


