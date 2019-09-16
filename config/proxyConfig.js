module.exports = {
    proxy: {
          '/apis': {    //将www.exaple.com印射为/apis
                target: 'http://test-world-gw.kuke.com/world-api',  // 接口域名
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''   //需要rewrite的,
                }              
          },
          "/logins":{
                target: 'http://test-world-gw.kuke.com/login-api',  // 接口域名
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/logins': ''   //需要rewrite的,
                }     
          },
          "/favourite":{
            target: 'http://test-world-gw.kuke.com/user-api',  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/favourite': ''   //需要rewrite的,
            }
        },
        "/searchs":{
            target: 'http://search.nml3.kuke.com',
            changeOrigin: true,  //是否跨域
            secure: false,  // 如果是https接口，需要配置这个参数
            pathRewrite: {
                '^/searchs': ''   //需要rewrite的,
            }
        },
        "/upload":{
            target:'http://upload.kuke.com/v2upload',
            changeOrigin:true,
            search:false,
            pathRewrite: {
                '^/upload': ''   //需要rewrite的,
            }
        },
        '/logs':{
            target:'http://test-world-gw.kuke.com/log-api',
            changeOrigin:true,
            search:false,
            pathRewrite: {
                '^/logs': ''   //需要rewrite的,
            }
        } 
    }
  }