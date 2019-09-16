<template>
    <div class="main" id="main">
        <div class="playlistsadd list">
            <div class="playlistadd-navtit">
                    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">{{$t('lang.lefterhome')}}</el-breadcrumb-item>
                        <el-breadcrumb-item>Naxos</el-breadcrumb-item>
                        <el-breadcrumb-item>管弦乐</el-breadcrumb-item>
                    </el-breadcrumb> -->
            </div>
            <div class="playlists-left">
                <!-- 专辑图片 -->
                <div class="playlists-leftImg" v-if="worldcatalogueid.cover200=='' && worldcatalogueid.cover200==0 || worldcatalogueid.origin=='naxos'" @click="showbigmig()">
                    <img v-bind:src="['//cdn.naxosmusiclibrary.com/sharedfiles/Images/cds/others/'+worldcatalogueid.catalogueId+'.gif']" alt="" />
                </div>
                <!-- 专辑icon -->
                <div class="playlist-naxoslogo">
                    <img  v-bind:src="['https://naxosmusiclibrary.com/sharedfiles/images/labels/s_'+worldcatalogueid.catlabelId+'.gif']" alt="">
                </div>
                <ul class="playlists-type">
                    <!-- booklet -->
                    <li>
                        <span v-if="worldcatalogueid.bookletFileName!=''">
                            <a :href="['//www.naxosmusiclibrary.com/sharedfiles/booklets/'+worldcatalogueid.catlabelId+'/'+worldcatalogueid.bookletFileName]" target="_blank">
                            <img src="../../assets/icon-pdf.png" alt="">{{$t("lang.Booklet")}}
                            </a>
                        </span>
                        <span v-else-if="worldcatalogueid.bookletFileName==''">
                            <a href="javascript:;" target="_blank" class="no">
                                <img src="../../assets/icon-pdf.png" alt="">{{$t("lang.Booklet")}}
                            </a>
                        </span>
                    </li>
                    <!-- backcover -->
                    <li>
                        <span v-if="worldcatalogueid.backCoverFileName!=''">
                            <a :href="['//cdn.naxosmusiclibrary.com/sharedfiles/pdf/rear/'+worldcatalogueid.backCoverFileName]" target="_blank">
                            <img src="../../assets/icon-pdf.png" alt="">{{$t("lang.Backcoverimage")}}</a>
                        </span>
                        <span v-else-if="worldcatalogueid.backCoverFileName==''">
                            <a href="javascript:;" target="_blank" class="no">
                                <img src="../../assets/icon-pdf.png" alt="">{{$t("lang.Backcoverimage")}}
                            </a>
                        </span>
                    </li>
                    <!-- play video -->
                    <li>
                        <a id="playVideoBtn" class="no" href="javascript:;" target="_blank">
                        <img src="../../assets/icon-video.png" alt="">{{$t("lang.PlayVideo")}}</a>
                    </li>
                    <!-- podcast -->
                    </ul>
                <div class="album-tit" style="border-bottom:none">
                    <!-- Itunes download -->                               
                    <li id="buyCata-no" class="no" upc="747313403677" labeltype="O">Buy and Download</li>
                    <li id="buyCata" style="visibility: hidden" upc="747313403677" labeltype="O">Buy and Download</li>
                </div>
                <div class="playlist-apple" style="visibility: hidden">
                    <img class="buyCataImg" upc="747313403677" src="/static/images/icon-apple.png" alt="">
                </div>
                
                <div class="album-tit">{{$t("lang.AlbumInformation")}}</div>
                <ul class="album-type">
                    <!-- category -->
                    <!-- composer -->
                    <li>{{$t("lang.Composers")}}:
                            <br>
                            <span>
                                <a v-for="(i,index) in worldcomposerid" :key="index" @click="go_tocomposer(i.personId)" href="javascript:;">{{i.fullName}}</a>
                            </span>
                        </li>
                    <!-- lyricist -->
                    <li v-if="worldlyricistsid!=''">
                        {{$t("lang.Lyricists")}}:
                        <br>
                        <span>
                            <a v-for="(i,index) in worldlyricistsid" :key="index" @click="go_tocomposer(i.personId)" href="javascript:;">{{i.fullName}}</a>
                        </span>
                    </li>
                    <!-- arranger -->
                    <li v-if="worldarrangersid!=''">
                        {{$t("lang.Arrangers")}}:
                        <br>
                        <span>
                            <a v-for="(i,index) in worldarrangersid" :key="index" @click="go_tocomposer(i.personId)" href="javascript:;">{{i.fullName}}</a>
                        </span>
                    </li>
                    <!-- artist -->
                    <li>
                            {{$t("lang.Artists")}}:
                            <br>
                            <span>
                                <a href="javascript:;" v-for="(i,index) in worldartistid" :key="index+'2'" @click="go_toartists(i.personId)">{{i.fullName}}</a>
                            </span>
                        </li>
                    <!-- catlabel -->
                    <li>{{$t("lang.labels")}}:
                      <span> 
                        <a href="javascript:;" @click="go_liblist(worldcatalogueid.catlabelId)">{{worldcatalogueid.catlabelDisplayName}}</a>
                      </span>
                    </li>
                    <!-- catalogueid -->
                    <li>{{$t("lang.CatalogueNo")}}: <span class="othercolor">{{worldcatalogueid.catalogueId}}</span></li>
                    <!-- release date -->
                    <li>{{$t("lang.ReleaseDate")}}: <span class="othercolor releaseDate">2019-3-01</span> </li>
                    </ul>
            </div>
            <div class="playlists-right">
                <div class="playlist-text">
                    <div class="song-tit">{{worldcatalogueid.catalogueName}}</div>
                    <!-- show static url -->
                    <div class="song-con" v-show="worldcatalogueid.blurbFileName!=''">
                        <div class="song-text">
                            <div id="wrap" :class="{showcon:flagdetail}">
                                <p v-if="worldcatalogueid.blurbFileName!=''">
                                    Johann Sebastian Bach’s <em>St Matthew Passion </em>is widely recognised as one of the greatest masterpieces in Western sacred music. With its double orchestra and chorus this is a work of enormous proportions in every sense, and Bach was extremely resourceful in treading a fine line between creating the almost operatic spectacle valued by the secular authorities in Leipzig, and the elevated religious atmosphere sought by the clergy. This inspired mix of moving drama and theological discourse led Leonard Bernstein to declare that ‘there is nothing like it in all of music’.</p><div id="gradient"></div>
                            </div>
                            <div id="read-more" @click="show" v-if="worldcatalogueid.blurbFileName!=''">
                                <a href="javascript:void(0)" class="moreBtn" style="color: #55a5d7;" v-if="flagdetail">... 展开</a>
                                <a href="javascript:void(0)" class="moreBtn" style="color: #55a5d7;" v-else>... 关闭</a>
                            </div>
                        </div>
                    </div>
                    <div class="song-play" >
                      <div class="songplayimg" @click="bordcast()">
                        <img src="../../assets/iconsmallplay.png" alt="">&nbsp;&nbsp;  {{$t('lang.Play')}}
                      </div>
                        <!-- <a id="addPlayList"><img src="../../assets/icon-songplay.png" alt=""></a> -->
                    </div>
                    <div class="song-add">
                        <div class="selectAll">
                            <span class="pic_checked" :class="{pic_checked_on:changeAll}">
                                <input type="checkbox" class="checked_init" v-model="checkedAll" @click="selectAll($event)" id="quan">
                            </span>
                            <span class="text-all" v-show="Choice">{{$t("lang.SelectAll")}}</span>
                            <span class="text-all" v-show="!Choice">{{$t("lang.CancelAll")}}</span>
                            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
                        </div>
                        <div class="detalls">
                            {{$t('lang.ArtistDetails')}}
                            <img src="../../assets/icon-listadd.png" alt="" @click="allpull()" v-show="flage">
                            <img src="../../assets/playlistdelet.png" alt="" @click="allpull()" v-show="!flage">
                        </div>
                        <div class="playlists-icon">
                            <!-- cata add to folder -->
                            <span class="cata-add" v-if="cooklogin!='ip'">
                                <el-button type="text" @click="addFolder()">
                                  <img id="cataAddToFolder" src="../../assets/spritekuke_02.png" alt="" :title="$t('lang.Addtocataloguefolder')">
                                </el-button>
                                <el-dialog :title="$t('lang.Addtocataloguefolder')" :visible.sync="dialogFormVisible" center>
                                  <el-form :model="form"> 
                                    <el-form-item label="" >
                                      <el-select  :placeholder="$t('lang.Selectfolder')" v-model="value" @change="selectchange" value-key="id">
                                        <el-option :value="$t('lang.NewFolder')" key="1"></el-option>
                                        <el-option v-for="i in floderlist"  :value="i" :key="i.id" :label="i.foldername"></el-option> 
                                      </el-select>
                                    </el-form-item>

                                    <el-form-item :label="$t('lang.Addnewcataloguefolder')"   v-show="culflog">
                                      <el-input  autocomplete="off" v-model="creatfolder"></el-input>
                                    </el-form-item>

                                  </el-form>
                                  <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="addlist()">{{$t('lang.Save')}}</el-button>
                                    <el-button @click="dialogFormVisible = false">{{$t('lang.Cancel')}}</el-button>
                                  </div>
                                </el-dialog>           
                            </span>
                            <span class="cata-add" v-if="cooklogin=='ip'">
                              <el-button type="text" @click="showlogin()">
                                  <img id="cataAddToFolder" src="../../assets/spritekuke_02.png" alt="" :title="$t('lang.Addtocataloguefolder')">
                              </el-button>
                            </span>
                            <!-- favorite -->
                            <span class="addfavourites" v-if="cooklogin!='ip'">
                                <el-button type="text"  @click="addfavourit()">
                                  <img src="../../assets/icon-addfavourite.png" alt="" :title="$t('lang.AddtoFavourites')" v-show="imgflog">
                                  <img src="../../assets/collect.png" alt="" v-show="!imgflog">
                                </el-button>
                            </span>
                            <span class="addfavourites" v-if="cooklogin=='ip'">
                                <el-button type="text"  @click="showlogin()">
                                  <img src="../../assets/icon-addfavourite.png" alt="" :title="$t('lang.AddtoFavourites')">
                                </el-button>
                            </span>

                            <!-- track add to folder -->
                            <span class="add" v-if="cooklogin!='ip'">
                                <el-button type="text" @click="addsongs()">
                                  <img id="trackAddToFolder" src="../../assets/favourite-iconadd.png" alt="" :title="$t('lang.Addtotrackfolder')">
                                </el-button>
                                <el-dialog
                                  :visible.sync="nochoose"
                                  width="30%"
                                  center>
                                  <span>{{$t('lang.selectcatalogue')}}</span>
                                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="nochoose = false" type="primary">{{$t('lang.Close')}}</el-button>
                                  </span>
                                </el-dialog>

                                <el-dialog :title="$t('lang.Addtotrackfolder')" :visible.sync="dialogFormsongs" center>
                                  <el-form :model="form"> 
                                    <el-form-item label="" >
                                      <el-select  :placeholder="$t('lang.Selectfolder')" v-model="songsvalue" @change="selectchange" value-key="id">
                                        <el-option :value="$t('lang.NewFolder')" key="1"></el-option>
                                        <el-option v-for="i in floderlistsongs"  :value="i" :key="i.id" :label="i.foldername"></el-option> 
                                      </el-select>
                                    </el-form-item>

                                    <el-form-item :label="$t('lang.addnewsong')"   v-show="songsflog">
                                      <el-input  autocomplete="off" v-model="creatsongs"></el-input>
                                    </el-form-item>

                                  </el-form>
                                  <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="addlistsong()">{{$t('lang.Save')}}</el-button>
                                    <el-button @click="dialogFormsongs = false">{{$t('lang.Cancel')}}</el-button>
                                  </div>
                                </el-dialog>   
                            </span>
                            <span class="add" v-if="cooklogin=='ip'">
                              <el-button type="text" @click="showlogin()">
                                  <img id="trackAddToFolder" src="../../assets/favourite-iconadd.png" alt="" :title="$t('lang.Addtotrackfolder')">
                                </el-button>
                            </span>
                            <!-- share -->
                            <span class="share">
                                <el-button type="text" @click="sharesongs()">
                                  <img src="../../assets/favourite-iconshare.png" alt="" :title="$t('lang.share')">
                                </el-button>
                                <el-dialog
                                  :visible.sync="sharechoice"
                                  width="30%"
                                  center>
                                  <div class="shareImg">
                                      <img src="../../assets/share_qq.png" alt="" @click="shareTo('qq')">
                                      <img src="../../assets/share_wechat.png" alt="" @click="shareTo('wx')">
                                      <el-button type="text" @click="shareTo('blog')">
                                        <img src="../../assets/share_blog.png" alt="" >
                                      </el-button>
                                      <img src="../../assets/share_qqSpace.png" alt="" @click="shareTo('qqSpace')">
                                  </div>
                                  <span slot="footer" class="dialog-footer">
                                    <el-button @click="sharechoice = false" type="primary" class="shareclose">{{$t('lang.Cancel')}}</el-button>
                                  </span>
                                </el-dialog>
                                <el-dialog
                                  :visible.sync="wechat"
                                  width="30%"
                                  center class="wode">
                                  <p>{{$t('lang.OpenWeChat')}}</p>
                                  <div class="shareImg" id="canvas">
                                      <div ref='test' ></div>
                                  </div>
                                </el-dialog>
                            </span>
                            <!-- add to play queue -->
                            <span>
                                <a id="add_music_tolist"><img src="../../assets/favourite-iconsong.png" alt="" :title="$t('lang.Addtoplayqueue')" @click="addtolist()"></a>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- 单曲循环开始 --> 
                <div class="playlist-list">
                    <!-- 专辑 -->
                    <div v-for="(v,val) in worldtrackgroupid" :key="val+'5'">
                        <div class="list-title">
                            <a class="composer" href="javascript:;" v-for="(i,index) in v.composers" :key="index">{{i.fullName}}</a>
                        </div>
                        <!-- 作品 -->
                        <div class="list-con cata-work-title">
                            <div class="check trackSel">
                                <!-- <span class="110301-track pic_checked worknum-track pic_checked_on">
                                    <input type="checkbox" v-model="checkcom" @change="changestate" :value="v">
                                </span> -->
                            </div>
                            <div class="number fixed">
                                <!--  -->
                            </div>
                            <div class="button fixed songtoggle" @click="showsong($event)" ref='songref'>
                                <!-- <img src="../../assets/icon-listadd.png" alt="" class="playlist-listadd"> -->
                            </div>
                            <div class="track-wrap auto">
                                <div class="row">
                                    <div class="production trackTitle" trackid="3960174">»{{v.trackGroupTitle}}</div>
                                    <div class="playlistadd-details">
                                      <img src="../../assets/prompt.png" alt="" class="hint" @click="go_work(v.workId)">
                                    </div>
                                    <div class="time">{{v.timing}}</div>
                                </div>
                                <div class="list-artist" :class="{hide:flage}">
                                    <p v-for="(art,artindex) in v.artists" :key="artindex">
                                        <span @click="go_toartists(art.personId)">{{art.fullName}}</span>
                                        <a v-if="art.personType.personType=='Conductor'">-{{art.personType.personType}}</a>
                                    </p>
                                </div>
                                <div class="list-url">
                                    <p>null/stream.asp?s=null%2Fnull%2FFR7180_001</p>
                                </div>
                            </div>
                        </div>
                        <!-- 单曲 -->
                        <div class="list-con" v-for="(i,index) in worldtrackid" :key="index" v-if="v.trackGroupId==i.trackGroupId" >
                            <div class="check trackSel">
                                <span class="110301-track pic_checked worknum-track" :class="{pic_checked_on:changeAll}" ref='picchecked'>
                                    <input type="checkbox" class="checked_init checkedlist" v-model="checkmodel" :value="i"  @click="changestate($event,i,index)" >
                                </span>
                            </div>
                            <div class="number fixed">
                                <span class="num">{{i.trackNo}}</span>
                            </div>
                            <div class="button fixed songtoggle" @click="showsong($event)" ref='songref'>
                            </div>
                            <div class="track-wrap auto">
                                <div class="row">
                                    <div class="production trackTitle" trackid="3960174">»{{i.trackTitle}}</div>
                                    <div class="time">{{i.timing}}</div>
                                </div >
                                <div class="list-artist" :class="{hide:flage}">
                                    <p v-for="(p,t) in i.artists" :key="t"><span @click="go_toartists(p.personId)">{{p.fullName}}</span></p>
                                </div>
                                <div class="list-url">
                                    <p>null/stream.asp?s=null%2Fnull%2FFR7180_001</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div id="wechat-pop">
              <div class="overLay"></div>
              <div class="winmain">
                  <p class="winpicbtn cf"><a href="javascript:void(0);" title="关闭" class="tcCloseBtn"></a></p>
                  <div class="winpic">
                      <p>打开微信“扫一扫”，网页打开后点击屏幕右上角分享按钮</p>
                      <div id="divweixinimg"><canvas width="200" height="200"></canvas></div>
                  </div>
              </div>
            </div> -->
        </div>
        <!-- <player :mess="flog"></player> -->
        <div id="maxImageShow" v-show="imgshow">
            <div class="overLay"></div>
            <div class="winmain">
                <p class="winpicbtn cf"><a href="javascript:void(0);" class="tcCloseBtn" @click="imgclose()"></a></p>
                <div class="winpic" v-if="worldcatalogueid.cover200=='' && worldcatalogueid.cover200==0 || worldcatalogueid.origin=='naxos'" @click="showbigmig()">
                    <img v-bind:src="['//cdn.naxosmusiclibrary.com/sharedfiles/Images/cds/hires/'+worldcatalogueid.catalogueId+'.jpg']" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import login_foot from "../../components/login_foot";
import player from "../../components/player"
import bus from '../../bus.js'
import QRCode from 'qrcodejs2'  
import storage from 'good-storage'
import {
  worldcatalogue,
  worldcomposer,
  worldartist,
  worldtrack,
  worldtrackgroup,
  worldtracks,
  favouriteadd,
  folderlist,
  foldercatalogueadd,
  folderadd,
  foldertrackadd,
  favouritecheck,
  favouritedelect,
  worldaddress
} from "../../api/api";
export default {
  data() {
    return {
      activeNames: ["1"],
      flagdetail: true,
      catalogueid: "",
      num:[],
      worldcatalogueid: [],
      worldcomposerid: [],
      worldartistid: [],
      worldlyricistsid: [],
      worldarrangersid: [],
      worldtrackid: [],
      worldtrackgroupid:[],
      flage:true,
      checkAll: false,
      isIndeterminate: false,
      checkedCities: [],
      com:'',
      worldtracksid:[],

      checkedAll:[],
      checkmodel:[],
      checkcom:[],
      flog:false,
      imgflog:true,
      msg:"",
      value:'',
      songsvalue:'',
      id:'',
      // fristtrackId:'',

      //弹出文件夹的数据
      dialogFormVisible: false,
      dialogFormsongs:false,
      nochoose:false,
      form: {
        name: '1223434',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      floderlist:[],
      floderlistsongs:[],
      culflog:true,
      songsflog:true,
      creatfolder:'',
      creatsongs:'',
      changeAll:false,
      downicon:true,
      songstate:"-1",
      Choice:true,
      sharechoice:false,
      favouritecheckid:[],
      wechat:false,
      dataAll:[],
      cooklogin:'',
      imgshow:false,
      allchecked:'',
    };
  },
  components: {
    "login-foot": login_foot,
    "player":player
  },
  computed:{
    fristtrackId:function(){
      return this.$store.state.fristtrackId
    }
  },
  created(){
     window.addEventListener('setItem', ()=> {
        this.dataAll=JSON.parse(localStorage.getItem("kuke"))
     })
  },
  methods: {
    //点击厂牌
    go_liblist(i){
      this.$router.push({
        name:"label_list",
        params:{id:i,no:"All"}
      })
    },
    //点击播放添加到播放列表
    bordcast(){
      window.changeFlog(true)
      this.com=''
      if(this.checkmodel==''){
        for (let i = 0; i < this.worldtrackid.length; i++) {
            this.com+=this.worldtrackid[i].trackId+",";
        }
      }
      for (let i = 0; i < this.checkmodel.length; i++) {
          this.com+=this.checkmodel[i].trackId+",";
      }
      localStorage.setItem('index', 0);
      //储存的单曲
      worldtracks({
        artistInclude: true,
        catalogueInclude:true,
        workInclude:true,
        trackIds:this.com
      })
      .then(res => {
          this.worldtracksid=res.data
          this.$store.commit('frist',res.data[0].trackId)
          this.resetSetItem('kuke', JSON.stringify(res.data));
          bus.$emit('fristsong',res.data[0].trackId);
          this.$store.commit('iskuke',JSON.stringify(res.data))
          worldaddress({
            trackId:res.data[0].trackId
          })
          .then(res => {
              this.resetSetItem('songurl',res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
    },
    addtolist(){
       window.changeFlog(true)
       this.add=''
       this.allchecked=JSON.parse(JSON.stringify(this.worldtrackid));
       
       if(this.checkmodel==''){
          for(var i=0;i<this.dataAll.length;i++){
            for(var j=0;j<this.allchecked.length;j++){
                if(this.dataAll[i].trackId == this.allchecked[j].trackId){
                    this.allchecked.splice(j,1);
                }
            }
          }
          console.log(this.allchecked)
          console.log(this.worldtrackid)
          for(let i = 0; i < this.allchecked.length; i++){
            this.add+=this.allchecked[i].trackId+",";
          }
       }

        this.newcheckmodel=JSON.parse(JSON.stringify(this.checkmodel));
        for(var i=0;i<this.dataAll.length;i++){
          for(var j=0;j<this.newcheckmodel.length;j++){
              if(this.dataAll[i].trackId == this.newcheckmodel[j].trackId){
                  this.newcheckmodel.splice(j,1);
              }
          }
        }
        for (let i = 0; i < this.newcheckmodel.length; i++) {
          this.add+=this.newcheckmodel[i].trackId+",";
        }
        if(this.add!=''){
          worldtracks({
            artistInclude: true,
            catalogueInclude:true,
            workInclude:true,
            trackIds:this.add
          })
          .then(res => {
            console.log(this.dataAll)
            this.dataAll=JSON.stringify(this.dataAll)
            if(this.dataAll == "{}"){
              var newdata=res.data
            }else{
              var newdata=JSON.parse(this.dataAll).concat(res.data);
            }
            this.resetSetItem('kuke', JSON.stringify(newdata));
          })
          .catch(err => {
            console.log(err);
          });
        }
    },
    handleChange(val) {
      console.log(val);
    },
    show() {
      if (this.flagdetail == false) {
        this.flagdetail = true;
      } else {
        this.flagdetail = false;
      }
    },
    go_tocomposer(i) {
      this.$router.push({
        name: "composer_info",
        params: { id: i }
      });
    },
    go_toartists(i) {
      this.$router.push({
        name: "artist_info",
        params: { id: i }
      });
    },
    //点击作曲家详情+
    allpull(){
        if(this.flage==false){
            this.flage=true
            for(var i=0;i<this.$refs.songref.length;i++){
                this.$refs.songref[i].classList.add("songtoggle")
                this.$refs.songref[i].classList.remove("songnottoggle")
            }
        }else{
            this.flage=false
             for(var i=0;i<this.$refs.songref.length;i++){
                this.$refs.songref[i].classList.add("songnottoggle")
                this.$refs.songref[i].classList.remove("songtoggle")
            }
        }
    },
    //全选
    handleCheckAllChange(val){
        this.checkedCities = val ? this.num : [];
        this.isIndeterminate = false;
    },
    //单选
    handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.worldtrackid.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.worldtrackid.length;
        //console.log(value.length)
    },
    //点击单曲
    changestate(e,i,index){
      if(e.target.checked){
          e.target.parentElement.classList.add("pic_checked_on")
      }else{
         e.target.parentElement.classList.remove("pic_checked_on")
      }
    },
    //添加我的文件夹
    addFolder(){
      this.dialogFormVisible = true
    },
    //添加到我的喜欢
    addfavourit(){
      favouritecheck({
        catalogueId: this.catalogueid,
      }).then(res=>{
        this.favouritecheckid=res.data
        if(res.data!='0'){
          this.imgflog=false
        }
      }).catch(err=>{
        console.log(err)
      })
      this.shu=''
      for(var i=0;i<this.checkmodel.length;i++){
        this.shu+=this.checkmodel[i].trackId+','
      }
      if(this.checkmodel==''){
        for (let i = 0; i < this.worldtrackid.length; i++) {
          this.shu+=this.worldtrackid[i].trackId+",";
        }
      }
      console.log(this.shu)
      console.log(this.imgflog)
      if(this.imgflog==true){
        favouriteadd({
          catalogueId:this.catalogueid,
          catalogueName:this.worldcatalogueid.catalogueName,
          // product:'world',
          trackIds:this.shu,
          // userId:'17319452535'
        }).then(res=>{
          console.log(res.msg)
          this.msg=res.msg
          if(res.msg=='成功'){
            this.imgflog=false
            this.$alert('已添加到我的喜欢');
          }
        }).catch(err=>{
          console.log(err)
        })
      }else{
        console.log(this.favouritecheckid)
        favouritedelect({
            favouriteIds:this.favouritecheckid
        }).then((res)=>{
          console.log(res)
          if(res.msg=='成功'){
            this.imgflog=true
            this.$alert('已从我的喜欢中删除');
          }
        }).catch((err)=>{
            console.log(err)
        })
      }
    },
    //添加到单曲
    addsongs(){
      if(this.checkmodel.length==0){
        this.nochoose=true
      }else{
        this.dialogFormsongs=true
      }
    },
    sharesongs(){
      this.sharechoice=true
    },
    //select 改变
    selectchange(){
      if(this.value!='[新建夹子]'){
          this.culflog=false
      }else{
        this.culflog=true
      }
      if(this.songsvalue!='[新建夹子]'){
        this.songsflog=false
      }else{
        this.songsflog=true
      }
    },
    //添加文件夹弹框点击确定
    addlist(){
      this.dialogFormVisible = false
      this.sourceIds=this.catalogueid+'|'+this.worldcatalogueid.origin
      // for(var i=0;i<this.checkmodel.length;i++){
      //   this.sourceIds+=this.catalogueid+'|'+this.checkmodel[i].origin+','
      // }
      console.log(this.value.id)
      //创建
      folderadd({
        folderName:this.creatfolder,
        // product:'world',
        type:'2',
        // userId:'17319452535'
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      //添加
      foldercatalogueadd({
        folderId:this.value.id,
        sourceIds:this.sourceIds,
        // userId:'17319452535'
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    //添加单曲确定
    addlistsong(){
      this.dialogFormsongs=false
      this.everysongs=''
      for(var i=0;i<this.checkmodel.length;i++){
        this.everysongs+=this.checkmodel[i].fileName+'|'+this.checkmodel[i].trackId+'|'+this.checkmodel[i].origin+','
      }
      console.log(this.checkmodel)
      console.log(this.songsvalue.id)
      console.log(this.everysongs)
      //添加到单曲
      foldertrackadd({
        folderId:this.songsvalue.id,
        sourceIds:this.everysongs,
        // userId:'17319452535'
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      //创建
      folderadd({
        folderName:this.creatsongs,
        // product:'world',
        type:'1',
        // userId:'17319452535'
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    selectAll(e){
      if(e.target.checked){      
        //  this.changeAll=true
        this.Choice=false
        this.worldtrackid.forEach((el,i)=>{
            if(this.checkmodel.indexOf(el) == '-1'){ 
                this.checkmodel.push(el);
                var checkobj=document.querySelectorAll('.checkedlist');
                for(var i=0 ;i<checkobj.length;i++){
                  checkobj[i].parentElement.classList.add("pic_checked_on")
                }
            }
         })
      }else { // 全不选选则清空绑定的数组
        this.Choice=true
        this.checkmodel = [];
        // this.changeAll=false
        var checkobj=document.querySelectorAll('.checkedlist');
        for(var i=0 ;i<checkobj.length;i++){
          checkobj[i].parentElement.classList.remove("pic_checked_on")
        }
      }
    },
    showsong(e){
      if( e.target.classList.contains('songtoggle')){
          e.target.classList.add("songnottoggle")
          e.target.classList.remove("songtoggle")
          e.target.nextElementSibling.firstElementChild.nextElementSibling.classList.remove('hide')
       }else{
            e.target.classList.add("songtoggle")
            e.target.classList.remove("songnottoggle")
            e.target.nextElementSibling.firstElementChild.nextElementSibling.classList.add('hide')
       }
    },
    //点击！号跳转作品页面
    go_work(i){
      this.$router.push({
        name:"work",
        params: { id: i }
      })
    },
    //分享到qq
    shareTo(stype){
      var lk ='https://naxosmusiclibrary.com/sharedfiles/images/labels/s_'+this.worldcatalogueid.catlabelId+'.gif'
      if(stype == 'qq'){
        window.open('http://connect.qq.com/widget/shareqq/index.html?url='+'http://test-world.kuke.com'+'?sharesource=qzone&title='+this.worldcatalogueid.catalogueName+'&pics='+lk+'&desc=♪我正在收听专辑（来自@库客音乐）')
      }
      if(stype=='blog'){
        window.open('http://service.weibo.com/share/share.php?url='+'http://test-world.kuke.com'+'?sharesource=weibo&title='+this.worldcatalogueid.catalogueName+'&pic='+lk);
      }
      if(stype=='qqSpace'){
        window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+'http://test-world.kuke.com'+'?sharesource=qzone&title='+this.worldcatalogueid.catalogueName+'&pics='+lk);
      }
      if(stype == 'wx'){
        //设置属

        this.sharechoice=false
        this.wechat=true
        
        // this.$nextTick(() => {
        setTimeout(() => {
        //var canvas = document.getElementById('canvas')
        // var canvas=self.$refs.test()
        console.log(self.$refs)
        document.getElementById('canvas').innerHTML = ""
          new QRCode(canvas, {
            width: 200,  
            height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
            text: 'http://test-world.kuke.com', // 二维码内容  
          })
        }, 0)
          
        // })
      }
    },
    showlogin(){
      this.$store.commit("ishide", true);
    },
    showbigmig(){
      this.imgshow=true
    },
    imgclose(){
      this.imgshow=false
    }
  },
  watch:{
      checkmodel: {
        handler(){
            if(this.checkmodel.length == this.worldtrackid.length){
              document.querySelector('#quan').checked = true;
              document.querySelector('#quan').parentElement.classList.add("pic_checked_on")
            }else {
              document.querySelector('#quan').checked = false;
              document.querySelector('#quan').parentElement.classList.remove("pic_checked_on")
            }
        },
        deep: true
      }
  },
  mounted() {
    this.cooklogin = this.$cookies.get("_kuke_loginType");
    this.dataAll=JSON.parse(localStorage.getItem("kuke"))
    // this.wechat=false
    this.catalogueid = this.$route.params.id;
    // console.log(this.catalogueid)
    worldcatalogue({
      catalogueId: this.catalogueid
    })
      .then(res => {
        //console.log(res.data)
        this.worldcatalogueid = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    worldcomposer({
      catalogueId: this.catalogueid
    })
      .then(res => {
        this.worldcomposerid = res.data.composers;
        this.worldlyricistsid = res.data.lyricists;
        this.worldarrangersid = res.data.arrangers;
        //console.log(this.worldlyricistsid)
      })
      .catch(err => {
        console.log(err);
      });
      worldartist({
        catalogueId: this.catalogueid
      })
      .then(res => {
        this.worldartistid = res.data;
        //console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
    // 单曲
    worldtrack({
      catalogueId: this.catalogueid,
      artistInclude:true
    })
    .then(res => {
        this.worldtrackid = res.data;
        for (let i = 0; i < this.worldtrackid.length; i++) {
            this.num.push(this.worldtrackid[i].trackNo)
        }
    })
    .catch(err => {
    console.log(err);
    });
    //作品
    worldtrackgroup({
      catalogueId: this.catalogueid,
      personInclude:true
    })
    .then(res => {
        this.worldtrackgroupid = res.data;
        //console.log(res.data)
    })
    .catch(err => {
      console.log(err);
    });
    //我的夹子的弹框
    folderlist({
      // product:'world',
      type:'2',
      // userId:'17319452535'
    }).then(res=>{
      this.floderlist=res.data
      // console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
    //我的单曲的弹框
    folderlist({
      // product:'world',
      type:'1',
      // userId:'17319452535'
    }).then(res=>{
      this.floderlistsongs=res.data
      //console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })

    //检查是否选择我的喜欢
    if(this.cooklogin!='ip'){
      favouritecheck({
        catalogueId: this.catalogueid,
      }).then(res=>{
        this.favouritecheckid=res.data
        if(res.data!='0'){
          this.imgflog=false
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>
<style>
.container .main .playlistsadd {
  overflow: hidden;
  color: #666666;
  background: #fff;
  min-height: 594px;
  
}
.container .main .playlistsadd .playlistadd-navtit {
  line-height: 20px;
  padding: 20px 0 20px 30px;
}
.container .main .playlistsadd .playlists-left {
  float: left;
  width: 23%;
  padding-bottom: 60px;
}
.container .main .playlistsadd .playlists-left .playlists-leftImg {
  margin-left: 30px;
  text-align: center;
  position: relative;
  cursor: pointer;
  width: 200px;
  height: 200px;
}
.container .main .playlistsadd .playlists-left .playlists-leftImg::after {
  position: absolute;
  content: "";
  width: 24px;
  height: 26px;
  bottom: 0;
  right: 0;
  z-index: 2;
  /* background:url(../images/sprites-larger.png) no-repeat; */
}
.container .main .playlistsadd .playlists-left .playlists-leftImg img {
  width: 100%;
  height: 100%;
}
.container .main .playlistsadd .playlists-left .playlists-leftImg::after {
    position: absolute;
    content: "";
    width: 24px;
    height: 26px;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: url(../../assets/sprites-larger.png) no-repeat;
}
.container .main .playlistsadd .playlists-left .playlist-naxoslogo {
  height: 140px;
  width: 200px;
  margin-left: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container .main .playlistsadd .playlists-left .playlists-type li {
  height: 39px;
  line-height: 39px;
  border-bottom: 1px solid #e5e7ea;
  cursor: pointer;
  padding-left: 30px;
  font-size: 14px;
}
.container .main .playlistsadd .playlists-left .playlists-type .no {
  color: #999;
  cursor: not-allowed;
}
.container .main .playlistsadd .playlists-left .playlists-type .no:hover {
  color: #999;
}
.container .main .playlistsadd .playlists-left .playlists-type li:first-child {
  border-top: 1px solid #e5e7ea;
}
.container .main .playlistsadd .playlists-left .playlists-type li:hover {
  color: #55a5d7;
}
.container .main .playlistsadd .playlists-left .playlists-type li a {
  height: 39px;
  display: inline-block;
  width: 100%;
}
.container .main .playlistsadd .playlists-left .playlists-type li img {
  margin-right: 10px;
}
.container .main .playlistsadd .playlists-left .playlist-apple {
  height: 60px;
  line-height: 60px;
  text-align: center;
  width: 200px;
  margin-left: 30px;
}
.container .main .playlistsadd .playlists-left .playlist-apple img {
  cursor: pointer;
}

.container .main .playlistsadd .playlists-left .album-tit #buyCata-no.no {
  visibility: hidden;
  margin-top: -120px;
}
.container .main .playlistsadd .playlists-left .album-tit {
  height: 60px;
  line-height: 80px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7ea;
  padding-left: 30px;
}
.container .main .playlistsadd .playlists-left .album-type {
  /* word-break:break-all;
	word-wrap:break-word; */
}
.container .main .playlistsadd .playlists-left .album-type li {
  padding: 11px 0px 11px 30px;
  border-bottom: 1px dashed #e5e7ea;
  font-size: 14px;
}
.container .main .playlistsadd .playlists-left .album-type li span a {
  color: #b3364a;
}
.container .main .playlistsadd .playlists-left .album-type li .othercolor {
  color: #999999;
}

.container .main .playlistsadd .playlists-right {
  width: 72%;
  float: left;
  margin-left: 5%;
  margin-bottom: 60px;
}
.container .main .playlistsadd .playlists-right > p:first-child {
  margin-top: 80px;
  margin-bottom: 30px;
}
.container .main .playlistsadd .playlists-right > p {
  text-align: left;
  width: 60%;
  margin: 0 auto;
}
.container .main .playlistsadd .playlists-right > p > a {
  color: #55a5d7;
}
.container .main .playlistsadd .playlists-right .song-tit {
  font-size: 18px;
  font-weight: 600;
}
.container .main .playlistsadd .playlists-right .playlist-text {
  color: #666666;
}
.container .main .playlistsadd .playlists-right .playlist-text .song-play{
   margin: 20px 0 30px 0px;
}
.container .main .playlistsadd .playlists-right .playlist-text .songplayimg{
  background: #b3364a;
  width: 98px;
  height:30px;
  border-radius: 4px;
  line-height: 28px;
  text-align: center;
  color:#fff;
}
.container .main .playlistsadd .playlists-right .playlist-text .songplayimg:hover{
  background: #cc3d55;
  cursor: pointer;
}
.container .main .playlistsadd .playlists-right .playlist-text .selectAll {
  line-height: 18px;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  float:left
}
.container .main .playlistsadd .playlists-right .playlist-text .text-all {
  height: 18px;
  line-height: 18px;
  display: inline-block;
  margin-left: 15px;
}
.container .main .playlistsadd .playlists-right .playlist-text .song-tit {
  display: block;
  /* word-break:break-all;
	word-wrap:break-word; */
  margin-right: 40px;
}
.container .main .playlistsadd .playlists-right .playlist-text .song-url {
  font-weight: 600;
  line-height: 50px;
  margin-bottom: 10px;
}
.container .main .playlistsadd .playlists-right .playlist-text .song-url span {
  cursor: pointer;
}
.container .main .playlistsadd .playlists-right .playlist-text .song-url p {
  line-height: 20px;
}
.container .main .playlistsadd .playlists-right .playlist-text .song-url img {
  margin-right: 10px;
}
.container .main .playlistsadd .playlists-right .playlist-text .song-con {
  min-height: 60px;
  width: 100%;
  display: flex;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-text
  .song-con
  .song-text {
  flex: 1;
  width: 85%;
  height: 100%;
  line-height: 20px;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-text
  .song-con
  .song-play {
  width: 15%;
  text-align: center;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-text
  .song-con
  .song-play
  img {
  cursor: pointer;
}
.container .main .playlistsadd .playlists-right .playlist-text .song-add {
  height: 40px;
  background: #ffddcc;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-text
  .song-add
  .detalls {
  height: 40px;
  line-height: 40px;
  /* font-weight: 600; */
  color: #666666;
  padding-left: 20px;
  float: left;
}
/* .container
  .main
  .playlistsadd
  .playlists-right
  .playlist-text
  .song-add
  button {
  line-height: 27px;
  width: 82px;
  height: 24px;
  background: #55a5d7;
  color: #fff;
  border-radius: 5px;
  border: none;
} */

.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-text
  .song-add
  .playlists-icon {
  float: right;
  /* width:137px; */
  margin-top: -5px;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-text
  .song-add
  .playlists-icon
  img {
  margin: 0 6px;
  cursor: pointer;
}
.container .main .playlistsadd .playlists-right .playlist-list .disc {
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  color: #666666;
}
.container .main .playlistsadd .playlists-right .playlist-list .list-title {
  padding: 40px 0 15px 0;
  background: #fff;
  font-size: 14px;
  color: #fff;
  padding-left: 10px;
  border-bottom: 1px solid #e5e7ea;
}
.container .main .playlistsadd .playlists-right .playlist-list div:first-child .list-title{
  padding: 15px 0 15px 14px;
}

.container .main .playlistsadd .playlists-right .playlist-list .list-title a,
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-title
  a:hover {
  color: #000;
  font-weight: bold;
  cursor: pointer;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .cata-work-title {
  font-weight: 600;
}
.container .main .playlistsadd .playlists-right .playlist-list .list-con {
  width: 100%;
  display: table;
  border-bottom: 1px solid #e5e7ea;
  font-size: 14px;
  padding: 10px 0;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .check {
  display: table-cell;
  padding: 0 10px;
  width: 16px;
  cursor: pointer;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .number {
  display: table-cell;
  width: 13px;
  padding: 0 10px;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .button {
  display: table-cell;
  width: 18px;
  padding: 0px 5px 0px 10px;
  height:19px;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap {
  display: table-cell;
  width: auto;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .row {
  display: table;
  width: 100%;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .row
  .production {
  width: auto;
  display: table-cell;
  cursor: pointer;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .row
  .playlistadd-details {
  width: 20px;
  display: table-cell;
  cursor: pointer;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .row
  .time {
  width: 45px;
  padding: 0 10px;
  display: table-cell;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .list-artist {
  /* display: none; */
  height: auto;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .hide{
      display: none
  }
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .list-artist
  p {
  height: 15px;
  line-height: 15px;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .list-artist
  p
  span {
  color: #bd475a;
  cursor: pointer;
}
.container
  .main
  .playlistsadd
  .playlists-right
  .playlist-list
  .list-con
  .track-wrap
  .list-url {
  display: none;
}
.song-text .showcon {
  height: 40px;
  overflow: hidden;
}
.playlistsadd .playlists-icon .cata-add .el-select{
  width:100%
}
.playlistsadd .playlists-icon .add .el-select{
  width:100%
}

/* 添加到唱片夹弹出框 */
.playlistsadd .playlists-right .song-add .cata-add .el-button--primary{
  background-color: #b53448!important;
  border-color: #b53448!important;
  color:#fff!important;
}
.playlistsadd .playlists-right .song-add .cata-add .el-dialog__footer .el-button:hover {
  color: #606266;
  border-color:#DCDFE6;
  background-color: #fff;
}
.el-message-box__btns .el-button--primary{
  background-color: #b53448!important;
  border-color: #b53448!important;
  color:#fff!important;
}
.el-select-dropdown .el-select-dropdown__item.selected{
    color: #b53448;
}
.playlistsadd .playlists-right .song-add .cata-add .el-select .el-input.is-focus .el-input__inner,.el-input__inner:focus {
    border-color: #b53448!important;
}
/*添加到单曲的弹出框 */
.playlistsadd .playlists-right .song-add .add .el-button--primary{
  background-color: #b53448!important;
  border-color: #b53448!important;
  color:#fff!important;
}
.playlistsadd .playlists-right .song-add .add .el-dialog__footer .el-button:hover {
  color: #606266;
  border-color:#DCDFE6;
  background-color: #fff;
}
.playlistsadd .playlists-right .song-add .add .el-select .el-input.is-focus .el-input__inner,.el-input__inner:focus {
    border-color: #b53448!important;
}
.pic_checked {
    display: block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url(../../assets/sprite58.png) no-repeat 0px 0px;
}
.checked_init {
    opacity: 0;
    cursor: pointer;
    filter: alpha(opacity=0);
}
.pic_checked_on {
    background-position: -16px 0px;
}
.songtoggle{
  background: url('../../assets/icon-listadd.png') no-repeat
}
.songnottoggle{
  background: url('../../assets/playlistdelet.png') no-repeat
}
.shareImg{
  text-align: center;
}
.shareclose{
   background-color: #b53448!important;
   border-color: #b53448!important;
}
.shareImg img{
  display: inline!important;
}
body.el-popup-parent--hidden{
  overflow:auto!important;
}
body{
    padding-right: 0px!important;
}
.winmain {
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
}
.winpicbtn {
    width: 1100px;
    height: 42px;
    padding: 60px 0 30px;
    margin: 0 auto;
}
.tcCloseBtn {
    display: block;
    width: 22px;
    height: 42px;
    float: right;
    background: url(../../assets/wyn-sprite-close.png) no-repeat;
}
.container .main .playlistsadd .winpic {
    width: 500px;
    height: 500px;
}
.winpic img {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>



