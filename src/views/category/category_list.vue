<template>
    <div class="main">
      <div class="categorylist list">
        <div class="categorylist-tit">
          <div class="nav-add">
            <span>{{$t("lang.leftercatagories")}}</span>
            <span>></span>
            <span>{{tit}}</span>
          </div>
          <div class="listcon">
              <p>
                {{tit}}
              </p>
          </div>
          <ul class="categorylist-letter" >
            <li v-for="(i,index,val) in workcategoryalphaid" :key="index" v-show="i!=0" :class="{categorylistactive:num==val}" @click="changcategorylistcolor(val,index)">
              <span v-if="index=='#'">Other</span>
              <span v-else>{{index}}</span>
            </li>
          </ul>
        </div>
        <div class="categorylist-con">
          <el-pagination
          background
          :current-page="pageNo"				
          @current-change="pageNoChange"
          layout="total, prev, pager, next, jumper"
          :page-size="pageSize"
          :total="total"
          ></el-pagination>

          <el-table :data="areacatalogueid">
            <el-table-column :label="$t('lang.albumTite')" >
              <template slot-scope="scope">
                <p @click="gotocatalogue(scope.row.catalogueId)">{{scope.row.catalogueName}}</p>
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

import {workcategoryalpha,countrycatalogue,categorycatalogue} from "../../api/api"

export default {
  data() {
    return {
      id:"",
      tit:"",
      num:0,
      workcategoryalphaid:[],
      areacatalogueid:[],
      letter:"",

      pageNo:1, //初始页
			total:0,//默认数据总数
			pageSize:20,//每页的数据条数
    };
  },
  methods: {
    lode(){
      this.id=this.$route.params.id;
      this.tit=this.$route.params.tit;
      workcategoryalpha({
        workCategoryId:this.id
      }).then((res)=>{
        this.workcategoryalphaid=res.data
        //console.log(this.workcategoryalphaid)
      }).catch((err)=>{
        console.log(err)
      })
    },
    countrycataloguefun(){
      this.id=this.$route.params.id;
      categorycatalogue({
          pageNo:this.pageNo,
          workCategoryId:this.id,
          alpha:this.letter
      }).then((res)=>{
          console.log(res.data.data);
          this.areacatalogueid=res.data.data;
          this.total=res.data.totalRows;
          this.pageSize=res.data.pageSize;
      }).catch((err)=>{
          console.log(err)
      })
    },
    changcategorylistcolor(i,index){
      this.pageNo=1;
      this.num=i;
      this.letter=index;
      if(this.letter=="All"){
        this.letter=""
      }
      this.countrycataloguefun()
    },
    pageNoChange(val) {
        this.pageNo = val;	
        this.countrycataloguefun()
    },
    gotocatalogue(val){
      this.$router.push({
        name: "detail",
        params: { id:val}
      });
    }
  },
  mounted() {
    this.lode()
    this.countrycataloguefun()
  }
};
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
.categorylist .el-pagination__jump{
	float: right;
	padding-right:10px;
}
.categorylist .el-pagination{
	height: 38px;
	padding-top:10px;
	background: #f0f0f0;
}
.categorylist .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}

.categorylist .categorylist-tit .nav-add {
	height:43px;
	line-height:43px;
	color:#999999;
	padding-left:30px;
}
.categorylist .categorylist-tit .listcon{
    padding-left:30px;
    height:35px;
    line-height:20px;
    font-size: 20px
}
.categorylist .categorylist-tit .categorylist-letter{
    border-bottom: 1px solid #ebeff0;
    overflow: hidden;
    height: 32px;
    line-height:32px;
    border-top: 1px solid #ebeff0;
    font-size:14px;
    
}
.categorylist .categorylist-tit .categorylist-letter li{
  float: left;
  padding:0 10px;
}
.categorylist .categorylist-tit .categorylist-letter .categorylistactive{
  background-color:#b53448;
  color:#fff;
}
</style>

