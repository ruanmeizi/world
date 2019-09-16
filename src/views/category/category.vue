<template>
  <div class="main" id="main">
    <div class="list category">
      <div class="nav-category">
        <p>分类</p>
      </div>
      <div class="con-category">
        
        <div class="category-list" v-for="(i,index) in workcategoryfeaturedid" :key="index" @click="go_categorylist(i.workCatId,i.categoryName)">
          <div class="category-img">
            <img :src="require('../../assets/'+i.imagePath)">
            <div class="category-mark" id="category-mark1"></div>
          </div>
          <span class="workCategory">{{i.categoryName}}</span>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>

import {workcategoryfeatured} from "../../api/api"

export default {
  data() {
    return {
      workcategoryfeaturedid:"",
    }
  },
  methods:{
    lode(){
      workcategoryfeatured().then((res)=>{
        this.workcategoryfeaturedid=res.data;
        console.log(this.workcategoryfeaturedid)
      }).catch((err)=>{
        console.log(err)
      })
    },
    go_categorylist(i,v){
      this.$router.push({
        name:"category_list",
        params:{
          id:i,
          tit:v
        }
      })
    }
  },
  mounted(){
    this.lode()
  },
};
</script>
<style>
.container .main .category {
  height: 1260px;
}
.container .main .category .nav-category {
  height: 68px;
  line-height: 98px;
  font-size: 18px;
  padding-left: 10px;
}
.container .main .category .con-category .clear {
  clear: both;
}
.container .main .category .con-category .category-list {
  padding-top: 12px;
  float: left;
  width: 208px;
  height: 236px;
  text-align: center;
  margin-right: 10px;
  margin-top: 12px;
  cursor: pointer;
}
.container .main .category .con-category .category-listhover {
  box-shadow: 0px 0px 2px 3px #e0e0e3;
}
.container .main .category .con-category .category-list:hover {
  box-shadow: 0px 0px 2px 3px #e0e0e3;
  background: #fff;
}
.container .main .category .con-category .category-list .category-img {
  margin: 0 auto;
  width: 188px;
  height: 188px;
  overflow: hidden;
  z-index: 1;
  position: relative;
}
.container .main .category .con-category .category-list .category-img img {
  width: 188px;
  position: relative;
  z-index: -1;
}
.container .main .category .con-category .category-list span {
  display: block;
  height: 26px;
  font-size: 16px;
  padding-top: 8px;
  font-weight: bold;
}
</style>


