
import Vue from 'vue';
import tpl from './tpl.html';
import axios from 'axios'

import './style.scss'
import commonService from "../../common/commonService";
import getParam from '../../util/get'
Vue.prototype.$http= axios;

export default Vue.extend({
    name: 'observation',
    template: tpl,
    data(){
        return {
            msg:"",
            phoneNum:"",
            verifyCode:"",
            observeAddress:"",
            nickName:"",
            mailAddress:"",
            sendMsgDisabled:false,
            time:60,
            addverify:false,
            telError:"",
            codeError:"",
            addError:"",
            mailError:""
        }
    },
    computed: {
        localUrl() {
            window.url = this.$store.state.localUrl;
            return this.$store.state.localUrl;
        }
    },
    watch: {
        // localUrl() {
        //     this.fetchContractList();
        // }
    },
    created() {
        // this.fetchContractList();
    },
    mounted(){
        // debugger
        // document.getElementById("mobile-number").intlTelInput();
        window.url=window.sessionStorage.broUrl;
        $("#mobile-number").intlTelInput();
        window.scrollTo(0, 0);
    },
    components: {
    },
    methods: {
        getCode(){
            this.telError="";
            if(this.phoneNum==""){
                this.telError="请输入手机号码";
                return
            }
            var telt1 = new RegExp("^1[0-9]{10}$");
            var telt2 = new RegExp("^[0-9]{5,15}$");
            // debugger
            if($('.selected-flag .flag span').text()=="+86 "){
                if(!telt1.test(this.phoneNum)){
                    this.telError="您输入的手机号格式有误";
                    return
                }
            }else if(!telt2.test(this.phoneNum)){
                this.telError="您输入的手机号格式有误";
                return
            }else{}
            if(this.phoneNum.replace(/\s+/g,"")){//手机号存在
                let me = this;
                me.sendMsgDisabled = true;
                let interval = window.setInterval(function() {//倒计时
                    if ((me.time--) <= 0) {
                        me.time = 60;
                        me.sendMsgDisabled = false;
                        window.clearInterval(interval);
                    }
                }, 1000);
                this.$http.post("http://www.achainlabs.ak/udc/udc/authcode/send",{
                    tel:($('.selected-flag .flag span').text()+this.phoneNum)
                },{
                    headers:{
                        "Content-Type":"text/plain"
                    }
                }).then((result)=>{
                    // debugger
                    var res = result.data.status;
                    if(res.code != "0"){
                        this.sendMsgDisabled= false;
                        window.clearInterval(interval);
                        this.telError=res.msg;
                        return
                    }
                    // }
                })
            }else{
                this.telError="请输入手机号";
            }
        },
        startob(){
            if(this.phoneNum==""){
                this.telError="请输入手机号码";
                return
            }
            if(this.verifyCode==""){
                this.codeError="请输入验证码";
                return
            }
            if(this.observeAddress==""){
                this.addError="请输入观察地址";
                return
            }
            if(this.mailAddress==""){
                this.mailError="请输入邮箱地址";
                return
            }
            if(this.contactEmail){
                if(!new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$").test(this.contactEmail)){
                    this.mailError="邮箱格式有误，请重新输入";
                    return
                }
            }
            // debugger
            commonService.startObser({
                    id:"",
                    phoneNum:($('.selected-flag .flag span').text()+this.phoneNum),
                    verifyCode:this.verifyCode,
                    observeAddress:this.observeAddress,
                    nickName:this.nickName,
                    mailAddress:this.mailAddress,
                    userId:getParam.data.userId ? getParam.data.userId : ''
            }).done((rep)=>{
                if(rep.code=='200'){
                    window.success("成功开始观察！请留意邮件哦～")
                }else{
                    window.error(rep.msg);
                }
            }).fail((rep)=> {
                window.error(rep);
            });
        },
        addBlur(){
            if(!this.observeAddress){

            }else{//地址校验合法
                commonService.addBlur({
                    observeAddress:this.observeAddress
                }).done((rep)=>{
                    if(rep.code=='200'){
                        this.addverify=true
                    }else{
                        window.error(rep.msg);
                    }
                }).fail((rep)=> {
                    window.error(rep);
                });


                // this.$http.post("http://172.16.20.20:8340/ssc/api/browser/mailinfo.validateAddress?address=YJCBx8pZXiPcRfQMNruxkRWecYiKRafKEpua",{
                //     observeAddress:this.observeAddress
                // },{
                //     headers:{
                //         "Content-Type":"text/plain"
                //     }
                // }).then((result)=>{
                //     debugger
                //     // debugger
                //     var res = result.data.status;
                //     if(res.code != "0"){
                //         this.sendMsgDisabled= false;
                //         window.clearInterval(interval);
                //         this.msg=res.msg;
                //         return
                //     }
                //     // }
                // })
            }
        }

    }
});
