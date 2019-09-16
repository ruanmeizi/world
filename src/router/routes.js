import home from "../views/home"
import person from "../views/person/person_router"
import category from "../views/category/category"
import culture from "../views/culture/culture"
import culturelist from "../views/culture/culture_list"


import area from "../views/area/area_router"
import letter from "../views/area/letter"
import range from "../views/area/range"
import arealist from "../views/area/area_list"
import areatable from "../views/area/area_table"


import index from "../views/index"
import favourite from "../views/favourite/favourite"
import label from "../views/label/label_router"
import label_list from "../views/label/label_list"

import playlist from "../views/playlist/playlist_router"
import playlist_my from "../views/playlist/playlist_my"
import playlist_naxos from "../views/playlist/playlist_naxos"
import playlist_themed from "../views/playlist/playlist_themed"
import tracklist from '../views/playlist/tracklist'


import detail from "../views/detail/detail"
import moredetail from "../views/detail/moredetail"

//登录 
import logout from "../views/login/logout"
import login from "../views/login/login"
import forgot from "../views/login/forgot"
import regist from "../views/login/regist"
import agreement from "../views/login/agreement"

import about from "../views/footer/about"
import termsofuse from "../views/footer/termsofuse"
import policy from "../views/footer/policy"
import copyright from "../views/footer/copyright"
import contactus from "../views/footer/contactus"
import advise from "../views/footer/advise"
import network from "../views/footer/network"
import production from "../views/footer/production"
import publish from "../views/footer/publish"
import footculture from "../views/footer/footculture"
import icp from "../views/footer/icp"

//搜索
import search from "../views/search/search"
import advancedsearch from "../views/search/advancedsearch"

import artist_list from "../views/person/artist_list"
import composer_list from "../views/person/composer_list"
import artist_info from "../views/person/artist_info"
import composer_info from "../views/person/composer_info"
import category_list from "../views/category/category_list"
import work from "../views/person/work"




let routes = [
    {
        path: "/",
        redirect: "/login",
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        }
    },
    {
        name: "index",
        path: "/index",
        component: index,
        children: [
            {
                name: "home",
                path: "/index/home",
                component: home,
                meta: {
                    title: 'Home - Kuke Music Library',
                    titleEn:"主页 - 库客音乐图书馆"
                }
            },
            {
                name: "person",
                path:"/index/person",
                component: person,
                redirect:"/index/person/composer_list/A",
                meta: {
                    title: 'People - Kuke Music Library',
                    titleEn:"人物 - 库客音乐图书馆"
                },
                children:[
                    {
                        name:"artist_list",
                        path:"artist_list/:id",
                        component:artist_list,
                        meta: {
                            title: 'People - Kuke Music Library',
                            titleEn:"人物 - 库客音乐图书馆"
                        },
                    },
                    {
                        name:"composer_list",
                        path:"composer_list/:id",
                        component:composer_list,
                        meta: {
                            title: 'People - Kuke Music Library',
                            titleEn:"人物 - 库客音乐图书馆"
                        },
                    },
                ],
            },
            {
                name:"artist_info",
                path:"artist_info/:id",
                component:artist_info,
                meta: {
                    title: 'People - Kuke Music Library',
                    titleEn:"人物 - 库客音乐图书馆"
                },
            },
            {
                name:"composer_info",
                path:"composer_info/:id",
                component:composer_info,
                meta: {
                    title: 'People - Kuke Music Library',
                    titleEn:"人物 - 库客音乐图书馆"
                },
            },
            {
                name:'work',
                path:'/index/work/:id',
                component:work,
                meta: {
                    title: 'Work - Kuke Music Library',
                    titleEn:"作品 - 库客音乐图书馆"
                },
            },

            // {
            //     name:"artist_list",
            //     path:"/index/artist_list/:id",
            //     component:artist_list,
            // },
            // {
            //     name:"composer_list",
            //     path:"/index/composer_list/:id",
            //     component:composer_list,
            // },
            // {
            //     name:"artist_info",
            //     path:"artist_info/:id",
            //     component:artist_info
            // },
            // {
            //     name:"composer_info",
            //     path:"composer_info/:id",
            //     component:composer_info
            // },
            {
                name: "category",
                path: "category",
                component: category
            },
            {
                name: "culture",
                path: "culture",
                component: culture,
                meta: {
                    title: 'Culture - Kuke Music Library',
                    titleEn:"文化 - 库客音乐图书馆"
                },
            },
            {
                name:"culturelist",
                path:"culturelist/:id/:tit",
                component:culturelist,
                meta: {
                    title: 'Culture - Kuke Music Library',
                    titleEn:"文化 - 库客音乐图书馆"
                },
            },
            {
                name: "area",
                path: "area",
                component: area,
                meta: {
                    title: 'Area - Kuke Music Library',
                    titleEn:"地区 - 库客音乐图书馆"
                },
                children:[
                    {
                        name:"letter",
                        path:"letter",
                        component:letter,
                        meta: {
                            title: 'Area - Kuke Music Library',
                            titleEn:"地区 - 库客音乐图书馆"
                        },
                    },
                    {
                        name:"range",
                        path:"range",
                        component:range,
                        meta: {
                            title: 'Area - Kuke Music Library',
                            titleEn:"地区 - 库客音乐图书馆"
                        },
                    }
                ]
            },
            {   
                name:'arealist',
                path:"arealist/:id/:tit",
                component:arealist
            },
            {   
                name:'areatable',
                path:"areatable/:id/:tit",
                component:areatable
            },
            {
                name: "label",
                path: "label",
                component: label,
                meta: {
                    title: 'Labels - Kuke Music Library',
                    titleEn:"厂牌 - 库客音乐图书馆"
                },
            },
            {
                name:"label_list",
                path:'label_list/:id/:no',
                component:label_list
            },
            
            {
                name: "favourite",
                path: "favourite",
                component: favourite,
                meta: {
                    title: 'Favourite - Kuke Music Library',
                    titleEn:"我的喜欢 - 库客音乐图书馆"
                },
            },
            {
                name: "playlist",
                path: "playlist",
                component: playlist,
                children:[
                    {
                        name:"playlist_my",
                        path:"playlist_my",
                        component:playlist_my,
                        meta: {
                            title: 'Playlists - Kuke Music Library',
                            titleEn:"播放列表 - 库客音乐图书馆"
                        },
                    },
                    {
                        name:"playlist_naxos",
                        path:"playlist_naxos",
                        component:playlist_naxos,
                        meta: {
                            title: 'Playlists - Kuke Music Library',
                            titleEn:"播放列表 - 库客音乐图书馆"
                        },
                    },
                    {
                        name:"playlist_themed",
                        path:"playlist_themed",
                        component:playlist_themed,
                        meta: {
                            title: 'Playlists - Kuke Music Library',
                            titleEn:"播放列表 - 库客音乐图书馆"
                        },
                    },
                    {
                        name:'tracklist',
                        path:'tracklist/:id',
                        component:tracklist,
                        meta: {
                            title: 'Playlists - Kuke Music Library',
                            titleEn:"播放列表 - 库客音乐图书馆"
                        },
                    }
                ]
            },
            {
                name: "detail",
                path: "/catalogue/:id",
                component: detail,
                meta: {
                    title: 'Album - Kuke Music Library',
                    titleEn:"专辑 - 库客音乐图书馆"
                },
            },
            {
                name: "moredetail",
                path: "/moredetail",
                component: moredetail
            },
            {
                name:"search",
                path:"search/:id",
                component:search,
                meta: {
                    title: 'Keyword - Kuke Music Library',
                    titleEn:"关键字搜索 - 库客音乐图书馆"
                }
            },
            {
                name:"advancedsearch",
                path:"advancedsearch",
                component:advancedsearch,
                meta: {
                    title: 'Keyword - Kuke Music Library',
                    titleEn:"关键字搜索 - 库客音乐图书馆"
                },
            },
            {
                name:"category_list",
                path:"category_list/:id/:tit",
                component:category_list
            }
        ]
    },
    {
        name:"login",
        path:"/login",
        component:login,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"logout",
        path:'/logout',
        component:logout,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"regist",
        path:"/regist",
        component:regist,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"forgot",
        path:'/forgot',
        component:forgot,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"agreement",
        path:"/agreement",
        component:agreement,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"about",
        path:'/about',
        component:about,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"termsofuse",
        path:"/termsofuse",
        component:termsofuse,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"policy",
        path:"/policy",
        component:policy,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"copyright",
        path:"/copyright",
        component:copyright,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"contactus",
        path:"/contactus",
        component:contactus,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"advise",
        path:"/advise",
        component:advise,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"network",
        path:"/network",
        component:network,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"production",
        path:"/production",
        component:production,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"publish",
        path:"/publish",
        component:publish,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"footculture",
        path:"/footculture",
        component:footculture,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    },
    {
        name:"icp",
        path:"/icp",
        component:icp,
        meta: {
            title: 'Kuke Music Library',
            titleEn:"库客音乐图书馆"
        },
    }
]

export default routes