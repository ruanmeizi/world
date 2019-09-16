/**
 * api接口统一管理
 */
import { get, post } from '../https'
import { loadavg } from 'os';

// let base="/apis";

// let log="/logins";

// let favourite="/favourite"

// let searchs='/searchs'

// let upload='/upload'

// let logapi='/logs'


//开发接口
// let base="http://192.168.0.56:8763/world-api";

// let log="http://192.168.0.56:8763/login-api";

// let favourite="http://192.168.0.56:8763/user-api"

// let searchs='http://search.nml3.naxosmusiclibrary.com'

//预生产接口
let base="//test-world-gw.kuke.com/world-api";

let log="//test-world-gw.kuke.com/login-api";

let favourite="//test-world-gw.kuke.com/user-api"

let searchs='//search.nml3.kuke.com'

let logapi='//test-world-gw.kuke.com/log-api'

//正式上线接口

// let base="//world-gw.kuke.com/world-api";

// let log="//world-gw.kuke.com/login-api";

// let favourite="//world-gw.kuke.com/user-api"

// let searchs='//search-nml3.kuke.com'


//世界民族-艺术家接口
//艺术家列表
    export const getArtists = params => get('/v1/world/artists', params);

//catlabel-controller世界民族-厂牌接口
    //首字母-厂牌-数量
    export const catlabelAlpha = params => get(`${base}/v1/world/catlabel/alpha`, params);
    //首字母-厂牌-列表
    export const catlabels = params => get(`${base}/v1/world/catlabels`, params);
    //详情
    export const catlabel = params => get(`${base}/v1/world/catlabel`, params);
    //详情-首字母
    export const cataloguealpha = params => get(`${base}/v1/world/catlabel/catalogue/alpha`,params);
    //详情-列表
    export const cataloguelist = params => get(`${base}/v1/world/catlabel/catalogue`,params);

//作曲家的接口
    export const composersAlpha=params => get(`${base}/v1/world/composers/alpha`,params);
    //export const composersAlpha=params => get('http://192.168.0.56:8763/world-api/v1/world/composers/alpha',params);
    //作曲家的内容
    export const composerslist=params => get(`${base}/v1/world/composers`,params);
    //作曲家的人物信息
    export const personinfo=params => get(`${base}/v1/world/person`,params);
    //作曲家作品分类
    //http://192.168.0.56:8763/world-api/v1/world/composer/workcategory?personId=24295
    export const comworkcategory=params => get(`${base}/v1/world/composer/workcategory`,params);
    //作曲家首字母
    //http://192.168.0.56:8763/world-api/v1/world/composer/work/alpha?personId=24295
    export const comalpha=params => get(`${base}/v1/world/composer/work/alpha`,params);
    //作曲家+作品分类+首字母-作品-列表
    //http://192.168.0.56:8763/world-api/v1/world/composer/work?personId=24295
    export const composerwork=params => get(`${base}/v1/world/composer/work`,params);
    //作曲家+作品分类+首字母-专辑-列表
    //http://192.168.0.56:8763/world-api/v1/world/composer/catalogue?personId=24295
    export const composercatalogue=params => get(`${base}/v1/world/composer/catalogue`,params);
    //作曲家专辑-首字母-数量
    //http://192.168.0.56:8763/world-api/v1/world/composer/catalogue/alpha?personId=24295
    export const composeralpha=params => get(`${base}/v1/world/composer/catalogue/alpha`,params);

//艺术家的字母接口
    export const artistsalpha=params => get(`${base}/v1/world/artists/alpha`,params);

    export const artistscon=params=>get(`${base}/v1/world/artists`,params);

    export const workcategory=params=>get(`${base}/v1/world/artist/workcategory`,params);

    //art-info ABC字母
    export const catalogue=params=>get(`${base}/v1/world/artist/catalogue`,params);

    //专辑首字母
    //http://192.168.0.56:8763/world-api/v1/world/artist/catalogue/alpha?personId=33898
    export const artistcataalpha=params=>get(`${base}/v1/world/artist/catalogue/alpha`,params);




//home页面的接口
    export const featured=params => get(`${base}/v1/world/catalogue/featured`,params);



//文化
    //文化首字母
    export const culturalalpha=params => get(`${base}/v1/world/cultural/alpha`,params);
    //文化首页面内容
    export const culturals=params => get(`${base}/v1/world/culturals`,params);

    //文化进入详情页面
    export const culcatalogue=params => get(`${base}/v1/world/cultural/catalogue`,params);

    //文化详情
    //http://test-world-gw.kuke.com/world-api/v1/world/cultural?workSubCatCode=AFC
    export const worldcultural=params => get(`${base}/v1/world/cultural`,params);


//地区
    //地区国家列表
    export const arearegions=params => get(`${base}/v1/world/regions`,params);

    //地区详细信息
    export const arearegion=params => get(`${base}/v1/world/region`,params);

    //进入页面的国家
    export const areacountry=params => get(`${base}/v1/world/region/country`,params);

    //地区的专辑列表
    export const areacatalogue=params => get(`${base}/v1/world/region/catalogue`,params);

    //国家的专辑列表
    export const countrycatalogue=params => get(`${base}/v1/world/country/catalogue`,params);

    //国家详情

    //http://test-world-gw.kuke.com/world-api/v1/world/country?countryId=AD
    export const worldcountry=params => get(`${base}/v1/world/country`,params);




    //按照字母来调用


    //首字母-国家
    export const countryalpha=params => get(`${base}/v1/world/country/alpha`,params);

    //首字母国家下的列表
    export const worldcountries=params => get(`${base}/v1/world/countries`,params);

//分类
    //推荐作品分类
    export const workcategoryfeatured=params => get(`${base}/v1/world/workcategory/featured`,params);

    //作品专辑首字母
    export const workcategoryalpha=params => get(`${base}/v1/world/workcategory/catalogue/alpha`,params);

    //分类的
    //http://192.168.0.56:8763/world-api/v1/world/workcategory/catalogue?workCategoryId=55
    export const categorycatalogue=params => get(`${base}/v1/world/workcategory/catalogue`,params);

//login
    //post
    export const loginaccount=params => post(`${log}/v1/login/account`,params);
    //退出登录
    //http://test-world-gw.kuke.com/login-api/v1/logout
    export const logout=params => post(`${log}/v1/logout`,params);
    //ip登录
    //http://test-world-gw.kuke.com/login-api/v1/login/ip?clientIp=1&permId=1&product=world
    export const loginip=params => post(`${log}/v1/login/ip`,params);
    //token登录
    //http://world-gw.kuke.com/login-api/v1/login/token?clientIp=11&permId=11&product=11&token=11
    export const logintoken=params => post(`${log}/v1/login/token`,params);
    //登录信息
    //http://test-world-gw.kuke.com/login-api/v1/login/info
    export const loginInfo=params => get(`${log}/v1/login/info`,params);
//专辑
    //专辑详情
    export const worldcatalogue=params=>get(`${base}/v1/world/catalogue`,params);

    //作曲家
    export const worldcomposer=params=>get(`${base}/v1/world/catalogue/composer`,params);

    //艺术家
    export const worldartist=params=>get(`${base}/v1/world/catalogue/artist`,params);

    // 单曲
    export const worldtrack=params=>get(`${base}/v1/world/catalogue/track`,params);

    //作品
    //http://192.168.0.56:8763/world-api/v1/world/catalogue/trackgroup?catalogueId=0077776912158&personInclude=true
    export const worldtrackgroup=params=>get(`${base}/v1/world/catalogue/trackgroup`,params);

    //更多
    //http://192.168.0.56:8763/world-api/v1/world/catalogue/page?catLabelInclude=true&categoryInclude=true&countryInclude=true&culturalInclude=true&pageNo=1&pageSize=20&personInclude=true&workAndTrackInclude=true
    export const worldpage=params=>get(`${base}/v1/world/catalogue/page`,params);

//喜欢
    //列表
    export const favouritelist=params=>get(`${favourite}/v1/user/favourite/list`,params);
    //http://192.168.0.56:8763/user-api/v1/user/favourite/list?product=world&userId=17319452535

    //删除
    //http://192.168.0.56:8763/user-api/v1/user/favourite/delete?favouriteIds=256
    export const favouritedelect=params=>post(`${favourite}/v1/user/favourite/delete`,params);

    //添加喜欢
    //http://192.168.0.56:8763/user-api/v1/user/favourite/add?catalogueId=NW58774&catalogueName=DESERT%20BLUES%2C%20Vol.%201%20-%20Ambiances%20du%20Sahara&product=world&trackIds=1640912&userId=1731945253
    export const favouriteadd=params=>post(`${favourite}/v1/user/favourite/add`,params);

    //检查我的喜欢
    // http://test-world-gw.kuke.com/user-api/v1/user/favourite/check?catalogueId=0077776912158&product=world&userId=17319452535
    export const favouritecheck=params=>get(`${favourite}/v1/user/favourite/check`,params);

//单曲

    //http://192.168.0.56:8763/world-api/v1/world/tracks?artistInclude=true&catalogueInclude=true&trackIds=1129882%2C1129883%2C1129884%2C1129885%2C&workInclude=true

    export const worldtracks=params=>get(`${base}/v1/world/tracks`,params);

    //http://192.168.0.56:8763/world-api/v1/world/track/address?trackId=1291834
    //播放MP3接口
    export const worldaddress=params=>get(`${base}/v1/world/track/address`,params);

//我的夹子
    //添加
    //http://192.168.0.56:8763/user-api/v1/user/folder/add?folderName=list11111&product=world&type=1&userId=17319452535
    export const folderadd=params=>post(`${favourite}/v1/user/folder/create`,params);
    //我的夹子列表
    //http://192.168.0.56:8763/user-api/v1/user/folder/list?product=world&type=1&userId=17319452535
    export const folderlist=params=>get(`${favourite}/v1/user/folder/list`,params);
    //详情
    //http://192.168.0.56:8763/user-api/v1/user/folder/info?folderId=28278
    export const folderinfo=params=>get(`${favourite}/v1/user/folder/info`,params);
    //夹子专辑列表
    //http://192.168.0.56:8763/user-api/v1/user/folder/catalogue/list?folderId=28278
    export const foldercataloguelist=params=>get(`${favourite}/v1/user/folder/catalogue-list`,params);
    //夹子修改
    //http://192.168.0.56:8763/user-api/v1/user/folder/update?folderId=28278&folderName=%E6%83%85%E7%88%B1&product=world&type=2&userId=17319452535
    export const folderupdate=params=>post(`${favourite}/v1/user/folder/update`,params);
    //夹子删除
    //http://192.168.0.56:8763/user-api/v1/user/folder/delete?folderId=28306
    export const folderdelete=params=>post(`${favourite}/v1/user/folder/delete`,params);
    //添加专辑
    //http://192.168.0.56:8763/user-api/v1/user/folder/catalogue/add?folderId=123435&sourceIds=1212&userId=17319452535
    export const foldercatalogueadd=params=>post(`${favourite}/v1/user/folder/add-catalogue`,params);
    //添加单曲
    //http://192.168.0.56:8763/user-api/v1/user/folder/track/add?folderId=111&sourceIds=111&userId=111
    export const foldertrackadd=params=>post(`${favourite}/v1/user/folder/add-track`,params);
    //夹子-单曲/专辑-删除
    //http://192.168.0.56:8763/user-api/v1/user/folder/source/delete?ids=121323232432
    export const foldersourcedelete=params=>post(`${favourite}/v1/user/folder/delete-track`,params);
    //夹子-单曲-列表
    //http://192.168.0.56:8763/user-api/v1/user/folder/track/list?folderId=1111
    export const folderfolderlist=params=>get(`${favourite}/v1/user/folder/track-list`,params);
    //夹子-上传图片
    //http://test-world-gw.kuke.com/user-api/v1/user/folder/img/update?folderId=111
    export const folderimgupdate=params=>post(`${favourite}/v1/user/folder/img/update`,params);
    //夹子-密码上传图片
    //http://test-world-gw.kuke.com/user-api/v1/user/folder/img/md5key?folderId=111
    export const folderfoldermd5key=params=>get(`${favourite}/v1/user/folder/gen-img-md5str`,params);



//播放列表
    //文件夹-列表
    //http://192.168.0.56:8763/world-api/v1/world/playlist/folder/list?category=nml
    export const playlistfolderlist=params=>get(`${base}/v1/world/playlist/folder/list`,params);
    //文件夹-播放列表
    //http://192.168.0.56:8763/world-api/v1/world/playlist/folder/playlist?groupId=60961
    export const playlistfolderplaylist=params=>get(`${base}/v1/world/playlist/folder/playlist`,params);
    //播放列表-详情
    //http://192.168.0.56:8763/world-api/v1/world/playlist/info?playlistId=366208
    export const worldplaylistinfo=params=>get(`${base}/v1/world/playlist/info`,params);
    //播放列表
    //http://192.168.0.56:8763/world-api/v1/world/playlist/track/list?playlistId=365930
    export const playlisttracklist=params=>get(`${base}/v1/world/playlist/track/list`,params);
//搜索
    //https://search.nml3.naxosmusiclibrary.com/api/v1/query?q=app&size=20&page=1
    export const searchquery=params=>get(`${searchs}/api/v1/query?platform=world`,params);
    //高级搜索
    //https://search.nml3.naxosmusiclibrary.com/api/v1/suggest?prefix=A&size=20&page=1&type=composer
    export const searchsuggest=params=>get(`${searchs}/api/v1/suggest?size=92&platform=world`,params);
//作品
    //http://test-world-gw.kuke.com/world-api/v1/world/work?workId=346080
    export const worldwork = params => get(`${base}/v1/world/work`, params);
    //http://test-world-gw.kuke.com/world-api/v1/world/work/catalogue/{workId}?featuredArtistInclude=true&workId=346080
    export const cataloguework = params => get(`${base}/v1/world/work/catalogue`, params);
//第三方登录
    //http://test-world-gw.kuke.com/login-api/v1/third/login/launch?type=wechat
    export const loginlaunch=params => get(`${log}/v1/third/login/launch`,params);
//上传
    //http://upload.kuke.com/v2upload
    export const uploadc=params => post(`${upload}`,params);

//记录在线时长日志
    //http://test-world-gw.kuke.com/log-api/v1/log/online?duration=11&loginTime=11&logoutTime=11
    export const online=params => post(`${logapi}/v1/log/online`,params);
//记录单曲播放日志
    //http://test-world-gw.kuke.com/log-api/v1/log/playTrack?catalogueId=11&catlabelId=11&duration=11&endTime=111&origin=11&startTime=111&trackId=111
    export const playTrack=params => post(`${logapi}/v1/log/playTrack`,params);
//记录访问日志
    //http://test-world-gw.kuke.com/log-api/v1/log/visit?sourceType=11&url=11
    export const visit=params => post(`${logapi}/v1/log/visit`,params);


