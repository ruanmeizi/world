<template> 
    <!-- <div class="main" id="main">
        <div class="list people">
            <div class="nav-people">
                <a><span >{{ $t("lang.composers_title")}}</span></a>
                <a><span>{{ $t("lang.artist_title")}}</span></a>
            </div> -->
            <div class="con-people">
                <div class="people-tab artists">
                    <!-- <p></p> -->
                    <div class="composers-title" >首字母列表</div>
                    <div class="composers-index artistlist">
                        <ul>
                                <!-- 渲染出abc -->
                                <li v-for="(i,index,val) in dataAlpha" :key="index" v-show="index!=0" v-if="index!='#'" :class="{active:index==number}"  @click="change(val,index)">
                                    {{index}}
                                </li>
                                <!-- 渲染other -->
                                <li v-for="(i,index,val) in dataAlpha" :key="index" v-show="index!=0" v-if="index=='#'" :class="{active:index==number}"  @click="change(val,index)">
                                    Other
                                </li>
                            </ul>
                            <!-- search -->
                        <div class="select-letter">
                            <input type="search" id="person-search-input" value="" v-model="artsearch">
                            <a id="search-btn" ><img src="../../assets/icon-search.png" alt=""  @click="artsearchres()"></a>
                        </div>
                    </div>
                    <div class="composers-list" v-show="isserch">
                        <a v-for="(i,index) in datacon" :key="index" @click="to_artinfo(i.personId)">{{i.fullName}}</a>
                    </div>
                    <div class="composers-list" v-show="!isserch">
                        <a v-for="(i,index) in searchresult" :key="index" @click="to_artinfo(i.extern[0].id)">{{i.name}}</a>
                        <p v-show="searchresult==''" class="noresults">{{$t('lang.noresults')}}</p>
                    </div>
                </div>  
            </div>
        <!-- </div>
    </div> -->
</template>
<script scoped>
import {artistsalpha,searchsuggest} from "../../api/api.js"
import {artistscon} from "../../api/api.js"
export default {
    data(){
        return{
            number:"",
            dataAlpha:[],
            list:[],
            letter:"",
            cataId:"",
            datacon:[],
            artsearch:'',
            searchresult:[],
            isserch:true
        }
    },
    methods:{
        onLoad(){
            this.cataId = this.$route.params.id;
            console.log( this.cataId)
            artistsalpha().then((res)=>{
                this.dataAlpha=res.data;
            }).catch((err)=>{
                console.log(err)
            })
            artistscon({
                alpha:this.cataId
            }).then((res)=>{
                console.log(res.data)
                this.datacon=res.data;
            }).catch((err)=>{
                console.log(err)
            })
        },
        to_artinfo(i){
            this.$router.push({
                name:"artist_info",
                params:{id:i}
            })
        },
        //改变颜色
        change:function(index,i){
            this.isserch=true
            this.number=i;
            console.log(i)
            this.$router.push({
                name:"artist_list",
                params:{id:i}
            })
        },
        artsearchres(){
            this.isserch=false
            searchsuggest({
                q:this.artsearch,
                type:'artist',
                orderby:1
            }).then(res=>{
                console.log(res.matches)
                this.searchresult=res.matches
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    watch:{
        //查询参数改变，再次执行数据获取方法
        "$route"(to,from){
            this.onLoad();
            console.log(to)
        }
    },
    created (){
        this.onLoad();
    },
    mounted(){
        this.number=this.$route.params.id;
    }
}
</script>
<style>
.artists .con-people .active{
    background: #b53448;
    color:#fff;
}
.artists .artistlist ul li:hover{
  background: #b53448;
  color: #fff;
  cursor: pointer;
}
.composers-index ul{
    overflow: hidden;
    float: left;
}
.composers-index ul li{
    float: left;
    padding: 0 7px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    display: inline-block;
}
.artists .composers-index {
    padding-left: 20px;
    border-bottom: 1px solid #ebeff0;
    overflow: hidden;
    background: #fff;
}
.artists .composers-list {
    width: 100%;
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    overflow: hidden;
    background: #fff;
    padding-top:8px;
}
.composers .composers-list a, .artists .composers-list a {
    cursor: pointer;
    display: block;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    width: calc(100%-5px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.artists p {
    height: 30px;
    background: #fafafa;
}

.artists .composers-title {
    color: #666666;
    height: 45px;
    line-height: 60px;
    padding-left: 20px;
    border-bottom: 1px solid #ebeff0;
    background: #fff;
}
.artists .composers-index span {
    padding: 0 7px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    display: inline-block;
}
.artists .composers-index .select-letter {
    display: inline-block;
    float: right;
    line-height: 34px;
    padding-right: 30px;
}
.select-letter input {
    width: 180px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #cc3d55;
    margin-right: 10px;
    text-indent: 9px;
}
.artists .artistlist .active{
    background: #b53448;
    color:#fff;
}
</style>


