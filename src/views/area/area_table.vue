<template>
    <div class="main">
        <div class="list areatable">
            <div class="areatable-tit">
                <div class="nav-add">
                    <span>{{$t("lang.lefterarea")}}</span>
                    <span>></span>
                    <span v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{worldcountryid.country}} {{worldcountryid.displayCName}}</span>
                    <span v-show="getCookie('lang')=='en'"> {{worldcountryid.country}}</span>
                </div>
                <div class="areacon">
                    <p v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{worldcountryid.country}} {{worldcountryid.displayCName}}</p>
                    <p v-show="getCookie('lang')=='en'"> {{worldcountryid.country}}</p>
                </div>
            </div>
            <div class="areatable-con">
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
                            <p @click="go_catalogue(scope.row.catalogueId)" class="areatablestarea">{{scope.row.catalogueName}}</p>
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
import {countrycatalogue,worldcountry} from "../../api/api"
export default {
    data(){
        return{
            tit:"",
            areacatalogueid:[],
            worldcountryid:[],

            pageNo:1, //初始页
			total:0,//默认数据总数
			pageSize:20,//每页的数据条数
        }
    },
    methods:{
        lode(){
            this.tit=this.$route.params.tit
            this.guojia=this.$route.params.id;
            countrycatalogue({
                countryId:this.guojia,
                pageNo:this.pageNo
            }).then((res)=>{
                console.log(res.data.data);
                this.areacatalogueid=res.data.data;
                this.total=res.data.totalRows;
                this.pageSize=res.data.pageSize;
            }).catch((err)=>{
                console.log(err)
            })
            worldcountry({
                countryId:this.guojia
            }).then((res)=>{
                this.worldcountryid=res.data;
            }).catch((err)=>{
                console.log(err)
            })
        },
         pageNoChange(val) {
             this.pageNo = val;	
             this.lode()
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
.areatable .el-pagination__jump{
	float: right;
	padding-right:10px;
}
.areatable .el-pagination{
    height: 30px;
    padding-top:6px;
    background: #f0f0f0;
    padding-left:20px
}
.areatable .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}
.areatable .areatable-con .el-table th>.cell{
    padding-left:20px;
    padding-right: 20px;
}
.areatable .areatable-con .el-table .cell{
    padding-left:20px;
    padding-right: 20px;
}
.areatable .culturelist-con .el-pagination button, .el-pagination span:not([class*=suffix]){
    color:#999999;
    font-size:12px;
}
.areatable .el-table thead  th, .el-table thead tr{
	background: #ffffff;
	color:#999999;
}







.arealist .arealistTop .el-radio-group .el-radio{
    height:30px;
    line-height: 30px
}
.areatable .el-radio__inner:hover {
    border-color: #cc3d55;
}
.areatable .el-radio__input.is-checked .el-radio__inner{
    background-color: #cc3d55;
    border-color: #cc3d55;
}
.areatable .el-radio__input.is-checked+.el-radio__label{
    color:#cc3d55;
}

.areatable .nav-add {
	height:43px;
	line-height:43px;
	color:#999999;
	padding-left:20px;
    background: #fff;
}
.areatable .areacon{
    padding-left:20px;
    height:34px;
    line-height:20px;
    font-size: 20px;
    background: #fff;
}
.areatablestarea:hover{
    color:#cc3d55;
    cursor: pointer;
}
</style>


