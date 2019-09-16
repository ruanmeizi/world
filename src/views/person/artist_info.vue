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
                    <el-breadcrumb-item to="/index/person/artist_list/A">{{ $t("lang.artist_title")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{artpersonname.fullName}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="composers-person">
                <p>{{artpersonname.fullName}}</p>
                <span>{{artpersonname.dateBirth}}</span>
            </div>
        </div>
        <div class="con-table">
            <div class="composers-tab">
                <div id="personWork" class="tab-con" style="display: block;">
                    <div class="discography">
                        <span>{{artpersonname.fullName}}{{$t("lang.artdiscography")}}</span>
                        <!-- <label>时期: Contemporary</label> -->
                    </div>
                    <div class="filtrate">
                        <!-- <el-dropdown>
                            <span class="el-dropdown-link">
                            All<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="info_down" >
                                <el-dropdown-item>All</el-dropdown-item>
                                <el-dropdown-item v-for="(i,index) in artworkcategory" :key="index">{{i.categoryName}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown> -->

                        <!-- 艺术家分类-->
                        <el-select  placeholder="All Categories" v-model="labelvalue" value-key="id" @change="selectchange">
                            <el-option value="All Categories" key="1i"></el-option>
                            <el-option v-for="(i,index) in artworkcategory" :key="index" :value="i.workCatId" :label="i.categoryName"> </el-option> 
                        </el-select>

                        <div class="letter" id="personWorkAlephs">
                            <span v-for="(i,index,val) in artistcataalphaid" :key="index" v-show="i!=0" :class="{personAlephSelect:num==val}" @click="letterclick(val,index)">{{index}}</span>
                        </div>
                    </div>
                    <div class="table-list">
                        <el-table :data="artcatalogue" style="width: 100%" >
                            <el-table-column prop="catalogueName" label="专辑名称">
                                <template slot-scope="scope">
                                    <p @click="go_catalogue(scope.row.catalogueId)" class="tablelabel">{{scope.row.catalogueName}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="workcategories" label="分类" width="280" v-if='labelvalue==""'>
                                <template slot-scope="scope">
                                    <p>{{scope.row.workcategories[0].categoryName}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="catlabelDisplayName" label="厂牌" width="180">
                            </el-table-column>
                             <el-table-column prop="catalogueId" label="专辑号" width="180">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>
<script>
import {personinfo,workcategory,catalogue,artistcataalpha} from "../../api/api"
export default {
    data() {
        return {
          flag:1,
          infoId:"",
          artpersonname:[],
          artworkcategory:[],
          artcatalogue:[],
          artistcataalphaid:[],
          num:0,
          tletteralpha:'',
          labelvalue:''
        }
    },
    methods:{
        letterclick(val,index){
            this.num=val
            this.letteralpha=index;
            //console.log(index)
            this.artistcataalphafun()
        },
        artistcataalphafun(){
            artistcataalpha({
                personId:this.infoId,
                alpha:this.letteralpha,
                workCategoryId:this.labelvalue
            }).then((res)=>{
                this.artistcataalphaid=res.data;
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        },
        cataloguefun(){
             catalogue({
                personId:this.infoId,
                workCategoryInclude:true,
                workCategoryId:this.labelvalue
            }).then((res)=>{
                this.artcatalogue=res.data;
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        },
        go_catalogue(i){
			this.$router.push({
              	name: "detail",
                params: { id:i}
            });
        },
        selectchange(){
            console.log(this.labelvalue)
            if(this.labelvalue=='All Categories'){
                this.labelvalue=''
            }
            this.letteralpha=''
            this.num=0;
            this.artistcataalphafun()
            this.cataloguefun()
        }
    },
    mounted(){
        //获取id的值
        this.infoId=this.$route.params.id;
        personinfo({
            personId:this.infoId
        }).then((res)=>{
            this.artpersonname=res.data
        }).catch((err)=>{
            console.log(err)
        })

        workcategory({
             personId:this.infoId
        }).then((res)=>{
            this.artworkcategory=res.data;
        }).catch((err)=>{
            console.log(err)
        })
        this.artistcataalphafun()
        this.cataloguefun()
    },
}
</script>
<style>
.con-table .tab-con {
    margin: 0 20px;
}
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
.container .main .composers-tab .el-input__inner {
    height: 24px;
    line-height: 24px;
    border-radius: 0px;
    border: 1px solid #999;
}
.container .main .composers-tab .el-input__icon{
    line-height:24px;
}
.el-scrollbar .el-select-dropdown__item.selected{
    color:#b53448;
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
    width: 2.8%;
    padding: 0 0.4%;
    display: inline-block;
    line-height: 20px;
    text-align: center;
       color:#000;
    cursor: pointer;
}
.composers-tab .filtrate .el-dropdown-link {
    cursor: pointer;
    height: 22px;
    margin-bottom: 12px;
    float: left;
    border-radius: 0px;
    border:1px solid #777;
    width: 200px;
}
.composers-tab .filtrate .el-icon-arrow-down {
    font-size: 20px;
    float: right;
    padding-right:10px;
}
.info_down{
    width:200px;
}
.artperinfoactive{
    color:#b53448;
}
.discography {
    height: 40px;
    line-height: 40px;
    text-align: left;
    clear: both;
}

.con-table .filtrate .letter .personAlephSelect {
    color: #b53448;
    background: #fff;
}
.table-list .tablelabel:hover{
    color: #b53448;
    cursor: pointer;
}
</style>