<template>
<div class="main">
    <div class="list culturelist">
        <div class="nav-add">
				<span>{{$t("lang.lefterculture")}}</span>
				<span>></span>
                {{getCookie('lang')}}
				<span v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{worldculturalid.workSubCatDesc}} {{worldculturalid.workSubCatCName}}</span>
                <span v-show="getCookie('lang')=='en'"> {{worldculturalid.workSubCatDesc}}</span>
        </div>
        <div class="culture-tit">
                <span v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{worldculturalid.workSubCatDesc}} {{worldculturalid.workSubCatCName}}</span>
                <span v-show="getCookie('lang')=='en'"> {{worldculturalid.workSubCatDesc}}</span>
        </div>
        <div class="culturelist-con">
            <el-pagination
            background
            :current-page="pageNo"				
            @current-change="pageNoChange"
            layout="total, prev, pager, next, jumper"
            :page-size="pageSize"
            :total="total"
            ></el-pagination>

            <el-table :data="cataloguelistid" >
                <el-table-column :label="$t('lang.albumTite')">
                     <template slot-scope="scope">
                         <span @click="go_catalogue(scope.row.catalogueId)" class="cataloguecul">{{scope.row.catalogueName}}</span>
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
import {culcatalogue,worldcultural} from "../../api/api" 
export default {
    data(){
        return{
            id:"",
            title:"",

            pageNo:1, //初始页
			total:0,//默认数据总数
            pageSize:20,//每页的数据条数

            cataloguelistid:[],
            worldculturalid:[],
        }
    },
    methods:{
        pageNoChange(val) {
			this.pageNo = val;	
            this.culcataloguefun()
        },
        go_catalogue(i){
            this.$router.push({
               name: "detail",
                params: { id:i}
            });
        },
        culcataloguefun(){
            culcatalogue({
                workSubCatCode:this.id,
                pageNo:this.pageNo
            }).then((res)=>{
                this.cataloguelistid=res.data.data;
                this.total=res.data.totalRows;
                this.pageSize=res.data.pageSize;
            })
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
        this.id=this.$route.params.id
        this.title=this.$route.params.tit
        this.culcataloguefun()
        worldcultural({
            workSubCatCode:this.id,
        }).then((res)=>{
            this.worldculturalid=res.data;
        })
    }
}
</script>
<style>
.culturelist .el-pagination__jump{
	float: right;
	padding-right:10px;
}
.culturelist .el-pagination{
    height: 30px;
    padding-top:6px;
    background: #f0f0f0;
    padding-left:20px
}
.culturelist .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}
.culturelist .culturelist-con .el-table th>.cell{
    padding-left:20px;
    padding-right: 20px;
}
.culturelist .culturelist-con .el-table .cell{
    padding-left:20px;
    padding-right: 20px;
}
.culturelist .culturelist-con .el-pagination button, .el-pagination span:not([class*=suffix]){
    color:#999999;
    font-size:12px;
}
.culturelist .el-table thead  th, .el-table thead tr{
	background: #ffffff;
	color:#999999;
}
.culturelist{
    min-height:500px;
}
.container .main .culturelist .nav-add {
	height:43px;
	line-height:43px;
	color:#999999;
	padding-left:20px;
    background: #fff;
}
.container .main .culturelist .culture-tit{
    height:50px;
    font-size: 20px;
    line-height:50px;
    padding-left:20px;
    background: #fff;
}
.container .main .culturelist .cataloguecul{
    cursor: pointer;
}
.container .main .culturelist .cataloguecul:hover{
    color:#cc3d55;
}
</style>

