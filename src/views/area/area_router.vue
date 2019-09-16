<template>
  <div class="main">
    <div class="list area">
      <div class="nav-area">
        <router-link :tag="'p'" :to="{name:'range'}">{{$t("lang.arearange")}}</router-link>
        <router-link :tag="'p'" :to="{name:'letter'}">{{$t("lang.arealetter")}}</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  // beforeCreate: function() {
  //   this.$router.push("/index/area/range");
  // }
};
</script>
<style>
.container .nav-area {
  background: #fff;
  height: 60px;
  line-height: 60px;
}
.container .nav-area p {
  display: inline-block;
  font-size: 18px;
  padding-left: 20px;
  height: 60px;
  cursor: pointer;
}
</style>

