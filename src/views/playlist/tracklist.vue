<template>
    <div class="con-playlists tracklist">
        <!-- <div class="playlists-catalog">
            <div class="catalog">
                <span>{{$t('lang.lefterhome')}}</span>&gt;
                <span>{{$t('lang.naxosPlaylists')}}</span>&gt;<span>{{worldplaylistinfoid.playlistName}}</span>
            </div>
        </div> -->
        <div class="member-playlist" id="folders-view">
            <p>
                <!-- <a href="/folder?category=nml&amp;folderId=58421" data-pjax=""> -->
                    <img src="../../assets/icon-back.png" alt="">{{$t('lang.FoldersView')}}
                <!-- </a> -->
            </p>
        </div>
        <div class="playlists-conLeft">
            <div class="floders-tits">
                <p>{{worldplaylistinfoid.playlistName}}</p>
                </div>
            <div class="floders-list">
                <input type="hidden" name="playlistId" id="playlistId" value="">
                <p>{{$t('lang.SequenceNo')}}:
                    <span>{{worldplaylistinfoid.site}}</span>
                </p>
                <p>{{$t('lang.author')}}:
                    <span>{{worldplaylistinfoid.author}}</span>
                </p>
                <p class="author">
                    <label>{{$t('lang.Remarks')}}:</label>
                    <span id="remarks">[Remarks here]</span>
                </p>
                <p>{{$t('lang.NumberofTracks')}}:
                    <span>{{worldplaylistinfoid.sorting}}</span>
                </p>
            </div>
        </div>
        <div class="playlists-conright">
            <div class="playlists-link">
                <p>{{worldplaylistinfoid.playlistName}}</p>
                <img src="../../assets/icon-foldersplay'.png" class="addMusicList" alt="">
                <img src="" alt="">
            </div>
            <div class="selected-playing">
                <p class="selected">{{$t('lang.SelectedPlayingTime')}} :
                    <b> 00:00:00</b>
                </p>
            </div>
           <el-table :data="playlisttracklistid">
               <el-table-column type="index" width="50" align="center" label="No."></el-table-column>
               <el-table-column width="50" align="center">
                    <template slot-scope="scope">
                        <img src="../../assets/icon-playlistplay.png" alt>
                    </template>
                </el-table-column>
               <el-table-column prop="trackTitle" :label="$t('lang.TracksTitle')"></el-table-column>
                <el-table-column prop="timing" :label="$t('lang.duration')" align="right"></el-table-column>
           </el-table>
        </div>
    </div>
</template>
<script>
import {worldplaylistinfo,playlisttracklist} from "../../api/api"
export default {
    data(){
        return{
            worldplaylistinfoid:[],
            playlisttracklistid:[]
        }
    },
    methods:{
        worldplaylistinfofun(){
            this.playlistId = this.$route.params.id;
            worldplaylistinfo({
                playlistId:this.playlistId
            }).then(res=>{
                this.worldplaylistinfoid=res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        playlisttracklistfun(){
            this.playlistId = this.$route.params.id;
            playlisttracklist({
                playlistId:this.playlistId
            }).then(res=>{
                this.playlisttracklistid=res.data
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.worldplaylistinfofun()
        this.playlisttracklistfun()
    }
}
</script>
<style>
.con-playlists {
    overflow: auto;
    background: #f7f9fa;
}
.tracklist .playlists-catalog {
    height: 42px;
    line-height: 42px;
    padding-left: 30px;
}
.tracklist .playlists-catalog .catalog {
    float: left;
    color: #999999;
}
.tracklist .member-playlist {
    height: 40px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 5px;
    line-height: 40px;
    padding-left: 23px;
}
.tracklist .member-playlist p {
    font-size: 14px;
    float: left;
    color: #b53448;
}
.tracklist .member-playlist p img {
    margin-right: 10px;
}
.tracklist .playlists-conLeft {
    /* margin-left: 30px; */
    background: #fff;
    min-height: 1097px;
    float: left;
    width: 28%;
}
.tracklist .playlists-conLeft .floders-list p {
    color: #54a4d5;
    min-height: 37px;
    border-bottom: 1px dashed #999999;
    line-height: 37px;
}
.tracklist .playlists-conLeft .floders-tits {
    /* width: 100%; */
    min-height: 24px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
}
.tracklist .playlists-conLeft .floders-tits>p {
font-size: 14px;
padding: 10px 40px 10px 20px;
font-weight: 600;
line-height: 24px;

}
.tracklist .playlists-conLeft .floders-list {
    margin: 0 20px;
}
.tracklist .playlists-conLeft .floders-list p {
    color: #b53448;
    min-height: 37px;
    border-bottom: 1px dashed #999999;
    line-height: 37px;
}

/* 右侧的css */
.tracklist .playlists-conright {
    width: 66%;
    margin-right: 30px;
    float: right;
    background: #fff;
}
.tracklist .playlists-conright .playlists-link {
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: 600;
    padding-left: 20px;
}
.tracklist .playlists-conright .playlists-link p {
    float: left;
}
.tracklist .playlists-conright .playlists-link img {
    float: right;
    margin-right: 10px;
    line-height: 50px;
    margin-top: 10px;
    cursor: pointer;
}
.tracklist .selected-playing {
    height: 50px;
    line-height: 50px;
    background: #eeeff1;
    line-height: 50px;
    border-bottom: 2px solid #fff;
    overflow: hidden;
}
.tracklist .playlists-conright .selected-playing .selected {
    margin-left: 20px;
    color: #666666;
    float: left;
    width: 210px;
}
.tracklist .playlists-conright .selected-playing .selected b {
    color: #000000;
    width: 52px;
}
</style>


