
import Vue from 'vue';
import tpl from './tpl.html';
import axios from 'axios'

import './style.scss'
import commonService from "../../common/commonService";
Vue.prototype.$http= axios

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
        // localUrl() {
        //     window.url = this.$store.state.localUrl;
        //     return this.$store.state.localUrl;
        // }
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
        $("#mobile-number").intlTelInput();
        window.scrollTo(0, 0);
    },
    components: {
    },
    methods: {
        getCode(){
            this.msg="";
            if(this.tel==""){
                this.msg="请输入手机号码";
                return
            }
            let telt1 = new RegExp("^1[0-9]{10}$");
            let telt2 = new RegExp("^[0-9]{5,15}$");
            if($('.selected-flag .flag span').text()=="+86"){
                if(!telt1.test(this.tel)){
                    this.msg="您输入的手机号格式有误，请按照“地区编号+手机号”的格式输入";
                    return
                }
            }else if(!telt2.test(this.tel)){
                this.msg="您输入的手机号格式有误，请按照“地区编号+手机号”的格式输入";
                return
            }else{}
            if(this.tel.replace(/\s+/g,"")){//手机号存在
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
                    tel:($('.selected-flag .flag span').text()+this.tel)
                },{
                    headers:{
                        "Locale":this.$t('m.ajaxhead'),
                        "Content-Type":"text/plain"
                    }
                }).then((result)=>{
                    // debugger
                    var res = result.data.status;
                    if(res.code != "0"){
                        this.sendMsgDisabled= false;
                        window.clearInterval(interval);
                        this.msg=res.msg;
                        return
                    }
                    // }
                })
            }else{
                this.msg="请输入手机号";
            }
        },
        startob(){
            commonService.startObser({
                    id:"",
                    phoneNum:this.phoneNum,
                    verifyCode:this.verifyCode,
                    observeAddress:this.observeAddress,
                    nickName:this.nickName,
                    mailAddress:this.mailAddress
            }).done((rep)=>{

            }).fail((rep)=> {
                window.error(rep);
            });
            // this.$http.post("http://172.16.20.20:8340/ssc/api/browser/mailinfo.Insert",{
            //     id:"",
            //     phoneNum:this.phoneNum,
            //     verifyCode:this.verifyCode,
            //     observeAddress:this.observeAddress,
            //     nickName:this.nickName,
            //     mailAddress:this.mailAddress
            // }).then((result)=>{
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
        },
        addBlur(){
            if(!this.observeAddress){

            }else{//地址校验合法
                this.$http.post("http://172.16.20.20:8340/ssc/api/browser/mailinfo.validateAddress?address=YJCBx8pZXiPcRfQMNruxkRWecYiKRafKEpua",{
                    observeAddress:this.observeAddress
                },{
                    headers:{
                        "Content-Type":"text/plain"
                    }
                }).then((result)=>{
                    debugger
                    // debugger
                    var res = result.data.status;
                    if(res.code != "0"){
                        this.sendMsgDisabled= false;
                        window.clearInterval(interval);
                        this.msg=res.msg;
                        return
                    }
                    // }
                })
            }
        }

    }
});
