<template>
    <div>
        <div class="playerdialogse">
          <el-dialog
            :title="$t('lang.Noplaypermission')"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <!-- <span>{{$t('lang.Noplaypermission')}}</span> -->
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">{{$t('lang.Close')}}</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 展开播放类表按钮 -->
        <div class="slide-arrows" @click="go_player()" :class="{hid:flog}">
            <img src="../assets/slide1.png">
        </div>
        <!-- 播放列表 -->
        <div id="slidebar" ref="playerbar" :class="{tra:flog,closetra:!flog}">
        <div class="_playmain">
            <!-- 关闭播放类表按钮 -->
            <div class="slide2" @click="closeplayer()">
                <img src="../assets/slide2.png" class="slide-hide" title="Minimise Player">
            </div>
			  <div>
				  <p class="_title" @click="li()">{{$t('lang.lefterplaylists')}}</p>
        </div>
        <div class="playbackbtn">
            <!-- <span id="playQueueBtn" class="playQueueBtn" @click="closeplayer()">返回</span> -->
            <span @mouseenter="showhover=false" @mouseleave="showhover=true">
                <img src="../assets/iconback.png" alt="" @click="closeplayer()" v-show="showhover">
                <img src="../assets/iconbackhover.png" alt="" @click="closeplayer()" v-show="!showhover">
            </span>
            
            <p class="_playButton">
              <input type="button" class="_playButton01" value="清除全部" @click="clearall()">
            </p>
        </div>
      <!-- 播放列表 -->
			<div class="_playBoxTemp " style="overflow-y:auto;" ref='playBoxTemp'>
				<div class="_playBox">
          <!-- 播放的专辑 -->
          <div v-for="(i,index) in data" :key="index">
            <div class="eps _playAlbum" v-if="i.catalogue!=''">
            
              <!--  v-if="catalogueplay.cover200=='' && catalogueplay.cover200==0 || catalogueplay.origin=='naxos'" -->
              <img v-bind:src="['//cdn.naxosmusiclibrary.com/sharedfiles/Images/cds/others/'+i.catalogue.catalogueId+'.gif']" alt="" />{{i.catalogue.catalogueName}}
            </div>
            <!-- 播放的作品 -->
            <ol class="_playOl cf playQueue_tit" v-if="i.work!=''" >
              <input type="hidden" class="input" id="7007200" value="0_0">
              <li>
                <div class="cart_list">
                  <span></span>
                </div>
              </li>
              <li>
                <p class="_playNum">&nbsp;</p>
              </li>
              <li>
                <div class="_playDown">
                  <span class="_playPlaying vsHidden"></span>
                  <span class="_playOpen _playOpenisA" @click="toggleworks($event)"></span>
                  <p class="_playWorks eps">{{i.work.trackGroupTitle}}</p>
                </div>
                <div class="_playInfo hide">
                    <span v-for="(v,val) in i.work.artists" :key="val">
                      <a class="blue" >{{v.fullName}}</a><br>
                    </span>
                </div>
              </li>
              <li class="_playdelect">
                <p class="_playName">{{i.work.timing}}</p>
                <p class="_playDel" @click="workplaydel(i,index)">
                  <img src="../assets/icon-dustbin.png" alt="">
                </p>
              </li>
            </ol>
            <!-- 播放的单曲 -->
            <ol class="_playOl cf" ref="songsol">
              <!-- <input type="hidden" class="input work0_0 track0_0_0" trackid="3987288" id="3987288" value="0_0_0">                             -->
              <li>
                <div class="cart_list">
                  <span :class="{kukewave:index==songnum,kukewavegif:index==songnum && songplaying}" ref="songimgchange"></span>
                </div>
              </li>                            
              <li>
                <p class="_playNum _playExist" id="playNum1">{{index+1}}</p>
              </li>                           
              <li>
                <div class="_playDown cf" >
                  <span class="_playPlaying" @click="playsingle(i,index)" ref="clickplaymusic"></span>
                  <span class="_playOpen _playOpenisA" @click="toggle($event,index)"></span>
                  <a class="play_btn _playWorks eps" href="javascript:void(0)" @dblclick="playsingle(i,index)">»{{i.trackTitle}}</a>
                </div>
                <div class="_playInfo hide">
                    <span v-for="(v,val) in i.artists" :key="val">
                      <a class="blue" >{{v.fullName}}</a><br>
                    </span>
                </div>
              </li>
              <li class="_playdelect">
                  <p class="_playName">{{i.timing}}</p>
                  <p class="_playDel" @click="songplaydel(i,index)">
                      <img src="../assets/icon-dustbin.png" alt="">
                  </p>
              </li>
            </ol>
             <!-- {{JSON.stringify(data)}}
             <br>
             <br>
             {{data}} -->
          </div>
        </div>
			</div>
      <!--下面的播放器 -->
      <div class="grid-music-container">
        <!-- 专辑图片 -->
        <div class="u-cover paused">
            <img v-if="JSON.stringify(this.data)=='{}' || data=='' || data==null" :src="album_pic" alt="当我在这里">    
            <img v-else v-bind:src="['//cdn.naxosmusiclibrary.com/sharedfiles/Images/cds/others/'+imgindex.catalogueId+'.gif']" alt="" />  
        </div>
        <div class="m-music-play-wrap" @click="hidevolume()">
          <!-- 专辑的详情信息 -->
            <!-- <div class="m-now-info" v-if="data!='[object Object]' && data!='' && data!=null"> -->
              <div class="m-now-info" v-if="JSON.stringify(this.data)!='{}' && data!=null">
                <div class="eps">
	                <span class="u-music-title">{{imgindex.trackTitle}}</span>
	              </div> 
                <p class="u-artist">
                  <span v-for="(i,index) in imgindex.artists" :key="index">{{i.fullName}}</span>
                </p>
                <p class="brand"><span class="u-brand">{{imgindex.origin}}</span>&nbsp;|&nbsp;<span class="u-album">{{imgindex.trackId}}</span></p>
            </div>
            <div class="m-now-info" v-if="JSON.stringify(this.data)=='{}' || data==null">
                <div class="eps">
	                <span class="u-music-title">Track title</span>
	              </div> 
                <p class="u-artist">
                  <span>Artist</span>
                </p>
                <p class="brand"><span class="u-brand">Label</span>&nbsp;|&nbsp;<span class="u-album">CatalogueNo</span></p>
            </div>
            <!--专辑的播放按钮 -->
          <div class="m-btn">
                 <div class="m-play-controls02">
                    <a class="u-play-btn mode mode-random" title="Shuffle on" @click="songrandom()" :class="{current:hasrandom}"></a>
                </div>
                <div class="m-play-controls01">
                    <a class="u-play-btn prev" title="Previous Track" @click="playprve()"></a>
                    <a class="u-play-btn ctrl-play paused" title="Play" @click="toggleStatus()" ref='play'></a>
                    <a class="u-play-btn next" title="Next Track" @click="playNext()" ref="changnext"></a>
                </div>
                <div class="m-play-controls02">
                    <a class="u-play-btn mode" title="repeat all" @click="songloop()" ref="modeList" :class="{modeListoff:modeListclass,modeSingleon:!modeListclass}"></a>
                </div>
                   <div class="m-now-controls">
                    <div class="u-control u-surplusTime">{{currentTime | formatSecond}}</div>
                    <div class="u-control u-process">
                         <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider>
                    </div>
                    <div class="u-control u-time">{{maxTime | formatSecond}}</div>
                  <div class="u-control u-volume">
                      <div class='volume-process' :class="{show:volumeflog}" @click.stop="stop()">
                        <el-slider
                          v-model="volumebar"
                          vertical
                          @change="changemuted"
                          :format-tooltip="formatTooltip"
                          height="50px">
                        </el-slider>
                      </div>
                      <a class="volume-control" title="Mute" ref="volumeplay" @click.stop='showvolume()'></a>
                  </div>
                </div>

            </div>
        </div>
        <audio :src="audio.location" @play="onPlay"  @timeupdate="onTimeupdate" @canplay="canPlaySong" @pause='onPause' @error="loadError" @ended="endPlayNext" id="audioPlay" ref="audio" @loadedmetadata='onloadedmetadata' :loop='chloop' controls hidden="true" @playing='onPlaying' autoplay></audio>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import bus from "../bus.js";
import { worldaddress,playTrack } from "../api/api";
import { formatDate } from "../utils/util.js";
import storage from "good-storage";
import { error } from 'util';
//时间戳
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return (
      hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}

export default {
  data() {
    return {
      flog: false,
      data: [],
      catalogueplay: [],
      workplay: [],
      isA: false,
      worldaddressid: [],
      oldSetItem: [],
      flag: false,
      musicList: "",
      songList: [],

      //音乐播放器
      audio: {
        location: ""
      },
      album_pic: require("../assets/empty-album.png"),
      loading: false,

      playing: false, //是否自动播放
      songnum: 0,
      frist: "",
      songid: "",
      time: "",
      currentTime: "00:00",
      maxTime: 0,
      sliderTime: 0,
      volumebar: 100,
      volumeflog: false,
      volumemuted: false,
      songstate: "",
      songindex: 0,
      imgindex: [],
      songplaying: false,
      chloop: false,
      modeListclass: true,
      hasrandom: false,
      bordcast: false,
      dataAll: [],
      wode: "",
      dui: "",
      showhover: true,
      newdata:{},
      clientHeight:document.documentElement.clientHeight || document.body.clientHeight,
      centerDialogVisible:false,
      ispower:'',
      nowtime:'',
    };
  },
  created() {
    window.changesong = this.changesong;
    window.changeFlog = this.changeFlog;
    window.addEventListener("setItem", () => {
      this.dataAll = JSON.parse(localStorage.getItem("kuke"));
      this.data = JSON.parse(localStorage.getItem("kuke"));
      if (this.data != null) {
        for (var i = 0; i < this.data.length; i++) {
          for (var j = i + 1; j < this.data.length; j++) {
            if (
              this.data[i].work.trackGroupId == this.data[j].work.trackGroupId
            ) {
              this.data[j].work = [];
            }
          }
        }
        for (var i = 0; i < this.data.length; i++) {
          for (var j = i + 1; j < this.data.length; j++) {
            if (
              this.data[i].catalogue.catalogueName ==
              this.data[j].catalogue.catalogueName
            ) {
              this.data[j].catalogue = [];
            }
          }
        }
      }
      this.songnum = 0;
      this.imgindex = this.data[0];    
    });
    window.addEventListener("setItems", () => {
      this.audio.location = localStorage.getItem("songurl");
      //this.wode=localStorage.getItem("songurl")
      if (localStorage.getItem("songurl") != "" && localStorage.getItem("songurl")!='null') {
        this.$refs.play.style.backgroundPosition = "-250px 0";
      }
      if(localStorage.getItem("songurl")=='null'){
        this.centerDialogVisible=true;
      }
    });
    // window.addEventListener("setItemss",()=>{
    //   this.imgindex=localStorage.getItem("songinfo")
    //   console.log(this.imgindex)
    // })
    var vm = this;
    bus.$on("fristsong", function(song) {
      vm.frist = song;
    });
    this.songnum = localStorage.getItem("index");
  },
  computed: {
    audioLocation: function() {
      return this.$store.commit(frist);
    }
    // kuke1(){
    //   return this.$store.state.kuke1
    // }
  },
  filters: {
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    }
  },
  methods: {
    go_player() {
      if (this.flog) {
        this.flog = false;
      } else {
        this.flog = true;
      }
      this.$refs.playerbar.style.left = "0px";
      this.$refs.playerbar.style.transition = "left 1s";
    },
    formatTooltip(val) {
      return val / 100;
    },
    closeplayer() {
      this.flog = false;
      this.$refs.playerbar.style.left = "2000px";
      this.$refs.playerbar.style.transition = "left 1s";
    },
    changeFlog(state) {
      this.flog = state;
    },
    changesong(state) {
      this.songstate = state;
    },
    //点击单曲+
    toggle(e, index) {
      if (e.target.classList.contains("_playOpenisA")) {
        e.target.classList.add("_playOpennotisA");
        e.target.classList.remove("_playOpenisA");
        e.target.parentElement.nextElementSibling.classList.remove("hide");
      } else {
        e.target.classList.add("_playOpenisA");
        e.target.classList.remove("_playOpennotisA");
        e.target.parentElement.nextElementSibling.classList.add("hide");
      }
    },
    //点击作品+
    toggleworks(e) {
      if (e.target.classList.contains("_playOpenisA")) {
        e.target.classList.add("_playOpennotisA");
        e.target.classList.remove("_playOpenisA");
        e.target.parentElement.nextElementSibling.classList.remove("hide");
      } else {
        e.target.classList.add("_playOpenisA");
        e.target.classList.remove("_playOpennotisA");
        e.target.parentElement.nextElementSibling.classList.add("hide");
      }
    },
    //播放暂停
    onPause() {
      this.playing = false;
    },
    //正在播放
    onPlaying() {
      this.playing = true;
    },
    // 开始播放
    startPlay() {
      this.$refs.audio.play();
      this.songplaying = true;
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause();
      this.songplaying = false;
    },
    //点击播放按钮
    toggleStatus() {
      if (this.audio.location == "") {
        for (var i = 0; i < this.$refs.clickplaymusic.length; i++) {
          this.$refs.clickplaymusic[0].click();
        }
      }
      if (this.playing) {
        this.pausePlay();
        this.$refs.play.style.backgroundPosition = "-280px 0";
      } else {
        this.startPlay();
        this.$refs.play.style.backgroundPosition = "-250px 0";
      }
    },
    onPlay(res) {
      this.playing = true;
    },
    playNext() {
      if (this.data.length > 0) {
        localStorage.setItem('imgindex', JSON.stringify(this.imgindex))
        console.log(this.imgindex)
        //单曲ID
        console.log(this.imgindex.trackId)
        //单曲来源
        console.log(this.imgindex.origin)
        //厂牌ID
        console.log(this.imgindex.catlabelId)
        //专辑ID
        console.log(this.imgindex.catalogueId)
        //时长
        console.log(Math.round(this.$refs.audio.currentTime))
        var durationtime=Math.round(this.$refs.audio.currentTime)
        //结束时间
        console.log(new Date().getTime())
        var endtime=new Date().getTime()
        //开始时间
        console.log(this.nowtime)
        playTrack({
          catalogueId:this.imgindex.catalogueId,
          catlabelId:this.imgindex.catlabelId,
          duration:durationtime,
          endTime:endtime,
          origin:this.imgindex.origin,
          startTime:this.nowtime,
          trackId:this.imgindex.trackId
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
        
        //专辑
        console.log('111')
        this.$refs.audio.currentTime = 0;
        // 是否有歌曲
        this.songnum = this.songnum + 1;
        if (this.data.length <= this.songnum) {
          this.songnum = 0;
        }
        worldaddress({
          trackId: this.data[this.songnum].trackId
        })
          .then(res => {
            this.audio.location = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    playprve() {
      if (this.data.length > 0) {
        this.$refs.audio.currentTime = 0;
        // 是否有歌曲
        this.songnum--;
        if (-1 >= this.songnum) {
          this.songnum = this.data.length - 1;
        }
        worldaddress({
          trackId: this.data[this.songnum].trackId
        })
          .then(res => {
            this.audio.location = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //播放的歌曲src
    playsingle(index, i) {
      console.log()



      this.songid = index.trackId;
      worldaddress({
        trackId: this.songid
      })
      .then(res => {
        this.audio.location = res.data;
        this.ispower=res.data;
        if(res.data==null){
          this.centerDialogVisible=true;
        }
      })
      .catch(err => {
        console.log(err);
      });
      // this.$refs.audio.autoplay=true
      
        console.log(index, i);
        // this.startPlay()
        this.time = index.timing;
        console.log(index);
        this.songnum = i;
        
        // this.songindex=i
        this.imgindex = this.data[this.songnum];
        console.log(this.imgindex);
        console.log(this.ispower)
      if(this.ispower!=null && this.ispower!=''){
        this.$refs.play.style.backgroundPosition = "-250px 0";
        this.songplaying = true;
      }
    },
    li() {
      ap.pause();
    },
    //当数据加载出错的时候
    loadError() {
      //alert("加载出错")
    },
    // 当数据加载到能播放时
    canPlaySong() {
      this.songplaying = true;
    },
    onloadedmetadata(res) {
      this.maxTime = parseInt(res.target.duration);
      // console.log(this.maxTime)
    },
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    //播放完毕
    endPlayNext() {
      if (this.hasrandom == false) {
        this.$refs.changnext.click();
      } else {
        var len = this.data.length;
        var randomBgIndex = Math.round(Math.random() * len);
        this.songnum = randomBgIndex;
        worldaddress({
          trackId: this.data[this.songnum].trackId
        })
          .then(res => {
            this.audio.location = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(index / 100 * this.maxTime);
    },
    changemuted(index) {
      this.$refs.audio.volume = index / 100;
    },
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      this.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(this.currentTime / this.maxTime * 100);
      localStorage.setItem('playercurrentTime', this.currentTime*1000)
    },
    formatProcessToolTip(index = 0) {
      index = parseInt(this.maxTime / 100 * index);
      return "进度条: " + realFormatSecond(index);
    },
    hidevolume() {
      this.volumeflog = false;
    },
    showvolume() {
      if (this.volumeflog) {
        //判断是否展开
        if (!this.volumemuted) {
          this.$refs.volumeplay.style.backgroundPosition = "-160px -98px";
          this.volumemuted = true;
          this.$refs.audio.muted = true;
        } else {
          this.$refs.volumeplay.style.backgroundPosition = "-160px -80px";
          this.volumemuted = false;
          this.$refs.audio.muted = false;
        }
      }
      this.volumeflog = true; //展开音量条
    },
    //防止点击冒泡 不能删
    stop() {},
    //单曲循环
    songloop() {
      this.modeListclass = !this.modeListclass;
      console.log(this.modeListclass);
      if (this.modeListclass) {
        this.chloop = false;
        this.$refs.modeList.title = "repeat all";
      } else {
        this.chloop = "loop";
        this.$refs.modeList.title = "repeat off";
      }
    },
    //随机播放
    songrandom() {
      this.hasrandom = !this.hasrandom;
    },
    //删除单曲
    songplaydel(i, index) {
      this.dataAll.splice(index, 1);
      this.resetSetItem("kuke", JSON.stringify(this.dataAll));
    },
    //删除作品
    workplaydel(v) {
      for (var i = this.dataAll.length - 1; i >= 0; i--) {
        if (this.dataAll[i].workId == v.workId) {
          this.dataAll.splice(i, 1);
        }
      }
      this.resetSetItem("kuke", JSON.stringify(this.dataAll));
    },
    //删除全部
    clearall() {
      this.resetSetItem("kuke", "{}");
      this.audio.location=""
    }
  },
  // watch:{
  //   data:{
  //      handler:function(val,oldval){
  //         this.imgindex=val[this.songnum];
  //         this.audio.location=''
  //         this.data=val;
  //       },
  //   }
  // },
  watch:{
    //动态监听 中间框的高度 
    clientHeight:function(val){
      this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight =this.clientHeight - 343; //减去页面上固定高度heigh
      this.$refs.playBoxTemp.style.height = this.curHeight + "px";
    },
    "audio.location":function(){
      this.nowtime=new Date().getTime()
      this.$emit('child',this.nowtime)
      localStorage.setItem('imgindex', JSON.stringify(this.imgindex))
      localStorage.setItem('playertime', this.nowtime)
    }
  },
  mounted() {
    const that=this;
    //监听window.onresize事件
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.documentElement.clientHeight
        that.clientHeight = window.clientHeight
      })()
    }
    //初次进来设置设置中间框的高度 播放器的位置
    this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.curHeight =this.clientHeight - 343; //减去页面上固定高度heigh
    this.$refs.playBoxTemp.style.height = this.curHeight + "px";

    this.data = JSON.parse(localStorage.getItem("kuke"));
    this.dataAll = JSON.parse(localStorage.getItem("kuke"));
    if(this.data!=null){
        for (var i = 0; i < this.data.length; i++) {
          for (var j = i + 1; j < this.data.length; j++) {
            if (
              this.data[i].work.trackGroupId == this.data[j].work.trackGroupId
            ) {
              this.data[j].work = [];
            }
          }
        }
        for (var i = 0; i < this.data.length; i++) {
          for (var j = i + 1; j < this.data.length; j++) {
            if (
              this.data[i].catalogue.catalogueName ==
              this.data[j].catalogue.catalogueName
            ) {
              this.data[j].catalogue = [];
            }
          }
        }
        this.imgindex = this.data[0];
      }
    //在safir浏览器中不播放
    ["mousedown", "touchstart"].forEach(function(name) {
      window.addEventListener(name, function _mousedown() {
        function audioAutoPlay() {
          var musicEle0 = document.getElementById("audioPlay");
          musicEle0.src = "data:audio/mp3;base64,";
          musicEle0.play();
        }
        audioAutoPlay();
        window.removeEventListener(name, _mousedown);
      });
    });
  }
};
</script>
<style>
.hid {
  display: none;
}
#slidebar {
  min-width: 1007px;
  width: 100%;
  top: 40px;
  left: 2000px;
  /* display: none; */
  position: fixed;
  z-index: 2;
  background: #fff;
  /* height:100%; */
}
.tra {
  left: 0px !important;
  transition: left 1s !important;
}
.closetra {
  left: 2000px !important;
  transition: left 1s !important;
}
.trahid {
  left: 2000px;
  transition: right 1s !important;
}
._playmain {
  background: #fff;
  /* margin-left: 150px; */
  padding-left: 150px;
  position: relative;
}
._playmain .slide2 {
  position: absolute;
  width: 29px;
  height: 68px;
  top: 50%;
  left: 120px;
  margin-top: -34px;
  cursor: pointer;
}

._title {
  display: inline-block;
  /* height: 60px;
  line-height: 60px; */
  margin-top: 20px;
  font-size: 25px;
}
._playButton {
  display: inline-block;
  float: right;
}
.playbackbtn {
  overflow: hidden;
  padding-top: 30px;
  padding-bottom: 20px;
}
.playbackbtn img:hover {
  cursor: pointer;
}
._playButton01 {
  width: 80px;
  color: #666666;
  background: #fff;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 24px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
  border: 1px solid #999999;
}
._playButton01:hover {
  width: 80px;
  color: #fff;
  background: #b53448;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 24px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
}
._playAlbum {
  height: 40px;
  background: #f5f5f5;
  color: #000;
  font-weight: 600;
  line-height: 40px;
  font-size: 14px;
}
._playAlbum img {
  width: 40px;
  height: 40px;
  vertical-align: top;
  padding-right: 18px;
}
.aplayer {
  height: 200px;
}

.playQueueBtn {
  display: inline-block;
  width: 60px;
  color: #fff;
  text-align: center;
  margin-left: 30px;
  background: #b53448;
  border-radius: 5px;
  outline: none;
  border: none;
  line-height: 25px;
  height: 25px;
  cursor: pointer;
  font-size: 20px;
}

.playQueue_tit {
  font-weight: 600;
}
._playOl {
  display: flex;
  width: 100%;
  min-height: 40px;
  border-bottom: 1px solid #f5f5f5;
  color: #666666;
  align-items: center;
}
._playOl li:nth-of-type(1) {
  width: 40px;
}
._playOl li:nth-of-type(2) {
  width: 40px;
}
.playQueue_tit ._playNum {
  width: 40px;
  text-align: center;
}
._playOl li:nth-of-type(3) {
  flex: 1;
}
.playQueue_tit ._playDown {
  font-size: 16px;
  color: #000;
  display: table;
  width: 100%;
  table-layout: fixed;
}
.vsHidden {
  visibility: hidden;
}
._playPlaying {
  display: table-cell;
  width: 24px;
  height: 40px;
  cursor: pointer;
  background: url(../assets/icon-playPlaying.png) no-repeat 0px center;
}
._playOpen {
  display: table-cell;
  width: 24px;
  height: 40px;
  cursor: pointer;
}
._playOpenisA {
  background: url(../assets/icon-listadd.png) no-repeat 0px center;
}
._playOpennotisA {
  background: url(../assets/playlistdelet.png) no-repeat 0px center;
}
._playWorks {
  display: table-cell;
  font-size: 14px;
  padding-left: 20px;
  line-height: 40px;
}

.eps {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playQueue_tit ._playInfo {
  font-weight: normal;
}
.blue {
  color: #bd475a;
}
._playName {
  display: table-cell;
  width: 60px;
  text-align: center;
  padding-left: 4px;
}
._playDel {
  display: table-cell;
  width: 40px;
  text-align: center;
  cursor: pointer;
}
._playInfo {
  /* display: none; */
  line-height: 18px;
  margin-left: 70px;
  margin-bottom: 10px;
  font-size: 14px;
  margin-top: -10px;
}
.aplayer-pic {
  width: 200px !important;
  height: 200px !important;
}
.aplayer .aplayer-body .aplayer-info {
  height: 182px !important;
}
.hide {
  display: none;
}
audio {
  width: 200px;
  height: 200px;
}

/* 播放器的css */

.grid-music-container {
  width: 100%;
  height: 200px;
  padding-top: 15px;
  background-color: #ddd;
  display: flex;
  position: relative;
  box-shadow: -5px 0px 10px Rgba(0, 0, 0, 0.1);
}

.grid-music-container .u-cover {
  width: 150px;
  height: 150px;
  padding: 0 15px 15px;
}
.grid-music-container .u-cover img {
  width: 150px;
  height: 150px;
}
.grid-music-container .m-music-play-wrap {
  height: 150px;
  width: calc(100% - 200px);
  margin-right: 20px;
}
.grid-music-container .m-now-info {
  width: auto;
  height: 110px;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
}
.eps {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.grid-music-container .m-now-info .u-artist {
  height: 44px;
  font-size: 16px;
  font-weight: normal;
  overflow: hidden;
}
.grid-music-container .brand {
  display: flex;
  font-weight: normal;
}

/* 播放的按钮 */
.grid-music-container .m-btn {
  min-width: 690px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.u-play-btn {
  background: url(../assets/music_icons.png) -220px 0 no-repeat;
}
.m-play-controls01 a,
.m-play-controls02 a {
  display: inline-block;
  vertical-align: middle;
}
.u-play-btn.mode-random {
  background-position: -201px -80px;
}
.m-play-controls02 {
  width: 20px;
  height: 18px;
  clear: both;
  margin: 0 20px;
}
.u-play-btn.mode {
  width: 20px !important;
  height: 18px !important;
  margin-right: 10px !important;
  float: left;
}

.m-play-controls01 {
  font-size: 0;
  width: 135px;
  white-space: nowrap;
}
.u-play-btn.prev {
  -webkit-transform: rotate(-180deg);
  transform: rotate(-180deg);
}
.u-play-btn.prev,
.u-play-btn.next {
  background-position: -220px 0;
}
.m-play-controls01 .u-play-btn,
.m-play-controls02 .u-play-btn {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 15px;
  cursor: pointer;
}
.u-play-btn.paused {
  background-position: -280px 0;
}
.u-play-btn.modeListoff,
.u-play-btn.mode-list {
  background-position: -181px -98px;
}

.grid-music-container .m-now-controls .u-surplusTime {
  display: inline-block;
  font-size: 12px;
  margin-right: 10px;
  color: #585957;
}
.grid-music-container .m-now-controls .u-control {
  display: inline-block;
  vertical-align: middle;
}
.grid-music-container .m-now-controls .u-time {
  margin-left: 10px;
  font-size: 12px;
  color: #585957;
}
.grid-music-container .m-now-controls .u-process {
  width: 170px;
}
.grid-music-container .m-now-controls .u-volume {
  overflow: visible;
  text-align: center;
  position: relative;
  margin-left: 20px;
  width: 18px;
  height: 18px;
}
.grid-music-container .u-volume .volume-control {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(../assets/music_icons.png) -160px -80px no-repeat;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
}
.grid-music-container .u-volume .volume-process.show {
  visibility: visible;
}
.grid-music-container .u-volume .volume-process {
  height: 50px;
  left: -13px;
  position: absolute;
  top: -60px;
  cursor: pointer;
  visibility: hidden;
}
.kukewave {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  background: url(../assets/kukewave01.png) no-repeat;
}
.kukewavegif {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  background: url(../assets/kukewave.gif) no-repeat;
}
.u-control .slider .el-slider__button {
  width: 9px;
  height: 9px;
  border: 1px solid #b53448;
}
.u-control .slider .el-slider__bar {
  background-color: #b53448;
}
.u-volume .el-slider__button {
  width: 9px;
  height: 9px;
  border: 1px solid #b53448;
}
.u-volume .el-slider__bar {
  background-color: #b53448;
}
.u-play-btn.modeSingleon {
  background-position: -221px -80px;
}
.u-play-btn.mode-random.current {
  background-position: -241px -80px;
}
.slide-bordcast {
  position: fixed;
  top: 111px;
  right: 85px;
  margin-top: -6px;
  z-index: 20;
  cursor: pointer;
  width: 100px;
  height: 50px;
  background: red;
}
.playerdialogse .el-dialog__headerbtn{
  font-size: 0px;
}
.playerdialogse .el-button:focus,.playerdialogse .el-button:hover {
    color: #fff;
    border-color: #b53448;
    background-color: #b53448;
}
.playerdialogse .el-button{
    color: #fff;
    border-color: #b53448;
    background-color: #b53448;
}
/* https://connect.qq.com/widget/shareqq/index.html?
url=http%3A%2F%2Fkml.kuke.com%2Fcatalogue%2FC5354&desc=%E2%99%AA%E6%88%91%E6%AD%A3%E5%9C%A8%E6%94%B6%E5%90%AC%E4%B8%93%E8%BE%91%EF%BC%88%E6%9D%A5%E8%87%AA%40%E5%BA%93%E5%AE%A2%E9%9F%B3%E4%B9%90%EF%BC%89&title=BRAUNFELS%2C%20W.%3A%20Phantastische%20Erscheinungen%20eines%20T&pics=https%3A%2F%2Fcdn.naxosmusiclibrary.com%2Fsharedfiles%2FImages%2Fcds%2Fothers%2FC5354.gif&site=%E5%BA%93%E5%AE%A2%E9%9F%B3%E4%B9%90 */
</style>
