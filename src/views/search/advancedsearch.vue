<template>
    <div class="main" id="main">
                    <div class="Advancde-Search list">
                        <div id="tab-advanced" v-show="showadvanced">
                            <div class="nav-Adsearch"><p>{{$t("lang.adsearch")}}</p></div>
                            <div>
                                <div class="ColSpan1" v-for="(i,index) in arr" :key="index">
                                    <label v-show="getCookie('lang')=='en'">{{i.nameEn}}</label>
                                    <label v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{i.name}}</label>
                                    <div class="Wrapper">
                                        <input type="text" v-model="i.key">
                                        <span v-if="i.name!='名称'">
                                            <el-button type="text" @click="showPopup(i,index)" class="searchIcon"></el-button>
                                        </span>
                                    </div>
                                </div>
                                <el-dialog :title="titname" :visible.sync="dialogTableVisible" class="tabdialog">
                                    <el-collapse v-model="activeName" accordion>
                                        <el-collapse-item :title="collapsename" name="1">
                                            <ul class="uiall">
                                                <li v-for="(i,index) in tabs" :key="index" :class="{advactive:activenum==index}" @click="advactivetoggle(i,index)">{{i}}</li>
                                            </ul>
                                            <el-pagination
                                            background
                                            small
                                            :current-page="pageNo"				
                                            @current-change="pageNoChange"
                                            layout="prev, pager, next"
                                            :page-size="pageSize"
                                            :total="total"
                                            v-show="total>pageSize"
                                            ></el-pagination>
                                            <div class="Pager-Data" v-if="alias=='country' || alias=='cultural'">
                                                <li v-for="(i,index) in searchsuggestid" :key="index" @click="selection(i.name)" v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{i.extern}}</li>
                                                <li v-for="(i,index) in searchsuggestid" :key="index+'i'" @click="selection(i.name)" v-show="getCookie('lang')=='en'">{{i.name}}</li>
                                            </div>
                                            <div class="Pager-Data" v-else>
                                                <li v-for="(i,index) in searchsuggestid" :key="index+'i'" @click="selection(i.name)">{{i.name}}</li>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </el-dialog>
                                <div class="ColSpan1">
                                    <label for="searchWorkPerson">{{$t('lang.duration')}}<i id="advDuration-Text"> from {{minnum}} to {{maxnum}}  minutes</i></label>
                                    <el-slider 
                                        v-model="value"
                                        range
                                        :max=150
                                        class="silder"
                                    >
                                    </el-slider>
                                </div>
                            </div>
                            <div class="seachBtn">
                                <button id="advSearchBtn" role="button" @click="tosearch">{{$t("lang.search")}}</button>
                                <button id="advClearBtn" role="button">{{$t("lang.clear")}}</button>
                            </div>
                        </div>
                        <div class="pack">
                           <span class="packup" :class="[ispackup]" @click="tosearch"></span>
                        </div>
                        <div id="advencedSearchResult">
                            <div class="Keyword-Search list">
                                <div class="nav-keySearch">
                                    <p class="nav-title">{{$t("lang.adsearchresult")}}</p>
                                    <p class="nav-list"> {{$t("lang.Results")}} 1-1 &nbsp;{{$t("lang.of")}}&nbsp; 1</p>
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
                            @current-change="handleCurrentChanges"
                            :current-page="currentPages"
                            :page-size="pageSizes"
                            layout="total, prev, pager, next, jumper"
                            :total="totals"
                            ></el-pagination>
                            <el-table :data="searchResult" fit v-if="flag" key="">
                                <el-table-column :label="$t('lang.albumTite')" prop="catalogue_name">
                                    <template slot-scope="scope">
                                        <span @click="go_catalogue(scope.row.catalogue_id)" class="cataloguecul">{{scope.row.catalogue_name}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('lang.catalogueNo')" prop="catalogue_id" align="right"></el-table-column>
                            </el-table>

                            <el-table :data="searchResult" fit v-else>
                                <el-table-column :label="$t('lang.albumTite')" prop="catalogue_name" width="150px" >
                                    <template slot-scope="scope">
                                         <img v-bind:src="['//cdn.naxosmusiclibrary.com/sharedfiles/Images/cds/others/'+scope.row.catalogue_id+'.gif']" alt="" width="120px" height="120px"/>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('lang.catalogueNo')" prop="dateline" >
                                    <template slot-scope="scope">
                                            <a class="message-tit cataloguecul" @click="go_catalogue(scope.row.catalogue_id)">{{scope.row.catalogue_name}}</a>
                                            <div class="message-list">
                                                <p>Label</p>
                                                <span>{{scope.row.cat_label}}</span>
                                            </div>
                                            <div class="message-list">
                                                <p>Category</p>
                                               <span v-for="(i,index) in scope.row.categories" :key="index">{{i}}</span>
                                            </div>
                                            <div class="message-list">
                                                <p>Composer</p>
                                                <span >
                                                    <label v-for="(i,index) in scope.row.composers" :key="index">{{i}}</label>
                                                </span>
                                            </div>
                                            <div class="message-list">
                                                <p>Artist</p>
                                                <span>
                                                    <label v-for="(i,index) in scope.row.artists" :key="index">{{i}}</label></span>
                                            </div>
                                            <div class="num"><a>{{scope.row.catalogue_id}}</a></div>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                            background
                            @current-change="handleCurrentChanges"
                            :current-page="currentPages"
                            :page-size="pageSizes"
                            layout="total, prev, pager, next, jumper"
                            :total="totals"
                            ></el-pagination>
                        </div>
                        <!-- <div>
                            <div id="advencedSearchResult"></div>
                            <div id="debug" style="display: none"></div>
                        </div> -->

                        </div>
                    </div>
</template>
<script>
import {searchsuggest,searchquery} from '../../api/api'
export default {
  data() {
    return {
        value: [0, 150],
        list: [],

        pageNo:1, //初始页
        total:0,//默认数据总数
        pageSize:92,//每页的数据条数

        currentPages:1,//初始页
        totals:0,//默认数据总数
        pageSizes:20,//每页的数据条数

        showadvanced: true,
        ispackup: "packup",
        flag: true,
        dialogTableVisible: false,
        context:'',
        arr:[
            {name:'国家/地理区域',alias:"country",key:"",catalogue:"countries",nameEn:'Country / Geographic Area'},
            {name:"文化群体",alias:"cultural",key:"",catalogue:'culturals',nameEn:'Cultural Group'},
            {name:"作曲家",alias:"composer",key:"",catalogue:"composers",nameEn:'Composer'},
            {name:"名称",key:"",catalogue:'catalogue_name|tracks|movements',nameEn:'Title'},
            {name:"曲作家",alias:"arranger",key:"",catalogue:"arrangers",nameEn:'Arranger'},

            {name:"分类",alias:"category",key:"",catalogue:"genre|categories",nameEn:'Categories'},
            {name:"作词家",alias:"lyricist",key:"",catalogue:'lyricists',nameEn:'Lyricist'},
            {name:"乐器",alias:'instrument',key:"",catalogue:'instruments',nameEn:'Instrument'},
            {name:"艺术家",alias:"artist",key:"",catalogue:'artists',nameEn:'Artist'},
            {name:"乐队(合唱团、合奏团、管弦乐队)",alias:'choir',key:"",catalogue:'artists',nameEn:'Performing Group'},
            {name:"厂牌",alias:"label",key:"",catalogue:'cat_name',nameEn:'Label'}],
        context0:'',
        titname:'',
        collapsename:"",
        activeName: '1',
        alias:'',
        tabs:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Others'],
        activenum:'0',
        letter:'A',
        searchsuggestid:[],
        num:'',
        searchResult:[],
        minnum:0,
        maxnum:150,
    };
  },
  watch:{
    value(val,oldval){
        this.minnum=val[0];
        this.maxnum=val[1];
    }
  },
  methods: {
    handleCurrentChanges(val){
        this.currentPages=val
         this.searchqueryfun()
    },
    //点击分页
    pageNoChange(val) {
        this.pageNo = val;	
        console.log(this.pageNo)
        this.searchsuggestfun()
    },
    searchqueryfun(){
        var json={}
        var data={}
        data['min']=this.value[0]
        data['max']=this.value[1]
        if(this.value[0]!=0 || this.value[1]!=150){
           json['duration']=data
        }
        for(var i=0;i<this.arr.length;i++){
            if(this.arr[i].key!=0){
                json[this.arr[i].catalogue] = this.arr[i].key
            }
        }
        searchquery({
            jsonq:json,
            page: this.currentPages
        }).then(res=>{
            this.searchResult=res.matches
            this.totals=res.meta.total
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    },
    //点击搜索
    tosearch() {
        this.searchqueryfun()
        if (this.showadvanced) {
            this.showadvanced = false;
            this.ispackup = "ispackup";
        } else {
            this.showadvanced = true;
            this.ispackup = "packup";
        }
        console.log(this.value)
    },
    go_catalogue(i){
      //console.log(i)
      this.$router.push({
          name: "detail",
          params: { id:i}
      });
    },
    changelist() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    //点击小的搜索图标
    showPopup(i,index){
        this.activenum=0;
        this.letter='A'
        this.num=index
        if(this.getCookie('lang')=='zh' || this.getCookie('lang')==''){
            this.titname='浏览'+i.name
            this.collapsename=i.name
        }else if(this.getCookie('lang')=='en'){
            this.titname='Browse  '+i.nameEn
            this.collapsename=i.nameEn
        }
        
        this.alias=i.alias
        this.dialogTableVisible=true;
        this.searchsuggestfun()
    },
    advactivetoggle(i,index){
        this.activenum=index;
        this.letter=i
        console.log(this.letter)
        this.searchsuggestfun()
    },
    searchsuggestfun(){
        searchsuggest({
            prefix:this.letter,
            page:this.pageNo,
            type:this.alias,
            orderby:1
        }).then(res=>{
            console.log(res)
            this.searchsuggestid=res.matches
            this.total=res.meta.total
        }).catch(err=>{
            console.log(err)
        })
    },
    selection(i){
        this.arr[this.num].key=i
        this.dialogTableVisible=false
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
  mounted() {}
};
</script>
<style>
.Advancde-Search .nav-Adsearch {
  height: 72px;
  font-size: 18px;
  line-height: 100px;
  width: 885px;
  margin: 0 auto
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
  background: url(../../assets/icon-adSearch.png) no-repeat;
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

.Keyword-Search .nav-keySearch {
  height: 100px;
  clear: both;
}
.Keyword-Search .nav-keySearch .nav-title {
  font-size: 18px;
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
.Advancde-Search .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #b53448;
  color:#fff;
}
.Advancde-Search .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color: #b53448;
}
.Advancde-Search .el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
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
.message-list label{
    display: inline;
}
.num a {
  display: block;
  text-align: right;
  color: #b53448;
  line-height: 12px;
}
.tabdialog .uiall{
    overflow: hidden;
    background: #b53448;
    color:#fff;
    padding-left: 10px;
}
.tabdialog .uiall li{
    float: left;
    padding:0 5px;
}
.tabdialog .uiall li:hover{
    cursor: pointer;
}
.tabdialog .advactive{
    color:#b53448;
    background:#fff
}
.tabdialog .Pager-Data {
    padding: 0px;
    clear: both;
    width: 100%;
    display: block;
    text-align: left;
    overflow: auto;
    list-style: none;
    margin: 12px 0;
}
.tabdialog .Pager-Data li{
    list-style-type: none;
    float: left;
    width: 23%;
    min-width: 179px;
    padding-left: 5px;
    height: 18px;
    overflow: hidden;
}
.tabdialog .Pager-Data li:hover{
    color:#b53448;
    cursor: pointer;
}
.Advancde-Search .message-list{
    display: table;
    width: 100%;
    height: 21px;
    table-layout: fixed;
    cursor: default;
}
.Advancde-Search .tab-advanced .el-dialog__headerbtn:focus .el-dialog__close, .el-dialog__headerbtn:hover .el-dialog__close{
     color:#b53448;
}
.Advancde-Search #advencedSearchResult .el-pagination .el-pagination__total{
  padding-left:10px
}
.Advancde-Search #advencedSearchResult .el-pagination .el-pagination__jump{
  float: right;
  margin-right:10px;
}
.Advancde-Search #advencedSearchResult .el-pagination{
    height: 30px;
    padding-top:6px;
    background: #f0f0f0;
    padding-left:20px
}
.Advancde-Search .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
    color:#fff
}
.Advancde-Search .el-table th>.cell{
    padding-left:20px;
    padding-right: 20px;
}
.Advancde-Search .el-table .cell{
    padding-left:20px;
    padding-right: 20px;
}
.Advancde-Search .el-pagination button, .el-pagination span:not([class*=suffix]){
    color:#999999;
    font-size:12px;
}
.Advancde-Search .el-table thead  th, .el-table thead tr{
	background: #ffffff;
	color:#999999;
}


.Advancde-Search .cataloguecul{
  cursor: pointer;
}
.Advancde-Search .cataloguecul:hover{
    color:#cc3d55;
}
body{
    padding-right: 0px!important;
}
body.el-popup-parent--hidden{
    overflow: auto!important;
}
.ColSpan1 .el-slider__button-wrapper{
    z-index:2
}
</style>

