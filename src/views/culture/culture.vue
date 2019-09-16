<!-- 文化页面 -->
<template>
  <div class="main">
    <div class="list culture">
        <p class="nav-label">{{ $t('lang.lefterculture') }}</p>
        <p class="label-title">{{ $t('lang.availablefilters') }}</p>
        <div class="label-seek">
            <ul class="label-letter">
                <li v-for="(i,index,val) in letter" :key="index" v-show="i!=0" :class="{culactive:val==number}" @click="changecolor(val,index)">
                    <a>{{index}}</a>
                </li>                
            </ul>
            <div class="label-search">
                <input type="search" id="search-text" v-model="culturesearch">
                <span class="icon-search" @click="culsearch()"></span>
            </div>
        </div>
        <div class="letter-list" v-show="!cullistshow">
            <ul class="letter-key" v-for="(i,index) in culturalsid" :key="index" v-if="seach=='' || seach=='All'">
                <li class="letter-icon" @click='go()'>
                    <img :src="require('../../assets/'+index+'.png')">
                </li>
                <li class="letter-content" >
                    <a v-for="(v,val) in i" :key="val" @click="toculturelist(v.workSubCatCode,v.workSubCatDesc)" v-show="getCookie('lang')=='en'">{{v.workSubCatDesc}}</a>
                    <a v-for="(v,t) in i"  @click="toculturelist(v.workSubCatCode,v.workSubCatCName)" v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{v.workSubCatDesc}}  {{v.workSubCatCName}}</a>
                </li>
            </ul>
            <ul class="letter-key" v-if="seach!='' && seach!='All'">
                <li class="letter-icon" v-if="seach!='All'">
                    <img :src="require('../../assets/'+seach+'.png')">
                </li>
                <li class="letter-content"  >
                    <a v-for="(i,index,val) in culturalsid" :key="val" @click="toculturelist(i.workSubCatCode,i.workSubCatDesc)" v-show="getCookie('lang')=='en'">{{i.workSubCatDesc}}</a>
                    <a v-for="(i,index,val) in culturalsid"  @click="toculturelist(i.workSubCatCode,i.workSubCatCName)" v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{i.workSubCatDesc}}  {{i.workSubCatCName}}</a>
                </li> 
            </ul>
        </div>
        <div class="culsearchlist" v-show="cullistshow">
            <p v-for="(i,index) in searcharr" :key="index" @click="toculturelist(i.workSubCatCode,i.workSubCatCName)" v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{i.workSubCatDesc}}  {{i.workSubCatCName}}</p>
            <p v-for="(i,index) in searcharr" :key="index+'zh'" @click="toculturelist(i.workSubCatCode,i.workSubCatCName)" v-show="getCookie('lang')=='en'">{{i.workSubCatDesc}}</p>
            <span v-show="searcharr==''">{{$t('lang.noresults')}}</span>
        </div>
    </div>
  </div>
</template>
<script>

import {culturalalpha,culturals} from '../../api/api.js'
export default {
    data(){
        return{
            letter:[],
            number:0,
            culturalsid:[],
            seach:"",
            culturesearch:'',
            searcharr:[],
            cullistshow:false
        }
    },
    methods:{
        onLoad(){
            culturalalpha().then((res)=>{
                this.letter = res.data;
            }).catch((err)=>{
                console.log(err)
            }),
            culturals({
               alpha:this.seach
            }).then((res)=>{
                console.log(res.data)
                this.culturalsid=res.data;
            }).catch((err)=>{
                console.log(err)
            })
        },
        changecolor(val,i){
            this.number=val;
            this.cullistshow=false
            this.seach=i;
            if(this.seach=="All"){
                this.seach=""
            }
            console.log(this.seach)
            this.onLoad()
        },
        toculturelist(i,v){
            this.$router.push({
                name:"culturelist",
                params:{id:i,tit:v}
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
        },
        culsearch(){
            console.log(this.culturesearch)
            culturals({
               alpha:""
            }).then((res)=>{
                if(this.culturesearch){
                    var arr = []
                    var newarr=[]
                    //转为数组
                    for (let i in res.data) {
                        arr.push(res.data[i]); //属性
                    }
                    //转为每一项
                    for(let i=0;i<arr.length;i++){
                        for(let j=0;j<arr[i].length;j++){
                            if(this.getCookie('lang')=='zh' || this.getCookie('lang')==''){
                                if(arr[i][j].workSubCatDesc.toLowerCase().indexOf(this.culturesearch.toLowerCase())!==-1 || arr[i][j].workSubCatCName.indexOf(this.culturesearch)!==-1){
                                    newarr.push(arr[i][j]) 
                                }
                            }
                            if(this.getCookie('lang')=='en'){
                                if(arr[i][j].workSubCatDesc.toLowerCase().indexOf(this.culturesearch.toLowerCase())!==-1){
                                    newarr.push(arr[i][j]) 
                                }
                            }
                        }
                    }
                    this.cullistshow=true
                }
                this.searcharr=newarr
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted (){
        this.onLoad();
        if(this.seach=="All"){
            this.seach=""
        }
    }
};
</script>
<style>
.container .main .culture {background:#fff;margin-bottom:60px;min-height:700px;}
.culture {padding:0 20px;}
.culture .nav-label {height:60px;line-height:60px;font-size:18px;}
.culture .label-title {line-height:30px;}
.culture .label-seek {color:#666666;height:34px;width:100%;border-bottom:1px solid #ebeff0;border-top:1px solid #ebeff0;position:relative;overflow:hidden;}
/* .culture .label-letter {position:absolute;top:0;left:0;font-size:0;} */
.culture .label-letter li {display:inline-block;}
.culture .label-letter a {display:block;padding:0 9px;height:34px;line-height:34px;text-align:center;font-size:14px;cursor:pointer;}
.culture .label-letter a.active {background:#b53448;color:#fff;}
.culture .label-letter a:hover{background:#cc3d55;color:#fff;}
.culture .label-search {position:absolute;top:0;right:0;line-height:34px;}
.culture .label-search input {height:22px;line-height:22px;width:160px;border:1px solid #cc3d55;border-radius:5px;text-indent:10px;margin-right:5px;vertical-align:middle;}
.culture .label-search span {display:inline-block;width:22px;height:22px;vertical-align:middle;background:url(../../assets/icon-search.png) no-repeat;cursor:pointer;margin-top:4px;}

/* 数据展示 */
.culture .letter-list .letter-key {padding:30px 0;display:-webkit-flex;display:flex;border-bottom:1px solid #f5f5f5}
.culture .letter-list .letter-key .letter-icon {-webkit-flex:1;flex:1;}
.culture .letter-list .letter-key .letter-content {-webkit-flex:2;flex:2;-webkit-column-count:2;-moz-column-count:2;column-count:2;overflow:hidden;}
.culture .letter-list .letter-key .letter-content a {cursor:pointer;display:block;height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.culactive a{
    background: #cc3d55;
    color:#fff;
}
.culsearchlist{
    width: 100%;
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    overflow: hidden;
    background: #fff;
    padding-top:10px;
}
.culsearchlist p{
    height: 25px;
    line-height: 25px;
}
.culsearchlist p:hover{
    cursor: pointer;
    color:#cc3d55;
}

</style>
