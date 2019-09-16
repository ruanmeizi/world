<template>
      <div class="areaTip">
        <el-tooltip :class="'item areaTip'+i.regionId" :content="i.cname" placement="top" effect="light" v-for="(i,index) in arearegionsid" :key="index" v-show="getCookie('lang')=='zh' || getCookie('lang')==''">
          <el-button @click="go_arealist(i.regionId,i.cname)"></el-button>
        </el-tooltip>
        <el-tooltip :class="'item areaTip'+i.regionId" :content="i.name" placement="top" effect="light" v-for="(i,index) in arearegionsid" :key="index+'22'" v-show="getCookie('lang')=='en'">
          <el-button @click="go_arealist(i.regionId,i.name)"></el-button>
        </el-tooltip>
      </div>
</template>
<script>
import {arearegions} from "../../api/api"
export default {
  data(){
    return{
      arearegionsid:[]
    }
  },
  methods:{
    lode(){
      arearegions().then((res)=>{
        console.log(res)
        this.arearegionsid=res.data;
      }).catch((err)=>{
        console.log(err)
      })
    },
    go_arealist(i,v){
     this.$router.push({
				name:"arealist",
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
        } 
  },
  mounted(){
    this.lode()
  }
}
</script>

<style>

.area .areaTip {
  width: 834px;
  height: 430px;
  margin: 60px auto 50px;
  background: url(../../assets/icon-areaBg.png) no-repeat;
  position: relative;
  z-index: 1;
}
.area .areaTip .el-button {
  position: absolute;
  padding: 0;
  border: 4px solid #b53448;
  width: 12px;
  height: 12px;
  background: #fff;
  z-index: 2;
  border-radius: 50%;
}
.area .areaTip .el-button:hover {
  -webkit-box-shadow: 0 0 12px #ff0;
  box-shadow: 0 0 12px #ff0;
}
.area .areaTip .areaTip005 {
  top: 283px;
  left: 171px;
}
.area .areaTip .areaTip011 {
    top: 194px;
    left: 294px;
}
.area .areaTip .areaTip013 {
  top: 202px;
  left: 87px;
}
.area .areaTip .areaTip014 {
  top: 245px;
  left: 419px;
}
.area .areaTip .areaTip015 {
    top: 153px;
    left: 362px;
}
.area .areaTip .areaTip017 {
    top: 237px;
    left: 358px;
}
.area .areaTip .areaTip018 {
    top: 321px;
    left: 385px;
}
.area .areaTip .areaTip021 {
    top: 92px;
    left: 99px;
}
.area .areaTip .areaTip029 {
    top: 187px;
    left: 128px;
}
.area .areaTip .areaTip030 {
    top: 132px;
    left: 618px;
}
.area .areaTip .areaTip034 {
    top: 166px;
    left: 529px;
}
.area .areaTip .areaTip035 {
    top: 249px;
    left: 606px;
}
.area .areaTip .areaTip039 {
    top: 117px;
    left: 306px;
}
.area .areaTip .areaTip054 {
    top: 328px;
    left: 701px;
}
.area .areaTip .areaTip053 {
    top: 255px;
    left: 717px;
}
.area .areaTip .areaTip061 {
    top: 291px;
    left: 799px;
}
.area .areaTip .areaTip143 {
    top: 112px;
    left: 494px;
}
.area .areaTip .areaTip145 {
     top: 146px;
    left: 446px;
}
.area .areaTip .areaTip151 {
    top: 88px;
    left: 391px;
}
.area .areaTip .areaTip154 {
    top: 47px;
    left: 356px;
}
.area .areaTip .areaTip155 {
    top: 82px;
    left: 324px;
}
</style>
