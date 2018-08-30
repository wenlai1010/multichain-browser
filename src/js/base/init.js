/**
 * @file
 * @auth jinguangguo
 * @date 2017/1/18
 */

import Vue from 'vue';

// include相关
import '../../include/nav/nav';

// alert & confirm & toast
import '../../component/Toast/Toast';


Vue.prototype.reload = function () {
    window.location.reload();
};
// debugger;
// let lang = window.location.href.indexOf('lang')>0? window.location.hash.split('?')[1].split('=')[1] : 'en';  // en / cn
// let lang = window.sessionStorage.getItem('LANG')? window.sessionStorage.getItem('LANG') : 'en';   // en / cn

// if (lang !== 'en' && lang !== 'cn') {
//     lang = 'en';     // 默认使用en
// }

let app = {
    DEBUG: false,
    LANG: 'en'
};

if (window.location.href.indexOf('localhost') >= 0) {
    app.DEBUG = true;
}

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

Vue.filter('locale-time', function (date) { 
    let inputTime = new Date(date.replace(/-/g,'/')),
        offset = (new Date()).getTimezoneOffset() * 60000,
        finalTime = inputTime.getTime() - offset;
    return new Date(finalTime).Format('yyyy-MM-dd hh:mm:ss')
})

window.app = app;
