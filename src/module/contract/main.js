/**
 * @file
 * @auth donglele
 * @date 2016/12/29
 */

import Vue from 'vue';
import tpl from './tpl.html';

import Loading from '../../component/Loading.vue';
import commonService from '../../common/commonService'
import Pager from '../../component/Pager.vue';

export default Vue.extend({
    name: 'contract',
    template: tpl,
    data(){
        return {
            isHover: false,
            contractSearchTxt: '', // 文本框中变化的内容
            txt: '', // 点击搜索按钮 或回车查询的搜索内容
            hasDelete: this.contractSearchTxt,
            contractList: [],

            pageNo: 1,
            pageNum: 0,
            pageSize: 20,
            isLoading: true,
        }
    },
    computed: {
        localUrl() {
            window.url = this.$store.state.localUrl;
            return this.$store.state.localUrl;
        }
    },
    watch: {
        localUrl() {
            this.fetchContractList();
        }
    },
    created() {
        this.fetchContractList();
    },
    mounted(){
        window.scrollTo(0, 0);
    },
    watch: {},
    components: {
        Pager,
        Loading
    },
    methods: {
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
