<template>
    <div class="culture">
        <p class="label-title">{{ $t('lang.availablefilters') }}</p>
        <div class="label-seek">
            <ul class="label-letter">
                <li v-for="(i,index,val) in countryalphaid" :key="index" :class="{letteractive:letterid==val}" @click="changlettercolor(val,index)">
                    {{index}}
                </li>                
            </ul>
            <!-- search -->
            <div class="label-search">
                <input type="search" id="search-text" v-model="litter">
                <span class="icon-search" @click="labsearch()"></span>
            </div>
        </div>
        <div class="letter-list" v-show="isshowletter">
            <!-- All -->
            <ul class="letter-key" v-for="(i,index) in worldcountriesid" :key="index"  v-if="id==undefined || id==''">
                <!-- {{index}}{{i}} -->
                <li class="letter-icon" v-if="!numReg.test(index)">
                    <img :src="require('../../assets/culture'+index+'.png')">
                </li>
                <li class="letter-content" >
                    <a v-for="(v,val) in i" :key="val" @click="go_areatab(v.countryId,v.displayCName)" v-show="getCookie('lang')=='zh' || getCookie('lang')=='' ">
                        <span v-if="v.displayCName!=''">{{v.displayName}}  {{v.displayCName}}</span>
                        <span v-if="v.displayCName==''">{{v.displayName}}</span>
                    </a>
                    <a v-for="(v,val) in i" :key="val+'i'" @click="go_areatab(v.countryId,v.displayName)" v-show="getCookie('lang')=='en'">{{v.displayName}}</a>
                </li>
            </ul>
            <!-- ABC点击 -->
            <ul class="letter-key" v-if="id!=undefined && id!=''">
                <li class="letter-icon">
                    <img :src="require('../../assets/culture'+id+'.png')">
                </li>
                <li class="letter-content" >
                    <a v-for="(i,index) in worldcountriesid" :key="index" v-show="getCookie('lang')=='zh' || getCookie('lang')==''" @click="go_areatab(i.countryId,i.displayCName)">
                        <span v-if="i.displayCName!=''">{{i.displayName}}  {{i.displayCName}}</span>
                        <span v-if="i.displayCName==''">{{i.displayName}}</span>
                    </a> 
                    <a v-for="(i,index) in worldcountriesid" :key="index+'k'" v-show="getCookie('lang')=='en'|| i.displayCName==''" @click="go_areatab(i.countryId,i.displayName)">{{i.displayName}}</a>
                </li>
            </ul>
        </div>
        <div class="lettersearch" v-show="!isshowletter">
            <p v-for="(i,index) in searcharr" :key="index" @click="go_areatab(i.countryId,i.displayName)" v-show="getCookie('lang')=='zh' || getCookie('lang')==''">{{i.displayName}}  {{i.displayCName}}</p>
            <p v-for="(i,index) in searcharr" :key="index+'zh'" @click="go_areatab(i.displayName,i.displayCName)" v-show="getCookie('lang')=='en'">{{i.displayName}}</p>
            <span v-show="searcharr==''">{{$t('lang.noresults')}}</span>
        </div>
    </div>
</template>
<script>
import {countryalpha,worldcountries} from "../../api/api"
export default { 
    data(){
        return{
            id:"",
            letterid:0,
            countryalphaid:[],
            worldcountriesid:[],
            numReg:/^[0-9]+$/,
            litter:'',
            lettershow:false,
            searcharr:'',
            isshowletter:true,
        }
    },
    methods:{
        mcountryalpha(){
            countryalpha().then((res)=>{
                this.countryalphaid=res.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        mworldcountries(i){
            this.id=i;
            worldcountries({
                alpha:i
            }).then((res)=>{
                this.worldcountriesid=res.data;
                console.log(this.worldcountriesid)
            }).catch((err)=>{
                console.log(err)
            })
        },
        changlettercolor(i,index){
            this.letterid=i;
            if(index=="All"){
                index=""
            }
            this.isshowletter=true;
            this.mworldcountries(index)
        },
        //点击跳转页面
        go_areatab(i,v){
            this.$router.push({
                name:"areatable",
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
        } ,
        labsearch(){
            worldcountries({
                alpha:''
            }).then((res)=>{
                if(this.litter){
                    var arr = []
                    var newarr=[]
                    //转为数组
                    for (let i in res.data) {
                        arr.push(res.data[i]); //属性
                    }
                    //转为每一项
                    for(let i=0;i<arr.length;i++){
                        for(let j=0;j<arr[i].length;j++){
                            // if(arr[i][j].displayName.toLowerCase().indexOf(this.litter.toLowerCase())!==-1){
                            //     newarr.push(arr[i][j]) 
                            // }
                            // console.log(arr[i][j])
                            if(this.getCookie('lang')=='zh' || this.getCookie('lang')==''){
                                if(arr[i][j].displayName.toLowerCase().indexOf(this.litter.toLowerCase())!==-1 || arr[i][j].displayCName.indexOf(this.litter)!==-1){
                                    newarr.push(arr[i][j]) 
                                }
                            }
                            if(this.getCookie('lang')=='en'){
                                if(arr[i][j].displayName.toLowerCase().indexOf(this.litter.toLowerCase())!==-1){
                                    newarr.push(arr[i][j]) 
                                }
                            }
                        }
                    }
                    this.isshowletter=false;
                }
                this.searcharr=newarr
             }).catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.mcountryalpha()
        this.mworldcountries()
    }
};
</script>
<style scoped>
.culture .label-seek .label-letter{
    overflow: hidden;
}
.culture .label-seek .label-letter li{
    float: left;
    height:34px;
    line-height:34px;
    padding:0 8px;
}
.culture .label-seek .label-letter .letteractive{
    background: #b53448;
    color:#fff;
}
.culture .label-seek .label-letter li:hover{
    background: #b53448;
    color:#fff;
    cursor: pointer;
}
.container .main .culture {background:#fff;margin-bottom:60px;min-height:700px;}
.culture {padding:0 20px;}
.culture .label-title {line-height:30px;}
.culture .label-seek {height:34px;width:100%;border-bottom:1px solid #ebeff0;border-top:1px solid #ebeff0;position:relative;overflow:hidden;}
.label-search span {
    display:inline-block;
    width:22px;
    height:22px;
    vertical-align:middle;
    cursor:pointer;
    background:url(../../assets/icon-search.png) no-repeat
}

.culture .letter-list .letter-key {padding:30px 0;display:-webkit-flex;display:flex;border-bottom:1px solid #f5f5f5}
.culture .letter-list .letter-key .letter-icon {-webkit-flex:1;flex:1;}
.culture .letter-list .letter-key .letter-content {-webkit-flex:2;flex:2;-webkit-column-count:2;-moz-column-count:2;column-count:2;overflow:hidden;}
.culture .letter-list .letter-key .letter-content a {cursor:pointer;display:block;height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.lettersearch{
    width: 100%;
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    overflow: hidden;
    background: #fff;
    padding-top:10px;
}
.lettersearch p{
    height: 25px;
    line-height: 25px;
}
.lettersearch p:hover{
    cursor: pointer;
    color:#cc3d55;
}

.culture .label-search {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 34px;
}
.culture .label-search input {
    height: 22px;
    line-height: 22px;
    width: 160px;
    border: 1px solid #cc3d55;
    border-radius: 5px;
    text-indent: 10px;
    margin-right: 5px;
    vertical-align: middle;
}
.culture .label-search span {
    display:inline-block;
    width:22px;
    height:22px;
    vertical-align:middle;
    background:url(../../assets/icon-search.png) no-repeat;
    cursor:pointer;
    margin-top:4px;
}

</style>


