

<!-- 厂牌页面 -->
<template>
  <div class="main" id="main">
    <div class="list labels">
      <p class="nav-label">{{$t('lang.labels')}}</p>
      <div class="label-seek">
          <!-- 首字母显示 -->
          <ul class="label-letter" >
            <li v-for="(value,key,i) in letter" :key="key" @click="onlode(key),changcolor(i)" v-show="value!=0" :class="{labactive:i==number}">
              <!-- {{key}} -->
                <span v-if="key == '#'">Others</span>
                <span v-else >{{key}}</span>
            </li>
          </ul>
          <!-- search -->
          <div class="label-search">
              <input type="search" id="search-text" v-model="litter">
              <span class="icon-search" @click="labsearch()"></span>
          </div>
      </div>
      <div class="label-con"  v-show="issearch">
            
            <!-- <div class="label-tit">
              <span v-if="cid=='#'">Other</span>
              <span v-else>{{cid}}</span>
            </div> -->
            <!-- 全部 -->
            <div v-for="(i,index) in labelList" :key="index" class="labelContent" v-if="i!=''" v-show="cid==undefined || cid==''">
                <p  class="label-tit">
                   <span v-if="index!='nxs' && index!='#'">{{index}}</span>
                   <span v-if="index=='nxs'">Naxos Labels</span>
                   <span v-if="index=='#'">Other</span>
                </p>
                <p v-for="(v,val) in i" :key="val" @click="go_liblist(v.catlabelId)">{{v.displayName}}</p>
                <!-- <p v-show="cid!=''|| cid!='All'">{{i.displayName}}</p> -->
                <!-- <p v-show="cid!=''|| cid!='All'"  @click="go_liblist(i.catlabelId)">{{i.displayName}}</p> -->
            </div>

            <div class="labelContent" v-show="cid!= undefined && cid!=''" >
              <div class="label-tit">
                <span v-if="cid=='#'">Other</span>
                <span v-else>{{cid}}</span>
              </div>
              <p v-for="(i,index) in labelList" :key="index"  v-if="cid!=''|| cid!='All'" @click="go_liblist(i.catlabelId)">{{i.displayName}}</p>
            </div>           
        </div>
       <div class="label-con" v-show="!issearch">
         <p v-for="(i,index) in searcharr" :key="index" @click="go_liblist(i.catlabelId)">{{i.displayName}}</p>
         <span v-show="searcharr==''">{{$t('lang.noresults')}}</span>
      </div>  
    </div>
  </div>
</template>
<script>
import { catlabelAlpha,catlabels } from "@/api/api.js";
import { constants } from 'fs';
export default {
  data() {
    return {
      number:0,
      letter: [],
      labelList:[],
      cid:"-1",
      litter:"",
      numlib:"",
      labelListAll:[],
      searcharr:'',
      issearch:true,
    };
  },
  computed:{
        newlist(){
     //1. 常规做法
     //     var that=this
     //     function iscontainer(value){
     //       return  value.name.indexOf(that.searchId)!==-1
     //     }
     //     var temlist=this.list.filter(iscontainer)
     // iscontainer是一个函数，value就是list中的每一项的值,通过判断是否包含来来过滤数据内容
     //     return temlist
     //    }
     //2.es6做法
         return this.labelListAll.filter(value=>{console.log(value)})  
 
         }
    },
  methods: { 
    changcolor(i){
      this.number=i;
    },
    labsearch(){
      var search=this.litter;
      console.log(search)

      var newlist=[]
      var tt=[];
      catlabels({
        alpha:''
      }).then((res)=>{
        //判断有没有search
         if(search){
            var arr = []
            var newarr=[]
            //转为数组
            for (let i in res.data) {
                arr.push(res.data[i]); //属性
            }
            //转为每一项
            for(let i=0;i<arr.length;i++){
              for(let j=0;j<arr[i].length;j++){
                // newarr.push(arr[i][j]) 
                if(arr[i][j].displayName.toLowerCase().indexOf(search.toLowerCase())!==-1){
                    newarr.push(arr[i][j]) 
                }
              }
            }
            this.issearch=false
         }
        this.searcharr=newarr
      }).catch((err) => {
        console.log(err);
      });
    },
    go_liblist(i){
      this.$router.push({
        name:"label_list",
        params:{id:i,no:"All"}
      })
    }
    ,
    onlode(i){
      this.issearch=true;
      if(i=="All"){
          i=""
      }
      this.cid=i;
      catlabels({
        alpha:i
      }).then((res)=>{
        this.labelList=res.data
        console.log(this.labelList)
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted(){
    //首字母
    catlabelAlpha().then((res) => {         
      this.letter = res.data;
    }).catch((err) => {
      console.log(err);
    });
   
    this.onlode()
  }
};
</script>
<style scoped>
.numlib{
  height: 172px;
  float: left;
}
.labelContent{
  min-height: 172px;
  float: left;
}
.labactive{background: #cc3d55;color:#fff}
.container .main .labels {background:#fff;margin-bottom:60px;min-height:700px;}
.labels {padding:0 20px;}
.labels .nav-label {height:60px;line-height:60px;font-size:18px;}
.labels .label-seek {height:34px;width:100%;border-bottom:1px solid #ebeff0;border-top:1px solid #ebeff0;position:relative;overflow:hidden;}


.labels .label-letter li {float: left;line-height:34px;text-align: center;padding:0 10px;}
.labels .label-letter li:hover{
  background: #cc3d55;
  color:#fff;
  cursor: pointer;
}
.labels .label-search {position:absolute;top:0;right:0;line-height:34px;}
.labels .label-search input {height:22px;line-height:22px;width:160px;border:1px solid #cc3d55;border-radius:5px;text-indent:10px;margin-right:5px;vertical-align:middle;}
.labels .label-search span {display:inline-block;width:22px;height:22px;vertical-align:middle;background:url(../../assets/icon-search.png) no-repeat;cursor:pointer; margin-top:4px;}

.container .main .labels .label-con {
  margin: 0 30px 60px;
  writing-mode: tb-lr;
  -webkit-column-count: 3;
  -moz-column-count: 3;
  overflow: hidden;
  padding-top: 20px;
  min-height: 1300px;
  /* background: yellow; */
}
.container .main .labels .label-con .naxos-label {
  background: #fff;
}
.container .main .labels .label-con .labelContent:first-child{
  background: rgb(250, 250, 250);
}
.container .main .labels .label-con p {
  /* padding-left: 20px; */
  cursor: pointer;
  display: block;
  width: 281px;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  color: #666666;
  writing-mode: lr-tb;
  margin-left:20px;
}
.container .main .labels .label-con a:hover {
  color: #b53448;
}
.container .main .labels .label-con .label-tit {
  height: 40px;
  line-height: 35px;
  color: #333;
  border-bottom: 1px solid #f5f5f5;
  margin-top: 10px;
}
.container .main .labels .label-con .label-tit > span {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  min-width: 36px;
  padding: 0 4px;
  border: 2px solid #d7d7d7;
  border-radius: 24px;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
}

.container .main .labels .label-con .label-index {
  margin-top: 38px;
  margin-bottom: 10px;
  height: 36px;
  border-bottom: 1px solid #eeeeee;
}
.container .main .labels .label-con .label-index span {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    min-width: 36px;
    padding: 0 4px;
    border: 2px solid #d7d7d7;
    border-radius: 24px;
    font-weight: 600;
    text-align: center;
    font-size: 14px;
}
</style>

