<template>
  <div class="myplaylists">
    <div class="tab-left">
      <div class="tab-list">
        <a href="#" class="eps" @click="changelist(1)" :class='{tablistclass:floag1}'>{{ $t("lang.Trackfolders")}}</a>
        <a href="#" class="eps" @click="changelist(2)" :class='{tablistclass:floag2}'>{{ $t("lang.Cataloguefolders")}}</a>
      </div>
      <div class="folders-list">
        <p class="addKukeFolder"><el-button type="text" @click="addKukeFolder()">+&nbsp;{{$t('lang.Add')}}</el-button></p>
        <el-dialog
          :title="$t('lang.Addnewtrackfolder')"
          :visible.sync="centerDialogVisible"
          width="30%"
          center class="addlist">

          <el-dialog
            width="30%"
            title="创建成功"
            :visible.sync="innerVisible"
            append-to-body>
          </el-dialog>
          <input type="text" class="newinput" :placeholder="$t('lang.Trackfoldername')" v-model="singleclip">
          <p class="meglist">{{msg}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="Preservation()">{{$t('lang.Save')}}</el-button>
            <el-button @click="centerDialogVisible = false">{{$t('lang.Cancel')}}</el-button>
          </span>
        </el-dialog>
        <ul ref="listname">
          <li v-for="(i,index) in folderlistid" :key="index" @click="folderlistclick(i.id,index)" :class="{active:num==index}" data-name=i.id  v-trigger>
            <p class="eps">{{i.foldername}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab-right">
        <!-- 详情和操作 -->
        <div class="kukelogo">
            <div class="kukePic">
              <!-- {{folderinfoid.foldername}} -->


                <img :src="folderinfoimg" alt="" v-if="folderinfoimg!='' && folderinfoimg!=null && folderinfoid!=null && folderid!=''" >
                <img src='../../assets/icon-error.png' v-if="folderinfoid==null || imgid==''">
                <!-- <img :src="['//cdn.naxosmusiclibrary.com/sharedfiles/Images/cds/others/'+imgid+'.gif']" alt="" v-if="imgid!=''&& imgid!=null && folderid!='' && folderinfoimg==''"> -->
      
                <!-- <span class="kukeLoadPic" ></span> -->
                <el-button type="text" @click="dialogupload = true" class="kukeLoadPic"></el-button>
                <el-dialog
                :title="$t('lang.Editcover')"
                :visible.sync="dialogupload"
                width="30%"
                center
                >

                <el-upload
                  action="http://Upload.kuke.com/v2upload"
                  :on-success="handleAvatarSuccess"
                  :auto-upload="false" 
                  :show-file-list="false"
                  width="100%"
                  ref="upload"
                  :data="upLoadData"
                  :on-change='changeUpload'
                  center
                >
                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                  <div class="gouptop" style="width:100%">
                      <el-button class="goup">{{$t('lang.upload')}}</el-button>
                      <div class="gouptext">{{$t('lang.Supporttype')}}</div>
                  </div>
                  <div class="goupbottom">
                    <img v-if="fileraw" :src="fileraw" class="avatar">
                    <img v-else src="../../assets/empty-album.png">
                  </div>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogupload = false">{{$t('lang.Cancel')}}</el-button>
                  <el-button type="primary" @click="submitUpload">{{$t('lang.Save')}}</el-button>
                </span>
              </el-dialog>
            </div>                
            <div class="kukeInfo" v-if="folderinfoid!=null">
                <p class="kukeName">
                    <input type="text" v-model="foldernameinput" id="trackfloder" :placeholder="folderinfoid.foldername" :disabled="disabled" />
                    <span id="trackSpan" @click="changename()" :class="{hide:trackSpanflog}"></span>
                    <span class="kukeSetup" id="updateFolderNameSubmit" :class="{hide:updateflog}" @click="namepreserve()">{{$t('lang.Save')}}</span>
                    <span class="kukeSetup" id="updateFolderNameCancel" :class="{hide:updateflog}" @click="namecancel()">{{$t('lang.Cancel')}}</span>
                </p>
                    <p class="kukeSetupDate"><span>{{$t('lang.Createtime')}}:{{folderinfoid.createDate}}</span></p>
                    <ul>
                      <li class="trackAddToPlay" @click="addplaysong()"></li>
                      <li class="trackAddToPlayQueue" @click="Addplayqueue()">{{$t('lang.Addtoplayqueue')}}</li>
                      <el-button type="text" >
                        <li class="addToFolder" v-show='changelistid==1' @click="Addtrackfolder()">{{$t('lang.Addtotrackfolder')}}</li>
                        <li class="addToFolder" v-show='changelistid==2' @click="Addcataloguefolder()">{{$t('lang.Addtocataloguefolder')}}</li>
                      </el-button>
                      <el-dialog :visible.sync="dialogVisible" width="30%" center class="song1">
                        <span>{{$t('lang.selectcatalogue')}}</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false">{{$t('lang.Close')}}</el-button>
                        </span>
                      </el-dialog>
                      <el-dialog :title="$t('lang.Addtotrackfolder')" :visible.sync="dialogFormsongs" center class="songchose">
                        <el-form :model="form"> 
                          <el-form-item label="" >
                            <el-select  :placeholder="$t('lang.Selectfolder')" v-model="songsvalue" @change="selectchange" value-key="id">
                              <el-option :value="$t('lang.NewFolder')" key="1"></el-option>
                              <el-option v-for="i in folderlistid"  :value="i" :key="i.id" :label="i.foldername"></el-option> 
                            </el-select>
                          </el-form-item>

                          <el-form-item :label="$t('lang.Addnewcataloguefolder')"   v-show="songsflog">
                            <el-input  autocomplete="off" v-model="creatsongs"></el-input>
                          </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="addlistsong()">{{$t('lang.Save')}}</el-button>
                          <el-button @click="dialogFormsongs = false">{{$t('lang.Cancel')}}</el-button>
                        </div>
                      </el-dialog>

                      <el-dialog :title="$t('lang.Addtocataloguefolder')" :visible.sync="dialogFormVisible" center class="songchose">
                        <el-form :model="form"> 
                          <el-form-item label="" >
                            <el-select  placeholder="$t('lang.Selectfolder')" v-model="value" @change="selectchange" value-key="id">
                              <el-option :value="$t('lang.NewFolder')" key="1"></el-option>
                              <el-option v-for="i in folderlistid"  :value="i" :key="i.id" :label="i.foldername"></el-option> 
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
                      <li class="deleteFolder" @click="deletefolder()">{{$t('lang.Deletefolder')}}</li>
                    </ul>
            </div>
        </div>
        <!-- Track folders单曲夹的内容-->
        <div class="selected-playing" v-show='changelistid==1'>
            <p class="selected">Selected Playing Time : <b> 00:00:00</b></p>
        </div>
        <!-- 专辑    1单曲夹子  2 唱片夹子-->
        <el-table :data="foldercataloguelistid" v-show='changelistid==2' @selection-change="changecatalogue">
          <!-- 多选 -->
          <el-table-column type="selection" width="30" align="center"></el-table-column>
          <!-- 播放图片 -->
          <el-table-column width="50" align="center">
            <template slot-scope="scope">
              <img src="../../assets/icon-playlistplay.png" alt>
            </template>
          </el-table-column>
          <!-- no -->
          <el-table-column type="index" width="50" align="center" label="No."></el-table-column>
           <!-- 歌曲名称 -->
          <el-table-column :label=" $t('lang.Cataloguename') " prop="catalogue.catalogueName">
            <template slot-scope="scope">
                <span @click="go_catalogue(scope.row.catalogue.catalogueId)" class="cataloguecul">{{scope.row.catalogue.catalogueName}}</span>
            </template>
          </el-table-column>
          <el-table-column :label=" $t('lang.duration') " width="100" align="center" prop="catalogue.totalTime"></el-table-column>
          <el-table-column align="center" :label="$t('lang.delect')" width="100">
              <template slot-scope="scope">
                  <img src="../../assets/spritekuke_03.png" @click="delectsource(scope.row)">
              </template>
          </el-table-column>
      </el-table>
      <!-- 单曲  -->
      <el-table :data="folderfolderlistid" v-show='changelistid==1' @selection-change="changeFun">
          <el-table-column type="selection" width="30" align="center" v-model="track"></el-table-column>
          <el-table-column width="50" align="center">
            <template slot-scope="scope">
              <img src="../../assets/icon-playlistplay.png" alt>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50" align="center" label="No."></el-table-column>
          <el-table-column :label=" $t('lang.TracksTitle') " v-if="changelistid=='1'">
            <template slot-scope="scope">
              <p>{{scope.row.track.trackTitle}}</p>
            </template>
          </el-table-column>
          <el-table-column :label=" $t('lang.duration') " width="100" align="center" prop="catalogue.totalTime">
            <template slot-scope="scope">
              <p>{{scope.row.track.timing}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('lang.delect')" width="100">
              <template slot-scope="scope">
                  <img src="../../assets/spritekuke_03.png" @click="delectsource(scope.row)">
              </template>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {folderadd,folderlist,folderinfo,foldercataloguelist,folderupdate,folderdelete,foldersourcedelete,folderfolderlist,foldertrackadd,foldercatalogueadd,worldtracks,worldtrack,folderimgupdate,folderfoldermd5key,uploadc} from "../../api/api"
import plupload from "plupload";
import axios from 'axios'
export default {
  data() {
    return {
      centerDialogVisible: false,
      playlistData: [],
      multipleSelection: [],
      foldercataloguelistid:[],
      folderfolderlistid:[],
      //单曲
      singleclip:'',
      floag1:true,
      floag2:false,
      changelistid:1,
      innerVisible:false,
      msg:'',
      folderlistid:[],
      num:0,
      folderid:'',
      folderinfoid:[],
      fristid:'',
      //编辑
      trackSpanflog:false,
      //保存开关
      updateflog:true,
      //input 禁用
      disabled:true,
      //input的model
      foldernameinput:'',
      //点击照片的弹框
      dialogupload:false,
      dialogVisible:false,
      track:'',
      checkit:'',
      dialogFormsongs:false,
      value:'',
      songsvalue:'',
      songsflog:true,
      creatsongs:'',
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
      culflog:true,
      changecatalogueid:'',
      dialogFormVisible:false,
      creatfolder:'',
      cataloguesong:'',
      dataAll:'',
      catalogueaddsong:'',
      newadd:'',
      imageUrl: '',
      md5str:'',
      type:'',
      fileraw:'',
      filers:'',
      upLoadData: {
        md5str: "bb73cfaf2af9a20c3c0d46260be4dd97", 
        type: "new_photo",
        upfile:'111'
      },
      headers : {
        "Content-Type": "multipart/form-data"
      },
      folderinfoimg:'',
      imgid:'',
    };
  },
  directives:{
    trigger:{
      inserted(el,binging){
        //  console.log(el.dataset.name)
      }
    }
  },
  methods: {
    changeUpload: function(file, fileList) {
      this.fileraw=URL.createObjectURL(file.raw)
      this.filers=file.raw
     },
    submitUpload() {

      /* FormData 是表单数据类 */
      var fd = new FormData();
     
      /* 把文件添加到表单里 */
      fd.append('md5str',this.md5str);  //添加图片信息的参数
      fd.append('type',this.type);  //添加其他参数
      
      fd.append("upfile", this.filers)
      // fd.append("upfile", document.getElementById("upfile").files[0]);
      // console.log( document.getElementById("upfile").files[0])

      // var imgUrl =window.URL.createObjectURL(document.getElementById("upfile").files[0]);

      // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        const instance=axios.create({
          withCredentials: true
        }) 
        //本地
        // instance.post('/upload', fd).then(res=>{
        //线上
        instance.post('http://upload.kuke.com/v2upload', fd).then(res=>{
          //console.log(res.data.url)
          //this.modifyurl=res.data.url

          // console.log(this.folderid)
          // console.log(this.changelistid)
          // console.log(res.data.url)
          console.log(res.data.url)
          folderupdate({
            folderId:this.folderid,
            type:this.changelistid,
            imgUrl:res.data.url
          }).then(c=>{
            console.log(c)
            this.dialogupload = false
            this.folderinfofun()
          }).catch(err=>{
            console.log(err)
          })
          
        })  

        // console.log(this.modifyurl)
        // console.log('333')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    folderimgupdatefun(){
      folderimgupdate({
        
      }).then(res=>{

      }).catch(err=>{

      })
    },
    folderfoldermd5keyfun(){
      folderfoldermd5key({
        folderId:this.folderid
      }).then(res=>{
        this.md5str=res.data.md5str;
        this.type=res.data.type;
      }).catch(err=>{
        console.log(err)
      })
    },
    addKukeFolder(){
      this.centerDialogVisible = true
      this.msg=""
      this.singleclip=""
    },
    //点击单曲夹 和 唱片夹
    changelist(index){
      this.num=0;
      // this.$refs.listname.firstElementChild.click()
      this.changelistid=index;
      if(this.changelistid==1){
        this.floag1=true
         this.floag2=false
      }else if(this.changelistid==2){
        this.floag1=false
         this.floag2=true
      }
      this.folderlistfun()
      //详情
      console.log(this.folderid)
      this.folderid=''
    },
    //夹子专辑列表
    foldercataloguelistfun(){
      foldercataloguelist({
        folderId:this.folderid
      }).then(res=>{
        this.foldercataloguelistid=res.data
        // if(res.data!=''){
        //   this.imgid=res.data[res.data.length-1].sourceId
        // }
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },
    //创建的左侧list的数据
    folderlistfun(){
      folderlist({
        // product:'world',
        type:this.changelistid,
        // userId:'17319452535'
      }).then(res=>{
        console.log(res.data)
        this.folderlistid=res.data
        if(res.data!=''){
          //获取第一个夹子的id
          this.folderid=res.data[0].id
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //单曲详情的数据
    folderinfofun(){
      console.log(this.folderid)
      folderinfo({
        folderId:this.folderid
      }).then(res=>{
        this.folderinfoid=res.data
        if(res.data!=null){
          if(res.data.imgurl!=null){
            this.folderinfoimg=res.data.imgurl.slice(21)
          }else{
            this.folderinfoimg=null
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //单曲的类表的数据
    folderfolderlistfun(){
      folderfolderlist({
        folderId:this.folderid
      }).then(res=>{
        this.folderfolderlistid=res.data
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },
    //点击list
    folderlistclick(i,index){
      this.num=index
      this.folderid=i;
      this.folderinfofun()
      this.folderfoldermd5keyfun()
      if(this.changelistid==2){
        this.foldercataloguelistfun()
      }else if(this.changelistid==1){
        this.folderfolderlistfun()
      }
    },
    //点击弹框确认保存
    Preservation(){
      folderadd({
        folderName:this.singleclip,
        // product:'world',
        type:this.changelistid,
        // userId:'17319452535'
      }).then((res)=>{
        this.msg=res.msg
        if(this.msg=='成功'){
          this.innerVisible = true
          // this.setInt=setInterval(()=>{
            this.innerVisible = false
            this.centerDialogVisible = false
          // },2000)
          this.folderlistfun()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //点击修改
    changename(){
      this.trackSpanflog=true
      this.updateflog=false
      this.disabled=false
    },
    //点击修改保存名字
    namepreserve(){
      folderupdate({
        folderId:this.folderid,
        folderName:this.foldernameinput,
        // product:'world',
        type:this.changelistid,
        // userId:'17319452535'
      }).then(res=>{
        this.folderlistfun()
        this.trackSpanflog=false
        this.updateflog=true
        this.disabled=true
      }).catch(err=>{
        console.log(err)
      })
    },
    //点击修改取消
    namecancel(){
      this.trackSpanflog=false
      this.updateflog=true
      this.disabled=true
    },
    //删除夹子
    deletefolder(){
      folderdelete({
        folderId:this.folderid,
      }).then(res=>{
        this.folderlistfun()
      }).catch(err=>{
        console.log(err)
      })
    },
    //删除专辑
    delectsource(row,id){
      this.sourceid=row.id
      foldersourcedelete({
        ids:this.sourceid
      }).then(res=>{
        console.log(res)
        this.foldercataloguelistfun()
        this.folderfolderlistfun()
      }).catch(err=>{
        console.log(err)
      })
    },
    requestData() {
    },
    //添加到播放列表
    // Addplayqueue(){
      // if(){

      // }
      // window.changeFlog(true);
    // },
    //添加到单曲夹子
    Addtrackfolder(){
      if(this.checkit==''){
        this.dialogVisible=true
      }
       if(this.checkit!=""){
          this.dialogFormsongs=true
       }
    },
    //添加到唱片夹
    Addcataloguefolder(){
      if(this.changecatalogueid==''){
        this.dialogVisible=true
      }
      if(this.changecatalogueid!=""){
          this.dialogFormVisible=true
       }
    },
    changeFun (val) {
        this.checkit = val// 返回的是选中的列的数组集合
        // this.num=""
        // for (let i = 0; i < this.multipleSelection.length; i++) {
        //     this.num+=this.multipleSelection[i].favouriteid+",";
        // }
        //console.log(this.num)
        
    },
    changecatalogue(val){
      if(this.changelistid=='2'){
        this.changecatalogueid=val
        console.log(val);
      }
    },
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
    addlistsong(){
      this.dialogFormsongs=false
      this.everysongs=''
      for(var i=0;i<this.checkit.length;i++){
        this.everysongs+=this.checkit[i].fileName+'|'+this.checkit[i].trackId+'|'+this.checkit[i].origin+','
      }
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
    addlist(){
      this.dialogFormVisible = false
      this.sourceIds=''
      for(var i=0;i<this.changecatalogueid.length;i++){
        this.sourceIds+=this.changecatalogueid[i].catalogue.catalogueId+'|'+this.changecatalogueid[i].origin+','
      }
      //创建
      folderadd({
        folderName:this.creatfolder,
        type:'2',
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      //添加
      foldercatalogueadd({
        folderId:this.value.id,
        sourceIds:this.sourceIds,
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    go_catalogue(i){
      this.$router.push({
          name: "detail",
          params: { id:i}
      });
    },
    addplaysong(){
      window.changeFlog(true);
      if(this.changelistid=='1'){
        this.com=''
        if(this.checkit==''){
          for (let i = 0; i < this.folderfolderlistid.length; i++) {
            this.com+=this.folderfolderlistid[i].trackId+",";
          }
        }
        for (let i = 0; i < this.checkit.length; i++) {
          this.com+=this.checkit[i].trackId+",";
        }
        worldtracks({
          artistInclude: true,
          catalogueInclude:true,
          workInclude:true,
          trackIds:this.com
        })
        .then(res => {
            // this.worldtracksid=res.data
            // this.$store.commit('frist',res.data[0].trackId)
            this.resetSetItem('kuke', JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(err);
        });
      }
      if(this.changelistid=='2'){ 
        for(let i = 0; i < this.changecatalogueid.length; i++){
          worldtrack({
            catalogueId: this.changecatalogueid[i].catalogue.catalogueId,
          }).then(res => {
              for(var v=0;v<res.data.length;v++){
                 this.cataloguesong+=res.data[v].trackId+','
              }
              console.log(this.cataloguesong)
          }).catch(err => {
            console.log(err);
          });
        }
        setTimeout(() => {
          worldtracks({
            artistInclude: true,
            catalogueInclude:true,
            workInclude:true,
            trackIds:this.cataloguesong
          })
          .then(res => {
              this.resetSetItem('kuke', JSON.stringify(res.data));
          })
          .catch(err => {
            console.log(err);
          });
        },500)
      }
    },
    //添加到播放列表
    Addplayqueue(){
      //当为单曲夹子
      if(this.changelistid=='1'){
        //如果单曲夹子有选中的
        if(this.checkit!=''){
          window.changeFlog(true);
          this.addtoplay=''
          //给选中的重新添加变量名（避免选中的数据消失）
          this.newcheckmodel=JSON.parse(JSON.stringify(this.checkit));

          //删除与播放器列表里重复的数据
          for(var i=0;i<this.dataAll.length;i++){
            for(var j=0;j<this.newcheckmodel.length;j++){
                if(this.dataAll[i].trackId == this.newcheckmodel[j].trackId){
                    this.newcheckmodel.splice(j,1);
                }
            }
          }
          //循环 得到trackid
          for (let i = 0; i < this.newcheckmodel.length; i++) {
            this.addtoplay+=this.newcheckmodel[i].trackId+",";
          }
          if(this.addtoplay!=''){
            worldtracks({
              artistInclude: true,
              catalogueInclude:true,
              workInclude:true,
              trackIds:this.addtoplay
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
              console.log(res.data)
            })
            .catch(err => {
              console.log(err);
            });
          }
        }
      }
      //当为唱片夹
      if(this.changelistid=='2'){
        if(this.changecatalogueid!=''){
          for(let i = 0; i < this.changecatalogueid.length; i++){

            worldtrack({
              catalogueId: this.changecatalogueid[i].catalogue.catalogueId,
            }).then(res => {
                for(var v=0;v<res.data.length;v++){
                  this.catalogueaddsong+=res.data[v].trackId+','
                }
               
            }).catch(err => {
                console.log(err);
            });

          }
          
          setTimeout(() => {
            this.arrcheckcount=this.catalogueaddsong.substring(0,this.catalogueaddsong.length-1).split(",")

           
            if(this.dataAll!=''){
               for(var i=0;i<this.dataAll.length;i++){
                for(var j=0;j<this.arrcheckcount.length;j++){
                    if(this.dataAll[i].trackId == this.arrcheckcount[j]){
                        this.arrcheckcount.splice(j,1);
                    }
                }
              }
            }

            for(let i = 0; i < this.arrcheckcount.length; i++){
                this.newadd=this.arrcheckcount.join(',')
            }
            console.log(this.newadd=='')
            console.log(this.newadd)
            if(this.newadd!=''){
              worldtracks({
                  artistInclude: true,
                  catalogueInclude:true,
                  workInclude:true,
                  trackIds:this.newadd
              })
              .then(res => {
                  this.dataAll=JSON.stringify(this.dataAll)
                  if(this.dataAll == "{}"){
                      var newdata=res.data
                  }else{
                      var newdata=JSON.parse(this.dataAll).concat(res.data);
                  }
                  this.resetSetItem('kuke', JSON.stringify(newdata));
                  window.changeFlog(true);
              })
              .catch(err => {
                  console.log(err);
              });
            }
          },500)
        }
      }
    },
  },
  created(){
     window.addEventListener('setItem', ()=> {
        this.dataAll=JSON.parse(localStorage.getItem("kuke"))
     })
  },
  mounted() {
    this.dataAll=JSON.parse(localStorage.getItem("kuke"))
    this.requestData();
    // this.folderinfofun();
    this.folderlistfun()
  },
  watch:{
    folderlistid(val){
      // this.$refs.listname.firstElementChild.click()
      this.folderinfofun()
      this.folderfoldermd5keyfun()
      if(this.changelistid==2){
        this.foldercataloguelistfun()
      }else if(this.changelistid==1){
        this.folderfolderlistfun()
      }
    },
    foldercataloguelistid(val){
      // console.log('12121212')
      console.log(val)
      // console.log(val.length-1)
      if(val.length==0){
        this.imgid=''
        this.folderinfoimg=''
      }else{
        this.imgid=val[val.length-1].sourceId
      }
      
    },
  }
};
</script>

<style>
.myplaylists {
  margin-top: 10px;
  clear: both;
  overflow: hidden;
}
.myplaylists .tab-left {
  color: #666666;
  width: 17%;
  min-height: 573px;
  font-size: 14px;
  float: left;
  background: #fff;
}
.myplaylists .tab-left .tab-list {
  height: 40px;
  padding-top: 30px;
  margin-bottom: 10px;
}
.myplaylists .tab-left .tab-list a {
  width: 50%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  background: #edeff0;
  cursor: pointer;
  float: left;
}
.myplaylists .tab-left .tab-list .tablistclass {
  background: #fff;
  color: #b53448;
  display: inline-block;
}
.myplaylists .tab-left .folders-list .addKukeFolder {
  display: inline-block;
  width: 60px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  background: #b53448;
  border-radius: 5px;
  text-align: center;
  outline: none;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;
}
.myplaylists .tab-left .folders-list .eps {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  cursor: pointer;
}
.myplaylists .tab-left .folders-list .eps:hover,
.myplaylists .tab-left .folders-list .active {
  border-left: 2px solid #b53448;
  background: #f7f9fa;
}
.myplaylists .tab-right {
  float: left;
  width: 83%;
  min-height: 573px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 30px 30px;
  border-left: 20px solid #fafafa;
}
.myplaylists .tab-right .cataloguecul{
  cursor: pointer;
}
.myplaylists .tab-right .cataloguecul:hover{
    color:#cc3d55;
}
.kukeSetup{
	display:inline-block;
	width: 60px;
    height: 25px;    
    line-height: 25px;
    color: #fff;
    background: #cc3d55;
    border-radius: 5px;
    text-align:center;
    outline: none;
    border: none;
	margin-bottom:20px;
	cursor:pointer;
}
.kukelogo{
	width:100%;
	height:160px;
    padding-top: 55px;
    border-bottom: 1px solid #e6e6e6;
    display:table;
}
.kukelogo .kukePic{
	display:table-cell;
	width:160px;
	height:160px;
	position:relative;
	vertical-align:top;
}
.kukelogo .kukePic img{
	width:160px;
	height:160px;
}
.kukelogo .kukePic .kukeLoadPic{
    display: block;
    width: 25px;
    height: 20px;
    background: url(../../assets/sprite26.png) no-repeat;
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
}
.kukelogo .kukePic .kukeLoadPic:hover{
	background-position: -24px 0;
  border:none;
}
.kukelogo .kukeInfo{
	display:table-cell;
	width:auto;
	min-width:543px;
}
.kukelogo .kukeInfo p{
	height:40px;
	line-height:40px;
	padding-left:30px;
}
.kukelogo .kukeInfo .kukeName input{
	display:inline-block;
	width:200px;
	height:25px;
	line-height:25px;
	overflow:hidden;
	text-overflow:ellipsis;
    white-space:nowrap;
    background: none;
    outline: none;
    border: none;
}
.kukelogo .kukeInfo .kukeName span:nth-of-type(1){
	display: inline-block;
    width: 20px;
    height: 18px;
    background: url(../../assets/sprite27.png) no-repeat;
    margin-top: 4px;
    cursor: pointer;
    vertical-align: middle;
}
.kukelogo .kukeInfo .hide{
  display: none!important;
}
.kukelogo .kukeInfo .kukeName span:hover{
    background-position: -20px 0;
}
.kukelogo .kukeInfo ul li{
	display:inline-block;
    vertical-align: top;
	width:auto;
	height:28px;
	line-height:28px;
	padding-left:28px;
	margin-right:10px;
	margin-left:30px;
	margin-top:30px;
	cursor:pointer;
}
.kukelogo .kukeInfo ul .el-button{
  padding:0
}
.kukelogo .kukeInfo ul .el-button--text{
  color:#000
}
.kukelogo .kukeInfo ul .addToFolder{
  background:url(../../assets/spritekuke_02.png) no-repeat 0 0;
}
.kukelogo .kukeInfo ul .trackAddToPlay{
  	background:url(../../assets/sprite06.png) no-repeat center -28px;
}
.kukelogo .kukeInfo ul .song1 .dialog-footer .el-button{
  padding:12px 20px;
}
.kukelogo .kukeInfo ul .song1 .dialog-footer .el-button--primary {
    color: #FFF;
    background-color: #b53448;
    border-color: #b53448;
}
.kukelogo .kukeInfo ul .trackAddToPlayQueue{
  background:url(../../assets/spritekuke_01.png) no-repeat 0 0;
}
.kukelogo .kukeInfo ul .deleteFolder{
  background:url(../../assets/spritekuke_03.png) no-repeat 0 0;
}
/* .kukelogo .kukeInfo ul li:nth-child(2){
background:url(../../assets/spritekuke_01.png) no-repeat 0 0;
} */
/* .kukelogo .kukeInfo ul li:nth-child(3){
background:url(../../assets/spritekuke_02.png) no-repeat 0 0;
} */
/* .kukelogo .kukeInfo ul li:nth-child(4){
background:url(../../assets/spritekuke_03.png) no-repeat 0 0;
} */
.kukeAlbum_img{
	display:table-cell;
	width:60px;
	height:60px;
	padding-right:10px;
}
.kukeAlbum_img>img{
	width:100%;
	height:100%;
}
.kukeTrackTitle{
	display:table-cell;
	width:auto;
	vertical-align:middle;
}
.selected-playing {
	height:50px;
	line-height:50px;
	background:#eeeff1;
	line-height:50px;
	border-bottom:2px solid #fff;
	overflow:hidden;
}
/* elementUI 统一修改 */
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #b53448;
    border-color: #b53448;
}
/* .el-checkbox__input.is-focus .el-checkbox__inner,.el-checkbox__inner:hover {
    border-color: #b53448;
} */
/* 弹出框 */
.newinput{
  width:80%;
  height:30px;
  margin-left:10%;
  border:1px solid #b53448;
  border-radius: 5px;
  padding-left:10px;
}
.myplaylists .folders-list .el-button--primary{
  background-color: #b53448!important;
  border-color: #b53448!important;
  color:#fff!important;
}
.myplaylists .folders-list .addKukeFolder .el-button{
  padding:0;
}
.myplaylists .folders-list .addKukeFolder .el-button--text{
  color:#fff;
}
.myplaylists .folders-list .addlist .el-button:hover {
  color: #606266;
  border-color:#DCDFE6;
  background-color: #fff;
}
.myplaylists .folders-list .el-dialog__headerbtn{
  font-size:0;
}
.myplaylists .meglist{
  padding-left:10%;
}
body.el-loading-parent--hidden{
    overflow:auto!important;
}
/* body{
  padding-right: 0!important
} */
.kukelogo .kukeInfo ul .songchose .el-select{
  width:100%
}
.kukelogo .kukeInfo ul .songchose .el-button--primary{
  background-color: #b53448!important;
  border-color: #b53448!important;
  color:#fff!important;
}
.kukelogo .kukeInfo ul .songchose .el-button{
  padding:12px 20px;
}
.kukelogo .kukeInfo ul .songchose .el-button:hover {
  color: #606266;
  border-color:#DCDFE6;
  background-color: #fff;
}
.kukelogo .kukeInfo ul .songchose .el-select .el-input.is-focus .el-input__inner,.el-input__inner:focus {
    border-color: #b53448!important;
}
.kukelogo .kukeInfo ul .songchose .el-select-dropdown__item.selected{
    color: #b53448;
}
.kukelogo .kukePic .gouptop{
  overflow: hidden
}
.kukelogo .kukePic .gouptop .goup{
  float: left;
  width: 85px;
  height: 25px;
  font-size: 12px;
  color: #fff;
  background: #b53448;
  border-radius: 5px;
  border: none;
  line-height:25px;
  padding-top:2px;
}
.kukelogo .kukePic .el-button--primary{
  background-color: #b53448;
  border-color: #b53448;
}
.kukelogo .kukePic .el-button--primary:hover{
  color:#fff
}
/* .kukelogo .kukePic .el-button:focus, .el-button:hover{
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
} */
.kukelogo .kukePic .gouptop .gouptext{
  /* width:383px; */
}
.kukelogo .kukePic .el-upload{
  width:100%
}
</style>s
