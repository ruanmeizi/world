<template>
    <div class="main" id="main">
    <div class="Advancde-Search list moredetail">     
        <div id="advencedSearchResult">
            <div class="Keyword-Search list">
                <div class="nav-keySearch moresearch">
                    <!-- <p class="nav-title">{{$t("lang.keywordresult")}}</p>
                    <p class="nav-list"> {{$t("lang.Results")}} {{startcount}}-{{count}} &nbsp;{{$t("lang.of")}}&nbsp;{{total}}</p> -->
                    <p class="list-details">{{$t("lang.view")}} : 
                        <img src="../../assets/icon-list.png" alt="" @click="changelist" v-show="flag">
                        <img src="../../assets/icon-tablist.png" alt="" @click="changelist" v-show="!flag">
                        <span id="list-show" class="search-detail" v-show="flag">{{$t("lang.list")}}</span>
                        <span id="list-show" class="search-detail" v-show="!flag">{{$t("lang.Details")}}</span>
                    </p>
                </div>
            </div>
            <el-pagination
            background
            :current-page="pageNo"				
            @current-change="pageNoChange"
            layout="total, prev, pager, next, jumper"
            :page-size="pageSize"
            :total="total"
            ></el-pagination>
            <el-table :data="matches" v-if="flag" key='firstTable'>
                <el-table-column :label="$t('lang.AlbumTitle')" prop="catalogueName">
                  <template slot-scope="scope">
                      <span @click="go_catalogue(scope.row.catalogueId)" class="cataloguecul">{{scope.row.catalogueName}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('lang.CatalogueNo')" prop="catalogueId" align="right"></el-table-column>
            </el-table>
            
                <el-table :data="matches" v-else key='secTable'>
                <el-table-column label="专辑图片" width="150px" >
                    <template slot-scope="scope">
                        <img v-bind:src="['//cdn.naxosmusiclibrary.com/sharedfiles/Images/cds/others/'+scope.row.catalogueId+'.gif']" alt="" width="120px" height="120px"/>
                    </template>
                </el-table-column>
                <el-table-column label="专辑信息" prop="dateline" >
                    <template slot-scope="scope">
                            <a class="message-tit" @click="go_catalogue(scope.row.catalogueId)">{{scope.row.catalogueName}}</a>
                            <div class="message-list">
                                <p>Label</p>
                                <span>{{scope.row.catlabelDisplayName}}</span>
                            </div>
                            <div class="message-list">
                                <p>Category</p>
                                <span>
                                  <!-- <i v-for="(i,index) in scope.row.catlabelId" :key="index">{{i.fullName}}</i> -->
                                  <label>{{scope.row.catlabelId}}</label>
                                </span>
                            </div>
                            <div class="message-list">
                                <p>Composer</p>
                                <span>
                                  <label v-for="(i,index) in scope.row.composers" :key="index">{{i.fullName}}</label></span>
                            </div>
                            <div class="message-list">
                                <p>Artist</p>
                                <span >
                                  <label v-for="(i,index) in scope.row.artists" :key="index">{{i.fullName}} </label></span>
                            </div>
                            <div class="num"><a>{{scope.row.catalogue_id}}</a></div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <div id="advencedSearchResult"></div>
            <div id="debug" style="display: none"></div>
        </div>
        </div>
    </div>
</template>
<script>
// import Axios from "axios";
import { worldpage } from "../../api/api";
export default {
  data() {
    return {
      value: [0, 150],
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 140,
      showadvanced: true,
      ispackup: "packup",
      flag: true,
      q: "",
      matches: [],

      pageNo: 1, //初始页
      total: 0, //默认数据总数
      pageSize: 20 //每页的数据条数
    };
  },
  computed: {
    count: function() {
      return this.pageNo * this.pageSize;
    },
    startcount: function() {
      return this.pageNo * this.pageSize - this.pageSize;
    }
  },
  methods: {
    pageNoChange(val) {
      this.pageNo = val;
      this.worldpagefun();
    },
    worldpagefun() {
        worldpage({
        catLabelInclude:true,
        categoryInclude:true,
        countryInclude:true,
        culturalInclude:true,
        pageNo:this.pageNo,
        pageSize:20,
        personInclude:true,
        workAndTrackInclude:true
        })
        .then(res => {
          console.log(res.data.data);
          this.matches = res.data.data;
          this.total = res.data.totalRows;
          this.pageSize = res.data.pageSize;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changelist() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    go_catalogue(i){
      //console.log(i)
      this.$router.push({
          name: "detail",
          params: { id:i}
      });
    },
  },
  watch: {
    $route: "searchfun"
  },
  mounted() {
    this.worldpagefun()
  }
};
</script>
<style>
.Advancde-Search .nav-Adsearch {
  height: 72px;
  font-size: 18px;
  line-height: 100px;
  width: 885px;
  margin: 0 auto;
}
.Advancde-Search #tab-advanced {
  width: 885px;
  margin: 0 auto;
}
.ColSpan1 {
  display: inline-block;
  width: 50%;
  float: left;
}
.ColSpan1:nth-child(odd) {
  width: 441px;
}
.Advancde-Search .ColSpan1 > label {
  padding-left: 9px;
  height: 28px;
  line-height: 28px;
  color: #666666;
  font-size: 14px;
}
.Advancde-Search .ColSpan1 input {
  width: 375px;
  height: 40px;
  border: 1px solid #cacbcc;
  border-radius: 5px;
  text-indent: 10px;
}
.Advancde-Search .searchIcon {
  display: inline-block;
  width: 22px;
  height: 22px;
  vertical-align: top;
  margin-top: 13px;
  margin-left: 10px;
  /* background: url(../images/icon-adSearch.png) no-repeat; */
  cursor: pointer;
}
.Advancde-Search .smallInput input {
  width: 135px;
  height: 40px;
  border: 1px solid #cacbcc;
  border-radius: 5px;
}
.Advancde-Search .smallInput > label {
  width: 42px;
  display: inline-block;
  text-align: center;
  color: #666666;
  padding-left: 5px;
}
.Advancde-Search .seachBtn {
  display: inline-block;
  width: 844px;
  height: 100px;
  line-height: 100px;
}
.Advancde-Search .seachBtn button {
  width: 270px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: #b53448;
  color: #fff;
  vertical-align: middle;
  cursor: pointer;
}
.Advancde-Search .seachBtn button:first-child {
  margin-left: 123px;
  margin-right: 12px;
}
#advDuration-Range {
  width: 375px;
  height: 6px;
  background: #f0f0f0;
  border: none;
  margin-top: 10px;
}
#advDuration-Range span,
#advDuration-Range span.ui-state-focus {
  /* background: url(../images/search_slider.png) no-repeat; */
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
  outline: none;
}
select#advReleaseDate-Month,
#advReleaseDate-Year {
  width: 180px;
}
.Advancde-Search .smallInput .ui-selectmenu-button {
  height: 40px;
  background: #fff;
  border: 1px solid #cacbcc;
  margin-right: 18px;
}
.ui-selectmenu-button .ui-selectmenu-text {
  color: #666;
}
.ui-selectmenu-button .ui-icon {
  width: 9px;
  height: 19px;
  /* background: url(../images/icon_select.png) no-repeat; */
}
.silder {
  width: 337px;
  color: #b53448;
}
.el-slider__bar {
  background-color: #b53448;
}
.el-slider__button {
  border: 2px solid #b53448;
}

.Advancde-Search .pack {
  width: 100%;
  height: 57px;
  cursor: pointer;
  border-top: 1px solid #f0f0f0;
}
.Advancde-Search .pack .packup {
  display: block;
  width: 150px;
  height: 57px;
  margin: 0 auto;
  background: url(../../assets/packup.png) no-repeat;
  background-position: 0px 0px;
}
.Advancde-Search .pack .ispackup {
  display: block;
  width: 150px;
  height: 57px;
  margin: 0 auto;
  background: url(../../assets/packup.png) no-repeat;
  background-position: -150px 0px;
}

/* .Keyword-Search .nav-keySearch {
  height: 100px;
  clear: both;
} */
.Keyword-Search .nav-keySearch .nav-title {
  font-size: 24px;
  margin-top: 30px;
  line-height: 40px;
}
.Keyword-Search .nav-keySearch .nav-list {
  font-size: 14px;
  text-align: right;
  height: 30px;
}
.Keyword-Search .nav-keySearch .list-details {
  height: 30px;
  line-height: 25px;
  color: #666666;
  text-align: right;
  display: inline-block;
  float: right;
}
.Keyword-Search .nav-keySearch .list-details img,
.Keyword-Search .nav-keySearch .list-details span {
  cursor: pointer;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #b53448;
}
.message-tit {
  min-height: 22px;
  line-height: 22px;
  font-weight: bold;
  test-align: justify;
  display: block;
}
.message-list p {
  display: table-cell;
  width: 75px;
  height: 22px;
  line-height: 22px;
  color: #666666;
  font-weight: bold;
}
.message-list span {
  width: auto;
  display: table-cell;
  line-height: 22px;
  padding-left: 30px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.num a {
  display: block;
  text-align: right;
  color: #b53448;
  line-height: 12px;
}
.Keyword-Search .moresearch{
    height:20px;
}

.moredetail .message-list{
    display: table;
    width: 100%;
    height: 21px;
    table-layout: fixed;
    cursor: default;
}
.moredetail .el-pagination{
    padding:7px 0;
    background: #f0f0f0;
    border-bottom: 1px solid #fff;
}
.moredetail .el-pagination .el-pagination__total{
  padding-left:10px
}
.moredetail .el-pagination .el-pagination__jump{
  float: right;
  margin-right:10px;
}
.moredetail .list{
  padding-top:30px;
}
.moredetail .Keyword-Search .nav-keySearch{
   height:20px;
}
.moredetail .cataloguecul{
  cursor: pointer;
}
.moredetail .cataloguecul:hover{
    color:#cc3d55;
}
.moredetail .el-pagination .el-pagination__total{
  padding-left:10px
}
.moredetail .el-pagination .el-pagination__jump{
  float: right;
  margin-right:10px;
}
.moredetail .el-pagination{
    height: 30px;
    padding-top:6px;
    background: #f0f0f0;
    padding-left:20px
}
.moredetail .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}
.moredetail .el-table th>.cell{
    padding-left:20px;
    padding-right: 20px;
}
.moredetail .el-table .cell{
    padding-left:20px;
    padding-right: 20px;
}
.moredetail .el-pagination button, .el-pagination span:not([class*=suffix]){
    color:#999999;
    font-size:12px;
}
.moredetail .el-table thead  th, .el-table thead tr{
	background: #ffffff;
	color:#999999;
}
</style>
