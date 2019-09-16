

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
                <span v-else>{{key}}</span>
            </li>
          </ul>
          <!-- search -->
          <div class="label-search">
              <input type="search" id="search-text" v-model="litter">
              <span class="icon-search" @click="labsearch()"></span>
          </div>
      </div>
      <div class="label-con">
        <div class="labelContent">
            <!-- <div class="label-tit">
              <span v-if="cid=='#'">Other</span>
              <span v-else>{{cid}}</span>
            </div> -->
            <div v-for="(i,index) in labelList" :key="index">
                <p v-show="cid==undefined || cid==''" class="label-tit"> <span>{{index}}</span></p>
                <p v-for="(v,val) in i" :key="val" v-show="cid==undefined || cid==''">{{v.displayName}}</p>
                <p v-show="cid!=''|| cid!='All'"  @click="go_liblist(i.catlabelId)">{{i.displayName}}</p>
            </div>
        </div>
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
      litter:""
    };
  },
  methods: { 
    changcolor(i){
      this.number=i;
    },
    labsearch(){

      // catlabels({
      //   alpha:this.litter
      // }).then((res)=>{
      //   this.labelList=res.data
      //   console.log(res.data)
      // }).catch((err) => {
      //   console.log(err);
      // });
    },
    go_liblist(i){
      this.$router.push({
        name:"label_list",
        params:{id:i,no:""}
      })
    }
    ,
    onlode(i){
      if(i=="All"){
          i=""
      }
      this.cid=i;
      catlabels({
        alpha:i
      }).then((res)=>{
        this.labelList=res.data
        console.log(res.data)
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
.labactive{background: #cc3d55;color:#fff}
.container .main .labels {background:#fff;margin-bottom:60px;min-height:700px;}
.labels {padding:0 20px;}
.labels .nav-label {height:60px;line-height:60px;font-size:18px;}
.labels .label-seek {height:34px;width:100%;border-bottom:1px solid #ebeff0;border-top:1px solid #ebeff0;position:relative;overflow:hidden;}


.labels .label-letter li {float: left;line-height:34px;text-align: center;padding:0 10px;}
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
}
.container .main .labels .label-con .naxos-label {
  background: #fff;
}
.container .main .labels .label-con p {
  padding-left: 20px;
  cursor: pointer;
  display: block;
  width: 281px;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  color: #666666;
  writing-mode: lr-tb;
}
.container .main .labels .label-con a:hover {
  color: #b53448;
}
.container .main .labels .label-con .label-tit {
  height: 40px;
  line-height: 35px;
  color: #333;
  border-bottom: 1px solid #eeeeee;
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

