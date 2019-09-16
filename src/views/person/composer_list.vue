<template>
     <!-- <div class="main" id="main">
        <div class="list people">
            <div class="nav-people">
                <a><span >{{ $t("lang.composers_title")}}</span></a>
                <a @click="goartistList()"><span>{{ $t("lang.artist_title")}}</span></a>
            </div> -->
            <!-- <router-view class="con-people"></router-view> -->
            <div class="con-people">
                <div class="people-tab artists">
                    <!-- <p ></p> -->
                    <div class="composers-title">{{ $t('lang.availablefilters') }}</div>
                    <div class="composers-index">
                            <ul>
                                <!-- 渲染出abc -->
                                <li v-for="(i,index,val) in dataAlpha" :key="index" v-show="index!=0" v-if="index!='#'" :class="{comactive:index==number}"  @click="change(val,index)">
                                    {{index}}
                                </li>
                                <li v-for="(i,index,val) in dataAlpha" :key="index" v-if="index=='#'" v-show="index!=0" :class="{comactive:index==number}"  @click="change(val,index)">
                                    Other
                                </li>
                            </ul>
                        <!-- search -->
                        <div class="select-letter">
                            <input type="search" id="person-search-input" value="" v-model="selectletter">
                            <a id="search-btn" @click="goSearch()"><img src="../../assets/icon-search.png" alt=""></a>
                        </div>
                    </div>
                    <!-- <keep-alive> -->
                    <div class="composers-list" v-show="isserach">
                        <a v-for="(i,index) in list" :key="index"  @click="to_composerinfo(i.personId)">{{i.fullName}}</a>
                    </div>
                    <!-- </keep-alive> -->
                    <div class="composers-list" v-show="!isserach">
                        <a v-for="(i,index) in searchresult" :key="index" @click="to_composerinfo(i.extern[0].id)">{{i.name}}</a>
                        <p v-show="searchresult==''" class="noresults">{{$t('lang.noresults')}}</p>
                    </div>
                </div>  
            </div>
        <!-- </div> -->
    <!-- </div> -->
</template>
<script>
import { composersAlpha , searchsuggest} from "../../api/api.js";
import { composerslist } from "../../api/api.js";
//引入loading
// import { Loading } from 'element-ui';
export default {
  data() {
    return {
      number: "null",
      dataAlpha: [],
      list: [],
      letter: "",
      cataId: "",
      selectletter: "",
      searchresult:[],
      isserach:true,
    };
  },
  methods: {
    onLoad() {
      this.cataId = this.$route.params.id;
      console.log(this.cataId);
      composersAlpha()
        .then(res => {
          this.dataAlpha = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      composerslist({
        alpha: this.cataId
      })
        .then(res => {
          this.list = res.data;
           console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变颜色
    change: function(index, i) {
      this.number = i;
      this.isserach=true
      this.$router.push({
        name: "composer_list",
        params: { id: i }
      });
    },
    to_composerinfo(i) {
      this.$router.push({
        name: "composer_info",
        params: { id: i }
      });
    },
    //点击搜索
    goSearch() {
      if(this.selectletter){
        this.isserach=false;
        searchsuggest({
          q:this.selectletter,
          type:'composer',
          orderby:1
        }).then(res=>{
          console.log(res.matches)
          this.searchresult=res.matches
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    goartistList(){
        this.$router.push({
            name: "artist_list",
            params: { id: 'A' }
        });
    }
  },
  mounted() {
    this.number = this.$route.params.id;
    this.onLoad();
  },
  watch: {
    //查询参数改变，再次执行数据获取方法
    $route(to, from) {
      this.onLoad();
    }
  }
};
</script>
<style scope>
.comactive {
  background: #b53448;
  color: #fff;
}
.composers-index ul {
  overflow: hidden;
  float: left;
}
.composers-index ul li {
  float: left;
  padding: 0 7px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  display: inline-block;
}
.artists .composers-index ul li:hover{
  background: #b53448;
  color: #fff;
  cursor: pointer;
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
  min-height: 600px;
  padding-top:8px;
}
.composers .composers-list a,
.artists .composers-list a {
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
.artists .composers-list .noresults{
  background:#fff;
  padding-left:20px;
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
  border: 1px solid #b53448;
  margin-right: 10px;
  text-indent: 9px;
}

.container .main .people .nav-people{
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding-left: 20px;
    background: #fff;
}
.container .main .people .nav-people span:first-child {
    margin-right: 20px;
}
.nav-people .router-link-active{
    color:#b53448;
}
</style>


