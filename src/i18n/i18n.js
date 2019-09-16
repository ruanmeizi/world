import Vue from "vue"
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import messages from './lang'

Vue.use(VueI18n);

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
     }
    return "";
} 

const i18n = new VueI18n({
    locale: getCookie('lang') || 'zh',
    messages
})
locale.i18n((key, value) => i18n.t(key, value)) 
export default i18n