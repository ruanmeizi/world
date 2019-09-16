<template>
<div class="main" id="main">
    <div class="list favourite">
        <div class="nav-favourite">
            <div class="favourite-tit">
                
                <p>{{$t("lang.Favourite")}}</p>
                <!-- <div class="select-all">
                    <img src="../../assets/icon-select.png" alt="">Select All
                </div>  -->
            </div>
            <div class="favourite-icon">
                <span>
                    <img src="../../assets/icon-songplay.png" id="addQueueAllCatafvt" alt="" @click="go_play()">
                </span > 
                <span title="Add to Play Queue" class='addqueue'>
                    <img src="../../assets/favourite-iconsong.png" id="addSelcetCatafvt" alt="" @click='go_append()'>
                </span>
                <span title="Delete" >
                    <el-button type="text" @click="delect()">
                        <img src="../../assets/favourite-icondelect.png" id="delFavourite" alt="">
                    </el-button>
                    <el-dialog :visible.sync="dialogVisible" width="30%">
                        <span>{{$t("lang.selectionfirst")}}</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false">{{$t("lang.ok")}}</el-button>
                        </span>
                        </el-dialog>
                </span>
            </div>
        </div>
        <div class="con-favourite">
            <el-pagination
            background
            :current-page="pageNo"				
            @current-change="pageNoChange"
            layout="total, prev, pager, next, jumper"
            :page-size="pageSize"
            :total="total"
            ></el-pagination>

            <el-table :data="favouritelistid" @selection-change="changeFun">
                <el-table-column type="selection" width="55" ref=multipleTable v-model="choce"></el-table-column>
                <el-table-column :label="$t('lang.AlbumTitle')">
                    <template slot-scope="scope">
                        <p class="favouriteActive" @click="go_catalogue(scope.row.catalogueid)">{{scope.row.cataloguename}}</p>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('lang.DateAdded')" prop="datecreate" align="right">
                    <template slot-scope="scope">
                        <p>{{scope.row.datecreate | slice}}</p>
                    </template>
                </el-table-column>
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
import {favouritelist,favouritedelect,worldtracks,worldaddress} from "../../api/api"
export default {
    data() {
        return {
            favouritelistid: [],
            multipleSelection: [],
            num:"",

            pageNo:1, //初始页
            total:0,//默认数据总数
            pageSize:20,//每页的数据条数

            dialogVisible: false,
            choce:'',
            worldtracksid:[],
            dataAll:{},
        };
    },
    filters:{
        slice:function(value){
            return value.slice(0,10)
        }
    },
  methods:{
    pageNoChange(val) {
        this.pageNo = val;	
        this.countrycataloguefun()
    },
    favouritelistfun(){
        favouritelist({
            // product:'world',
            pageNo:this.pageNo,
        }).then((res)=>{
            // console.log(res.data.data);
            this.favouritelistid=res.data.data;
            console.log(res.data)
            this.total=res.data.totalRows;
            this.pageSize=res.data.pageSize;
        }).catch((err)=>{
            console.log(err)
        })
    },
    delect(){
        if(this.num==""){
            this.dialogVisible=true
        }
        if(this.num!=""){
            favouritedelect({
                favouriteIds:this.num
            }).then((res)=>{}).catch((err)=>{
                console.log(err)
            })
            this.favouritelistfun()
        }
    },
    changeFun (val) {
        this.multipleSelection = val// 返回的是选中的列的数组集合
        this.num=""
        for (let i = 0; i < this.multipleSelection.length; i++) {
            this.num+=this.multipleSelection[i].favouriteid+",";
        }
        //console.log(this.num)
    },
    go_play(){
        window.changeFlog(true)
        this.com=''
        if(this.multipleSelection==''){

            for(let i=0;i<this.favouritelistid.length;i++){
                this.com+=this.favouritelistid[i].trackids
            }
        }else{
            for (let i = 0; i < this.multipleSelection.length; i++) {
                this.com+=this.multipleSelection[i].trackids
            }
        }
        console.log(this.com)
        worldtracks({
            artistInclude: true,
            catalogueInclude:true,
            workInclude:true,
            trackIds:this.com
        })
        .then(res => {
            this.worldtracksid= res.data;
            this.resetSetItem('kuke', JSON.stringify(res.data));
            worldaddress({
                trackId:res.data[0].trackId
            })
            .then(res => {
                this.resetSetItem('songurl',res.data);
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
    },
    go_catalogue(i){
        this.$router.push({
            name: "detail",
            params: { id:i}
        });
    },
    go_append(){
        window.changeFlog(true)
        this.add=''
        this.allcount=''
        this.checkcount=''
        //没有选中点击点击追加
        if(this.multipleSelection==''){
            console.log(this.dataAll)
            for(let i=0;i<this.favouritelistid.length;i++){
                this.allcount+=this.favouritelistid[i].trackids;
                console.log(this.favouritelistid[i].trackids)
            }
            this.arrallcount=this.allcount.substring(0,this.allcount.length-1).split(",")
            console.log(this.arrallcount)
            for(var i=0;i<this.dataAll.length;i++){
                for(var j=0;j<this.arrallcount.length;j++){
                    if(this.dataAll[i].trackId == this.arrallcount[j]){
                        this.arrallcount.splice(j,1);
                    }
                }
            }
            console.log(this.arrallcount)
            for(let i = 0; i < this.arrallcount.length; i++){
                this.add=this.arrallcount.join(',')
            }
            console.log(this.add)
        }else{
            for (let i = 0; i < this.multipleSelection.length; i++) {
                this.checkcount+=this.multipleSelection[i].trackids
            }
            this.arrcheckcount=this.checkcount.substring(0,this.checkcount.length-1).split(",")

            for(var i=0;i<this.dataAll.length;i++){
                for(var j=0;j<this.arrcheckcount.length;j++){
                    if(this.dataAll[i].trackId == this.arrcheckcount[j]){
                        this.arrcheckcount.splice(j,1);
                    }
                }
            }
            for(let i = 0; i < this.arrcheckcount.length; i++){
                this.add=this.arrcheckcount.join(',')
            }
        }
        if(this.add!=''){
            worldtracks({
                artistInclude: true,
                catalogueInclude:true,
                workInclude:true,
                trackIds:this.add
            })
            .then(res => {
                this.dataAll=JSON.stringify(this.dataAll)
                if(this.dataAll == "{}"){
                    var newdata=res.data
                }else{
                    var newdata=JSON.parse(this.dataAll).concat(res.data);
                }
                this.resetSetItem('kuke', JSON.stringify(newdata));
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
  },
  created(){
     window.addEventListener('setItem', ()=> {
        this.dataAll=JSON.parse(localStorage.getItem("kuke"))
     })
  },
  mounted(){    
    this.dataAll=JSON.parse(localStorage.getItem("kuke"))
    this.favouritelistfun()
  }

};
</script>
<style>
.favourite .arealist .arealistTop .el-radio-group .el-radio{
    height:30px;
    line-height: 30px
}

.favourite .el-radio__inner:hover {
    border-color: #cc3d55;
}
.favourite .el-radio__input.is-checked .el-radio__inner{
    background-color: #cc3d55;
    border-color: #cc3d55;
}
.favourite .el-radio__input.is-checked+.el-radio__label{
    color:#cc3d55;
}
.favourite .el-pagination__jump{
	float: right;
	padding-right:10px;
}
.favourite .el-pagination{
	height: 38px;
	padding-top:10px;
	background: #f0f0f0;
}
.favourite .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}
.favourite .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #cc3d55;
    border-color: #cc3d55;
}


.container .main .favourite {
    min-height: 1000px;
}
.container .main .favourite .nav-favourite {
    height: 82px;
    overflow: hidden;
    padding-top: 20px;
}
.container .main .favourite .nav-favourite .favourite-tit {
    float: left;
}
.container .main .favourite .nav-favourite .favourite-tit p {
    height: 46px;
    font-size: 18px;
    padding-left: 20px;
}
.container .main .favourite .nav-favourite .favourite-icon {
    float: right;
}
.container .main .favourite .nav-favourite .favourite-icon span{
    cursor: pointer;
}
.nav-favourite span {
    padding: 0 10px;
}
body.el-popup-parent--hidden{
  overflow:auto!important;
}
body{
    padding-right: 0px!important;
}
.favourite-icon .el-button--primary{
    background-color: #cc3d55;
    border-color: #cc3d55;
}
.favourite .el-pagination .el-pagination__total{
  padding-left:10px
}
.favourite .el-pagination .el-pagination__jump{
  float: right;
  margin-right:10px;
}
.favourite .el-pagination{
    height: 30px;
    padding-top:6px;
    background: #f0f0f0;
    padding-left:20px
}
.favourite .el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #cc3d55;
}
.favourite .el-table th>.cell{
    padding-left:20px;
    padding-right: 20px;
}
.favourite .el-table .cell{
    padding-left:20px;
    padding-right: 20px;
}
.favourite .el-pagination button, .el-pagination span:not([class*=suffix]){
    color:#999999;
    font-size:12px;
}
.favourite .el-table thead  th, .el-table thead tr{
	background: #ffffff;
	color:#999999;
}
.favourite .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #cc3d55;
    border-color: #cc3d55;
}
.favourite .el-checkbox__inner:hover {
    border-color: #cc3d55;
}
.favourite .favouriteActive:hover{
    color:#cc3d55;
    cursor: pointer;
}
</style>
