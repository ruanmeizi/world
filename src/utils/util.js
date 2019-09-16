// 获取cookie
// export function getCookieKey(keyname){
//     var str=document.cookie;
//     var cookie_arr=str.split("; ")
//     var value;
//     console.log(cookie_arr)
//     cookie_arr.forEach((v,i)=>{
//         var temp_arr=v.split("=")
//         if(temp_arr[0]==keyname){
//             value= temp_arr[1]
//         }
//     })
//     return value
// }


// export function setCookie(keyname,value){
//     document.cookie=keyname+"="+value
// }

export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};
