/**
 * @file
 * @auth donglele
 * @date 2017/2/15
 */

import Vue from 'vue';
import axios from 'axios'
import tpl from './tpl.html';

import commonService from '../../common/commonService';
import Loading from '../../component/Loading.vue';
import format from '../../common/format';

Vue.prototype.$http= axios

export default Vue.extend({
    name: 'index',
    template: tpl,
    data(){
        return{
            seconds: 60, //倒计时
            startFlag: false,
            content: '获取验证码',
            tel: '',//手机号
            code: '',//验证码
            reason: '',//填写的原因
        }
    },
    mounted() {
        $("#phone").intlTelInput();
        window.scrollTo(0,0);

    },
    components: {
        Loading
    },
    methods: {
        getCode(){
            if(this.startFlag){
                return;
            }
            this.startTimeInterval();
            this.$http.post("http://www.achainlabs.ak/udc/udc/authcode/send",{
                tel:($('.selected-flag .flag span').text()+this.tel),
                Locale:""
            },{
                headers:{
                    "Content-Type":"text/plain"
                }
            }).then((result)=>{
                var res = result.data.status;
                if(res.code != "0"){
                    // this.sendMsgDisabled= false;
                    // window.clearInterval(interval);
                    // this.msg=res.msg;
                    return
                }
            })
        },
        startTimeInterval() {
            if (this.seconds <= 0) { //为0的时候还原
                this.content = '点击获取';
                this.startFlag = false;
                return false;
            }
            this.startFlag = true;
            this.content = `${this.seconds}s`;
            this.seconds--;
            setTimeout(this.startTimeInterval, 1000);
        },
        //取消观察
        cancelObser(){
            commonService.cancelObser({
                "id":"1",
                "phoneNum":"+86 15201018126",
                "verifyCode":"104341",
                "observeAddress":"YJC7GaDZLapHZrmVn6z4pW8ViBPYNLgbjguL",
                "nickName":"szh",
                "mailAddress":"469041032@qq.com"
            }).done((rep)=>{
            
            }).fail((rep)=> {
                window.error(rep);
            });
        }
    }
});
