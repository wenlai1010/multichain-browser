
import Vue from 'vue';
import tpl from './tpl.html';
import axios from 'axios'

import './style.scss'
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
            telError:false,
            codeError:false,
            addError:false,
            mailError:false
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
            this.$http.post("http://172.16.20.20:8340/ssc/api/browser/mailinfo.Insert",{
                id:"",
                phoneNum:this.phoneNum,
                verifyCode:this.verifyCode,
                observeAddress:this.observeAddress,
                nickName:this.nickName,
                mailAddress:this.mailAddress
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
        },
        // 获取合约列表
        fetchContractList(){
            this.loading = true;
            commonService.contractList({
                "keyword": this.contractSearchTxt,
                "page": +this.pageNo,
                "per_page": this.pageSize,
            }).done((rep) => {
                if(rep.data){
                    this.toLoadList(rep);
                }
            }).fail((rep) => {
                window.error(rep);
            }).always(() => {
                this.isLoading = false;
            })
        },

        // 点击搜索按钮 或回车调用的函数
        toSearchContract(){
            this.txt = this.contractSearchTxt; // 存储搜索的内容,这样在分页的时候搜索框的内容被修改了也不会报错
            this.pageNo = 1;
            this.fetchContractList();
        },

        // 点击分页条调用的函数
        changeContractPage(){
            commonService.contractList({
                "keyword": this.txt,
                "page": +this.pageNo,
                "per_page": this.pageSize,
            }).done((rep) => {
                if(rep.data){
                    this.toLoadList(rep);
                }
            }).fail((rep) => {
                window.error(rep);
            });
        },

        //接口调用成功后 公共逻辑
        toLoadList(rep){
            if (rep.data.contractInfoVOList.length == 0) {
                window.toast(this.$t('noData'))
                return;
            }
            this.pageNum = rep.data.totalPage;
            let listArr = rep.data.contractInfoVOList;
            listArr.forEach((contract, index) => {
                let status = contract.status;
                listArr[index].status = this.$i18n.messages[this.$i18n.locale].contractStatusList[contract.status];;
                listArr[index].cType = this.$i18n.messages[this.$i18n.locale].contractTypes[contract.coin];
            });
            this.contractList = listArr;
        },

        // 跳转到合约详情页
        toContractInfo(parm){
            this.$router.push({name: 'contractInfo', params: {contract_id: parm}, query: {cl:1}})
        },

        // 点击输入框中删除符号
        toReload(){
            this.contractSearchTxt = '';
        },

        // 点击分页条中的页码
        changePage(num){
            this.pageNo = num;
            this.changeContractPage();
        }
    }
});
