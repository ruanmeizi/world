<template>
<div class="main" id="main">
    <div class="list people">
    <div class="cpmposers-wrap">
        <div class="con-peopleComposers">
            <div class="peopleComposers-index"> 
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/index/home' }">{{$t('lang.lefterhome')}}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{name:'person'}">{{$t('lang.lefterpeople')}}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{name:'person'}">{{$t('lang.composers_title')}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{comtit.fullName}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="composers-person">
                <p>{{comtit.fullName}}</p>
                <span>(1/11/1964)</span>
            </div>
            <div class="composers-information">
                <a></a>
            </div>
        </div>
        <div class="con-table">
        <div class="tab-nav">
            <p id="personWorkTab" :class="flag==1?'cominfoactive':''"  @click="changetab(1)">{{$t('lang.ViewbyWork')}}</p>
            <p id="personCataTab" :class="flag==2?'cominfoactive':''" @click="changetab(2)">{{$t('lang.ViewbyAlbum')}}</p>
        </div>
        <div class="composers-tab">
            <div id="personWork" class="tab-con" style="display: block;">
                <div class="discography">
                    <span>{{$t('lang.composers_title')}}:&nbsp;{{comtit.fullName}}</span>
                    <label>{{$t('lang.period')}}: Contemporary</label>
                    </div>
                <div class="filtrate">
                        <!-- <el-dropdown>
                            <span class="el-dropdown-link">
                            All Categories<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="info_down">
                                <el-dropdown-item>All Categories</el-dropdown-item>
                                <el-dropdown-item v-for="(i,index) in comworkcategoryid" :key="index">{{i.categoryName}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown> -->

                        <!-- 作曲家分类-->
                        <el-select  placeholder="All Categories" v-model="labelvalue" value-key="id" @change="selectchange">
                            <el-option value="All Categories" key="1i"></el-option>
                            <el-option v-for="(i,index) in comworkcategoryid" :key="index" :value="i.workCatId" :label="i.categoryName"> </el-option> 
                        </el-select>

                        <!-- 作曲家作品-首字母-名称 -->
                        <!-- 作品 -->
                        <div class="letter" id="personWorkAlephs" v-if="flag==1">
                            <span v-for="(i,index,val) in comalphaid" :key="index" :class="{personAlephSelect:num==val}" @click="changecomcolor(val,index)" v-if="i!=0 && i!=null">
                                <i v-if="index!='#'" class="personWorkAleph" >{{index}}</i>
                                <i v-if="index=='#'" class="personWorkAleph">Other</i>
                            </span>
                        </div>
                        <!-- 专辑 -->
                        <div class="letter" id="personWorkAlephs" v-else>
                            <span v-for="(i,index,val) in composeralphaid" :key="index" :class="{personAlephSelect:num==val}" @click="changecolocolor(val,index)" v-if="i!=0 && i!=null">
                                <i v-if="index!='#'" class="personWorkAleph" >{{index}}</i>
                                <i v-if="index=='#'" class="personWorkAleph">Other</i>
                            </span>
                        </div>
                    </div>
                    <!-- 列表 -->
                    <div class="table-list">
                        <!-- 作品 -->
                        <el-table :data="composerworkid" style="width: 100%" v-if="flag==1" key="composerworkid">
                            <el-table-column prop="workName" label="作品名称">
                                <template slot-scope="scope">
                                    <p @click="go_work(scope.row.workId)" class="workName">{{scope.row.workName}}{{scope.row.workId}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="categoryName" label="分类" width="280" v-if='labelvalue==""'>
                            </el-table-column>
                            <el-table-column prop="yearComposed" label="创作年代" width="280">
                            </el-table-column>
                        </el-table>
                        <!-- 专辑 -->
                        <el-table :data="composercatalogueid" style="width: 100%"  v-else key="composercatalogueid">
                            <el-table-column prop="catalogueName" label="专辑名称">
                                <template slot-scope="scope">
                                    <p @click="go_catalogue(scope.row.catalogueId)" class="workName">{{scope.row.catalogueName}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="分类" width="280" prop="workcategories" v-if='labelvalue==""'>
                                1
                                <template slot-scope="scope">
                                    <p v-for="(i,index) in scope.row.workcategories" :key="index">{{i.categoryName}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="catlabelDisplayName" label="厂牌" width="180">
                            </el-table-column>
                             <el-table-column prop="catalogueId" label="专辑号" width="180">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            <div id="personCata" class="tab-con" style="display: none;">
                <div class="discography">唱片分类:
                    <span>Aagaard-Nilsen, Torstein</span>
                    <label>时期: Contemporary</label>
                    </div>
                <div id="personCataDiv">
                    <div class="filtrate">
                        <select name="" id="personCataCategorySel" style="display: none;"><option value="-1">All Categories</option><option value="29">协奏曲</option><option value="208">管乐合奏团/管弦乐</option></select><span class="ui-selectmenu-button ui-widget ui-state-default ui-corner-all" tabindex="0" id="personCataCategorySel-button" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-owns="personCataCategorySel-menu" aria-haspopup="true" aria-activedescendant="ui-id-102" aria-labelledby="ui-id-102" aria-disabled="false" style="width: 208px;"><span class="ui-icon ui-icon-triangle-1-s"></span><span class="ui-selectmenu-text">All Categories</span></span>
                        <div class="letter" id="personCataAlephs"><span class="personCataAleph personAlephSelect">All</span><span class="others personCataAleph">Others</span></div>
                    </div>
                    <div class="table-list">
                        <table id="catalogueTable" border="1px solid #e8e8e8" class="table-listcon"><tbody><tr><td>专辑名称</td><td>分类</td><td>厂牌</td><td>专辑号</td></tr><tr><td><a href="/catalogue/4736-MCD" data-pjax="">2003 WASBE Jonkoping, Sweden: Danish Concert Band</a></td><td>协奏曲; 管乐合奏团/管弦乐</td><td>Mark Records</td><td>4736-MCD</td></tr></tbody></table>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="waiting-img" id="waiting-img" style="display: none;"><img alt="waiting" src="/static/images/waiting.gif"></div>
        </div>
    </div>
    </div>
    </div>
</template>
<script>
import {personinfo,comworkcategory,comalpha,composerwork,composercatalogue,composeralpha} from "../../api/api"
export default {
    data() {
        return {
          flag:1,
          num:0,
          personid:[],
          cominfoId:"",
          comtit:[],
          comworkcategoryid:[],
          comalphaid:[],
          composerworkid:[],
          composercatalogueid:[],
          composeralphaid:[],
          letter:"",
          labelvalue:''
        }
    },
    methods:{
        changetab:function(a){
           this.flag=a;
        },
        composerworkfun(){
            composerwork({
                alpha:this.letter,
                personId:this.cominfoId,
                workCategoryId:this.labelvalue,
            }).then((res)=>{
            this.composerworkid=res.data
            console.log(this.composerworkid)
            }).catch((err)=>{
                console.log(err)
            })
        },
        composercataloguefun(){
            composercatalogue({
                alpha:this.letter,
                personId:this.cominfoId,
                workCategoryInclude:true,
                workCategoryId:this.labelvalue,
            }).then((res)=>{
            this.composercatalogueid=res.data
            console.log(this.composercatalogueid)
            }).catch((err)=>{
                console.log(err)
            })
        },
        changecomcolor(val,index){
            this.num=val;
            if(index=="All"){
                index=""
            }
            this.letter=index;
            this.composerworkfun()
        },
        changecolocolor(val,index){
             this.num=val;
            if(index=="All"){
                index=""
            }
            this.letter=index;
            this.composercataloguefun()
        },
        go_work(i){
            this.$router.push({
                name:"work",
                params: { id: i }
            })
        },
        go_catalogue(i){
			this.$router.push({
              	name: "detail",
                params: { id:i}
            });
		},
        selectchange(v){
            console.log(this.labelvalue)
            if(this.labelvalue=='All Categories'){
                this.labelvalue=''
            }
            comalpha({
                personId:this.cominfoId,
                workCategoryId:this.labelvalue
            }).then((res)=>{
                this.comalphaid=res.data
            }).catch((err)=>{
                console.log(err)
            })
             composeralpha({
                personId:this.cominfoId,
                workCategoryId:this.labelvalue
            }).then((res)=>{
                this.composeralphaid=res.data
            }).catch((err)=>{
                console.log(err)
            })
            this.letter=''
            this.num=0;
            this.composerworkfun()
            this.composercataloguefun()
        }
    },
    mounted(){
        this.cominfoId = this.$route.params.id;
        //console.log(this.cominfoId)
        personinfo({
            personId:this.cominfoId
        }).then((res)=>{
           this.comtit=res.data
        //    console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
        comworkcategory({
            personId:this.cominfoId
        }).then((res)=>{
           this.comworkcategoryid=res.data
        }).catch((err)=>{
            console.log(err)
        })

        comalpha({
            personId:this.cominfoId
        }).then((res)=>{
           this.comalphaid=res.data
        }).catch((err)=>{
            console.log(err)
        })
        
        composeralpha({
            personId:this.cominfoId
        }).then((res)=>{
           this.composeralphaid=res.data
        }).catch((err)=>{
            console.log(err)
        })

        this.composerworkfun()
        this.composercataloguefun()
    }
}
</script>
<style>
.container .main .cpmposers-wrap .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    font-weight: 100;
}
.container .main .cpmposers-wrap {
    background: #fff;
}
.container .main .con-peopleComposers {
    margin: 0 auto;
    position: relative;
    border-bottom: 1px solid #EBEEF5
}
.container .main .peopleComposers-index {
    color: #999999;
    padding: 15px 0 15px 20px;
}
.container .main .composers-person {
    height: 63px;
    line-height: 63px;
    padding-left:20px;
}
.composers-person p {
    font-size: 25px;
    display: inline-block;
    float: left;
}
.container .main .composers-person span {
    color: #999999;
    float: left;
    display: block;
    margin-left: 18px;
}
 .con-table {
    background: #fff;
}
.con-table .tab-nav {
    width: 100%;
    padding: 20px 20px 6px 20px;
    box-sizing: border-box;
    height: 41px;
}
.con-table .tab-nav p {
    float: left;
    padding: 0 20px 0 0;
    padding-bottom: 15px;
    cursor: pointer;
}
.con-table .tab-con {
    margin: 0 20px;
}
.con-table .discography {
    height: 40px;
    line-height: 40px;
    text-align: left;
    clear: both;
}
.con-table .filtrate {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: flex;
    width: 100%;
}
.con-table .table-list {
    width: 100%;
    padding-bottom: 50px;
}
.con-table .discography>span {
    display: inline-block;
}
.con-table .discography label {
    float: right;
}
.con-table .filtrate .letter {
    flex: 1;
    height: 22px;
    padding: 1px 0;
    display: flex;
    background: #ffddcc;

}
.con-table .filtrate .letter .personAlephSelect {
    color: #b53448;
    background: #fff;
}
.con-table .filtrate .letter span {
    float: left;
    height: 22px;
    width: 2.7%;
    padding: 0 0.4%;
    display: inline-block;
    line-height: 20px;
    text-align: center;
       color:#000;
    cursor: pointer;
}
.con-table .filtrate .letter span i{
    font-style:normal;
    display: inline-block;
}
.composers-tab .el-dropdown-link {
    cursor: pointer;
    height: 22px;
    margin-bottom: 12px;
    float: left;
    border-radius: 0px;
    border:1px solid #777;
    width: 200px;
}
.composers-tab .el-icon-arrow-down {
    font-size: 20px;
    float: right;
    padding-right:10px;
}
.info_down{
    width:200px;
}
.cominfoactive{
    color:#b53448;
}
.cpmposers-wrap .peopleComposers-index .el-breadcrumb__inner.is-link:hover {
    color: #b53448;
    cursor: pointer;
}
.workName:hover{
    color: #b53448;
    cursor: pointer;
}
.con-table .filtrate .el-input__inner{
    height:24px;
    line-height:24px;
    border-radius:0px;
    border: 1px solid #999;
}
.con-table .filtrate .el-input__icon{
    line-height:24px!important;
}
.con-table .filtrate .el-select .el-input.is-focus .el-input__inner{
    border-color: #b53448!important;
}
.con-table .filtrate .el-select .el-input__inner:focus {
    border-color: #b53448!important;
}
.el-select-dropdown__item.selected{
    color: #b53448!important;
}
</style>




