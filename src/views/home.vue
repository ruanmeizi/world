<template>

        <!-- 去往详情页面 -->
        <!-- <h1 @click="go_to_detail">home</h1> -->
        <!-- <status-bar :is-active="is-active">添加成功</status-bar> -->
        <div class="main" id="main">
            <div class="list home">
                <div class="title">{{$t('lang.FeaturedAlbums')}}</div>
                
                <div class="content">
                    <a v-for="(i,index) in datafeatured" :key="index" @click="go_to_detail(i.catalogueId)">
                        <dl>
                            <dd v-if="i.cover200=='' && i.cover200==0 || i.origin=='naxos'">
                                 <img v-bind:src="['//cdn.naxosmusiclibrary.com/sharedfiles/Images/cds/others/'+i.catalogueId+'.gif']" alt="" />
                            </dd>
                           
                            <dd v-else-if="i.cover200==1"> 
                                    <img v-bind:src="[' http://image.kuke.com/images/audio/cata200/'+i.catalogueId.slice(0,1)/i.catalogueId+'.jpg']" alt="" />
                            </dd>
                            <dt>
                                <p >{{i.catalogueName}}</p>
                            </dt>
                        </dl>
                        </a>
                    <a>
                        <dl class="catalogueMore" @click="gomore()"><span>更多</span></dl>
                    </a>
                </div>
            </div>
        </div>
</template>
<script>
import {featured,worldpage} from "../api/api.js"
import status_bar from "../components/status_bar"
export default {
  data() {
    return {
      isactive: false,
      datafeatured:[]
    };
  },
  components: {
    "status-bar": status_bar
  },
  methods: {
    go_to_detail: function(val) {
        // console.log(this.datafeatured.catalogueId)
      this.$router.push({
        name: "detail",
        params: { id:val}
      });
    },
    gomore(){
        this.$router.push({
            name: "moredetail",
      });
    }
  },
  mounted:function(){
        featured().then((res)=>{
            this.datafeatured=res.data;
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
  }
};
</script>
<style>
    .home{
        background:#fff;
    }
    .container .title {
        width: 874px;
        height: 60px;
        font-size: 18px;
        padding-left: 20px;
        z-index: 0;
        line-height: 60px;
    }
    .content a {
        display: inline-block;
    }
    .content dl {
        width: 186px;
        height: 273px;
        padding: 6px;
        margin-left: 22px;
        float: left;
        margin-bottom: 20px;
    }
    .content dd {
        position: relative;
        overflow: hidden;
    }
    .content dd img {
        width: 186px;
        height: 186px;
    }
    .content dt {
        height: 20px;
        line-height: 20px;
    }
    .content dl dt p {
        width: 188px !important;
        height: 80px;
        margin-top: 2px;
        overflow: hidden;
    }
    .content dl:hover{
        box-shadow:0px 0px 2px 3px #e0e0e3;
        background:#fff;
    }
    .container .main .list {
        min-width: 904px;
        margin: 0 auto 30px;
        max-width: 1480px;
    }
    .content dl.catalogueMore span {
        display: block;
        text-align: center;
        padding-top: 110px;
        font-size: 30px;
    }
</style>


