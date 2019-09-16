<template>
    <div class="con-playlists">
        <div class="playlists-catalog">
            <div class="catalog">
                <span><a href="/" data-pjax="">主页</a> </span>&gt;
                <span>拿索斯播放列表</span>&gt;<span>Alfano</span>
            </div>
        </div>
        <div class="member-playlist" id="folders-view">
            <p>
                <!-- <a href="/folder?category=nml&amp;folderId=58421" data-pjax=""> -->
                    <img src="../../assets/icon-back.png" alt="">返回文件夹
                <!-- </a> -->
            </p>
        </div>
        <div class="playlists-conLeft">
            <div class="floders-tit">
                <p>Alfano</p>
                </div>
            <div class="floders-list">
                <input type="hidden" name="playlistId" id="playlistId" value="">
                <p>序列号:
                    <span>1</span>
                </p>
                <p>作者:
                    <span>Naxos</span>
                </p>
                <p class="author">
                    <label>评价:</label>
                    <span id="remarks">[Remarks here]</span>
                </p>
                <p>单曲数量:
                    <span>6</span>
                </p>
            </div>
        </div>
        <div class="playlists-conright">
            <div class="playlists-link">
                <p>Anderson, Pt 2</p>
                <img src="../../assets/icon-foldersplay'.png" class="addMusicList" alt="">
                <img src="" alt="">
            </div>
            <div class="selected-playing">
                <p class="selected">已选择播放时长 :
                    <b> 00:00:00</b>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style>
.con-playlists {
    overflow: auto;
    background: #f7f9fa;
}
.playlists-catalog {
    height: 42px;
    line-height: 42px;
    padding-left: 30px;
}
.playlists-catalog .catalog {
    float: left;
    color: #999999;
}
.container .main .member-playlist {
    height: 40px;
    margin: 0px 30px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 5px;
    line-height: 40px;
    padding-left: 23px;
}
 .member-playlist p {
    font-size: 14px;
    float: left;
    color: #b53448;
}
 .member-playlist p img {
    margin-right: 10px;
}
 .con-playlists .playlists-conLeft {
    margin-left: 30px;
    background: #fff;
    min-height: 1097px;
    float: left;
    width: 28%;
}
.con-playlists .playlists-conLeft .floders-list p {
    color: #54a4d5;
    min-height: 37px;
    border-bottom: 1px dashed #999999;
    line-height: 37px;
}
.con-playlists .playlists-conLeft .floders-tit {
    width: 100%;
    min-height: 24px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
}
.con-playlists .playlists-conLeft .floders-tit>p {
font-size: 14px;
padding: 10px 40px 10px 20px;
font-weight: 600;
line-height: 24px;

}
.con-playlists .playlists-conLeft .floders-list {
    margin: 0 20px;
}
.con-playlists .playlists-conLeft .floders-list p {
    color: #b53448;
    min-height: 37px;
    border-bottom: 1px dashed #999999;
    line-height: 37px;
}

/* 右侧的css */
.con-playlists .playlists-conright {
    width: 66%;
    margin-right: 30px;
    float: right;
    background: #fff;
}
.con-playlists .playlists-conright .playlists-link {
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: 600;
    padding-left: 20px;
}
.con-playlists .playlists-conright .playlists-link p {
    float: left;
}
.con-playlists .playlists-conright .playlists-link img {
    float: right;
    margin-right: 10px;
    line-height: 50px;
    margin-top: 10px;
    cursor: pointer;
}
.selected-playing {
    height: 50px;
    line-height: 50px;
    background: #eeeff1;
    line-height: 50px;
    border-bottom: 2px solid #fff;
    overflow: hidden;
}
.con-playlists .playlists-conright .selected-playing .selected {
    margin-left: 20px;
    color: #666666;
    float: left;
    width: 210px;
}
.playlists-conright .selected-playing .selected b {
    color: #000000;
    width: 52px;
}
</style>
