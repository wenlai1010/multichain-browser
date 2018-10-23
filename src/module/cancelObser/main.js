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
            telError: false,
            codeError: false,
            telErrText: '请输入手机号',
            codeErrText: '请输入验证码',
            telfocus:false,
            codefocus:false,
            reasonfocus:false,
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
        checkInput(key){
            if(key == 'tel'){
                this.telfocus = false;
                let telt1 = new RegExp("^1[0-9]{10}$");
                let telt2 = new RegExp("^[0-9]{5,15}$");
                if(this.tel==""){
                    this.telError = true;
                    this.telErrText = '请输入手机号';
                    return
                }
                if($('.selected-flag .flag span').text().replace(/\s+/g, "") == "+86"){
                    if(!telt1.test(this.tel)){
                        this.telErrText = '您输入的手机号格式有误';
                        this.telError  = true;
                        return
                    }else{
                        this.telErrText = "";
                        this.telError  = false;
                    }
                }else{
                    if(!telt2.test(this.tel)){
                        this.telErrText = '您输入的手机号格式有误';
                        this.telError  = true;
                        return
                    }else{
                        this.telErrText="";
                        this.telError  = false;
                    }
                }
            }else{
                this.codefocus = false;
                if(this.code == ''){
                    this.codeError = true;
                    this.codeErrText = '请输入验证码';
                    return;
                }else{
                    this.codeError = false;
                    this.codeErrText = '';
                }
            }
        },
        getCode(){
            if(this.startFlag){
                return;
            }
            this.checkInput('tel');
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
                    this.content = '获取验证码';
                    this.startFlag = false;
                    return
                }
            });
        },
        startTimeInterval() {
            if (this.seconds <= 0) { //为0的时候还原
                this.content = '获取验证码';
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
            this.checkInput('tel');
            this.checkInput('code');
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
