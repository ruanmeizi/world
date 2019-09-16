

<!-- 厂牌页面 -->
<template>
  <div class="main" id="main">
    <div class="list labels">
      <p class="nav-label">{{$t('lang.labels')}}</p>
      <div class="label-seek">
        <!-- 首字母显示 -->
        <ul class="label-letter">
          <li v-for="(value, key, index) in letter">
            <a v-if="value != 0" @click="toggleTab(key),getItme(index)" :class="activeClass == index ? 'active':''">
              <span v-if="key == '#'">Others</span>
              <span v-else>{{key}}</span>
            </a>
          </li>
        </ul>
        <div class="label-search">
          <input type="search" id="search-text">
          <span class="icon-search"></span>
        </div>
      </div>

      <!-- 数据展示 -->     
       <!-- 展示全部数据All -->
      <div id="label-list" class="label-con" v-if="letterKey == 'All'">
            <div  class="labelContent" v-for="(value, key, index) in labelList" v-if="key == 'nxs'">
                <!--先渲染nxs下的数据 -->
                <div v-if="value.length != 0 && key == 'nxs'"> 
                    <!--字母的标签 -->
                    <p href="javascript:void(0);" class="label-index"> 
                        <span v-if="key == '#'">Others</span>
                        <span v-else-if="key == 'nxs'">Naxos Labels</span>
                        <span v-else>{{key}}</span>
                    </p>
                    <!--每个字母下的数据 -->
                    <div v-for="(innerValue,innerKey,innerIndex) in value">
                        <a class="labelBtn" :data-id="innerValue.catlabelId">{{innerValue.displayName}}</a>
                    </div>
                </div> 
            </div>
            <!--后渲染A~Z下的数据 -->
            <div  class="labelContent" v-for="(value, key, index) in labelList">
                <div v-if="value.length != 0 && key != 'nxs'">
                    <p href="javascript:void(0);" class="label-index">
                        <span v-if="key == '#'">Others</span>
                        <span v-else-if="key == 'nxs'">Naxos Labels</span>
                        <span v-else>{{key}}</span>
                    </p>
                    <div v-for="(innerValue,innerKey,innerIndex) in value">
                        <a class="labelBtn" :data-id="innerValue.catlabelId">{{innerValue.displayName}}</a>
                    </div>
                </div> 
            </div>
      </div>  
      <!-- 展示点击字母的数据 -->
      <div id="label-list" class="label-con" v-else>             
            <div  class="labelContent" v-for="(value, key, index) in labelList" v-if='letterKey == key'>
                <div v-if="value.length != 0 && letterKey == key">
                    <p href="javascript:void(0);" class="label-index">
                        <span v-if="key == '#'">Others</span>
                        <span v-else-if="key == 'nxs'">Naxos Labels</span>
                        <span v-else>{{key}}</span>
                    </p>
                    <div v-for="(innerValue,innerKey,innerIndex) in value">
                        <a class="labelBtn" :data-id="innerValue.catlabelId">{{innerValue.displayName}}</a>
                    </div>
                </div> 
            </div>
      </div>


    </div>
  </div>
</template>
<script>
import { catlabelAlpha,catlabels } from "@/api/api.js";
export default {
  data() {
    return {
      letter: [],
      letterKey:'',
      activeClass: 0,// 0为默认选择第一个，-1为不选择
      labelList:[]
    };
  },
  created() {
    this.onLoad();
    this.toggleTab();
  },
  methods: {
    onLoad() { //首字母显示 
      catlabelAlpha().then((res) => {         
          this.letter = res.data;
        }).catch((err) => {
          console.log(err);
        });
    },
    toggleTab(key,index){ //数据展示
        this.letterKey = key;
        catlabels().then((res)=>{
            this.labelList = res.data;
        }).catch((err)=>{
            console.log(err);
        })
    },
    getItme(index) {
      this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
    }
  },
  mounted(){

  }
};
</script>
<style>
.container .main .labels {background:#fff;margin-bottom:60px;min-height:700px;}
.labels {padding:0 20px;}
.labels .nav-label {height:60px;line-height:60px;font-size:18px;}
.labels .label-seek {height:34px;width:100%;border-bottom:1px solid #ebeff0;border-top:1px solid #ebeff0;position:relative;overflow:hidden;}
.labels .label-letter {position:absolute;top:0;left:0;font-size:0;}
.labels .label-letter li {display:inline-block;}
.labels .label-letter a {display:block;padding:0 9px;height:34px;line-height:34px;text-align:center;font-size:14px;cursor:pointer;}
.labels .label-letter a.active {background:#b53448;color:#fff;}
.labels .label-search {position:absolute;top:0;right:0;line-height:34px;}
.labels .label-search input {height:22px;line-height:22px;width:160px;border:1px solid #000;border-radius:5px;text-indent:10px;margin-right:5px;vertical-align:middle;}
.labels .label-search span {display:inline-block;width:22px;height:22px;vertical-align:middle;background:url(../../assets/icon-search.png) no-repeat;cursor:pointer;}

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
.container .main .labels .label-con a {
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
  height: 35px;
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

