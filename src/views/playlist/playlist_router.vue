<template>
    <div class="main" id="main">
        <div class="list playlists">
            <div class="nav-playlists">
                <router-link :tag="'p'" :to="{name:'playlist_my'}" v-show="cooklogin!='ip'">{{$t("lang.myPlaylists")}}</router-link>
                <router-link :tag="'p'" :to="{name:'playlist_naxos'}">{{$t("lang.naxosPlaylists")}}</router-link>
                <router-link :tag="'p'" :to="{name:'playlist_themed'}">{{$t("lang.themedPlaylists")}}</router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

export default {
  data(){
    return{
        cooklogin:''
    }
  },
  mounted(){
    this.cooklogin=this.$cookies.get('_kuke_loginType')
    if(this.cooklogin=='ip'){
        this.$router.push("/index/playlist/playlist_naxos");
    }else{
        this.$router.push("/index/playlist/playlist_my");
    }
  }
};
</script>
<style>
.container .nav-playlists {
  background: #fff;
  height: 60px;
  line-height: 60px;
}
.container .nav-playlists p {
  display: inline-block;
  font-size: 18px;
  padding: 0 20px;
  height: 60px;
  cursor: pointer;
}
/*Naxos Playlists和Themed Playlists样式*/


</style>


