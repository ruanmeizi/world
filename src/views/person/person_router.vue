<template>
    <div class="main" id="main">
        <div class="list people">
            <div class="nav-people">
                <router-link :tag="'a'" to="/index/person/composer_list/A" dir='/index/person/composer_list' class="lib">
                    <span>{{ $t("lang.composers_title")}}</span>
                </router-link>
                <router-link to="/index/person/artist_list/A" dir='/index/person/artist_list' class="lib">
                    <span>{{ $t("lang.artist_title")}}</span>
                </router-link>
            </div>
             <router-view class="con-people"></router-view>
        </div>
    </div>
</template>
<script>
export default {
    watch:{
        $route(to,from){
            let lis = document.querySelectorAll(".lib");
            let path = this.$route.path;
            if(path.indexOf('index/person/composer')!=-1){
                path='/index/person/composer_list'
            }
            if(path.indexOf('/index/person/artist')!=-1){
                path='/index/person/artist_list'
            }
            lis.forEach(function(item) {
                item.firstElementChild.classList.remove("listselect");
                if (item.getAttribute("dir") == path) {
                    item.firstElementChild.classList.add("listselect");
                }
            });
        }
    },
    mounted(){
        let lis = document.querySelectorAll(".lib");
        let path = this.$route.path;
        if(path.indexOf('index/person/composer')!=-1){
            path='/index/person/composer_list'
        }
        if(path.indexOf('/index/person/artist')!=-1){
            path='/index/person/artist_list'
        }
        lis.forEach(function(item) {
            item.firstElementChild.classList.remove("listselect");
            if (item.getAttribute("dir") == path) {
                item.firstElementChild.classList.add("listselect");
            }
        });
    }
}
</script>
<style>
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
.nav-people .listselect{
    color:#b53448;
}
</style>