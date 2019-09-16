<template>
  <div class="con-playlists">
    <div class="playlists-conLeft">
      <p class="floders-tit">{{$t('lang.folders')}}</p>
      <!-- 左侧文件夹列表  -->
      <div class="floders-list">
        <div v-for="(i,index) in playlistfolderlistid" :key="index" :class="{active:num==index}" @click="changlist(index,i.groupId)" class="floders-index" ref="playlistf">
          <p class="esp">{{i.groupName}}<span>({{i.playlistcount}})</span></p>
        </div>
      </div>
    </div>
    <div class="playlists-conright">
      <el-table :data="playlistfolderplaylistid" ref="playlistTable" fit>
        <el-table-column width="50" align="center">
          <template slot-scope="scope">
            <img src="../../assets/icon-playlistplay.png" alt>
          </template>
        </el-table-column>
        <el-table-column type="index" label="No." width="50" align="center"></el-table-column>
        <el-table-column :label=" $t('lang.lefterplaylists') " >
           <template slot-scope="scope">
              <p @click="go_tracklist(scope.row)">{{scope.row.playlistName}}</p>
          </template>    
        </el-table-column>
        <el-table-column :label=" $t('lang.tracks') " width="65" align="center" prop="trackCount"></el-table-column>
        <el-table-column :label=" $t('lang.duration') " width="80" align="center" >
          <template slot-scope="scope">
              <span>{{scope.row.totalTiming | formatSecond}}</span>
          </template>
        </el-table-column>
        <el-table-column :label=" $t('lang.author') " width="100" align="center" prop="author"></el-table-column>
        <el-table-column
          :label=" $t('lang.dateCreated') "
          width="130"
          align="center"
          prop="createTime"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
function realFormatSecond(second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}
import {playlistfolderlist,playlistfolderplaylist} from "../../api/api"
export default {
  data() {
    return {
      playlistfolderlistid:[],
      playlistfolderplaylistid:[],
      num:0,
      groupId:'',
    };
  },
  filters: {
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second)
    }
  },
  methods: {
    playlistfolderlistfun(){
      playlistfolderlist({
        category:'nml'
      }).then(res=>{
        this.playlistfolderlistid=res.data
        this.groupId=res.data[0].groupId
        this.playlistfolderplaylistfun()
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },
    playlistfolderplaylistfun(){
      playlistfolderplaylist({
        groupId:this.groupId
      }).then(res=>{
        this.playlistfolderplaylistid=res.data
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },
    changlist(val,i){
      this.num=val
      this.groupId=i;
      this. playlistfolderplaylistfun()
    },
    go_tracklist(i){
      this.playlistid=i.playlistId
      this.$router.push({
        name: "tracklist",
        params: { id: this.playlistid}
      });
    }
  },
  mounted() {
    this.playlistfolderlistfun();
    console.log(playlistfolderlist)
  },
};
</script>
<style>
  .con-playlists {clear:both;overflow:hidden;}
  .con-playlists .playlists-conLeft {margin-top:10px;background:#fff;min-height:920px;float:left;width:22%;}
  .con-playlists .playlists-conLeft .floders-tit {padding:0 20px;height:50px;font-weight:600;line-height:50px;border-bottom:1px solid #e6e6e6;font-size:16px;}
  .con-playlists .playlists-conLeft .eps {height:40px;line-height:40px;padding-left:20px;cursor:pointer;}
  .container .main .playlists .con-playlists .playlists-conLeft .floders-index {
    display: block;
    height: 40px;
    position: relative;
    padding-left: 10px;
    cursor: pointer;
    line-height: 40px;
}
  .con-playlists .playlists-conLeft .eps:hover,.con-playlists .playlists-conLeft .active {border-left:2px solid #b53448;background:#f7f9fa;}
  .con-playlists .playlists-conright {width:75%;min-height:920px;margin-top:10px;float:right;background:#fff;box-sizing:border-box;padding:0px 20px;}
</style>
