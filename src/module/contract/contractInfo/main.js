/**
 * Created by donglele on 2017/2/14.
 */
import Vue from 'vue';
import tpl from './tpl.html';
import Loading from '../../../component/Loading.vue';

import Pager from '../../../component/Pager.vue';
import commonService from '../../../common/commonService';
import NoData from '../../../component/NoData.vue';
import Transaction from '../../../component/Transaction.vue';

export default Vue.extend({
    name: "contractInfo",
    template: tpl,
    components: {
        Loading,
        Pager,
        NoData,
        Transaction
    },
    data(){
        return {
            locale: window.app.LANG,
            contract_id: this.$route.params.contract_id || '', // 合约地址

            info: {
                abis: [], //合约函数
                events: [], // 事件
            },

            dealList: [], // 交易列表
            pageNo: 1,
            pageNum: 0,
            pageSize: 10,

            isLoadingBlock: true,
            isLoadingDeal: true,
            coinType: window.url.indexOf('achain') >= 0 ? 'ACT' : 'SSC'
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
            this.fetchContractInfo();
            this.fetchDealRecord();
        }
    },
    mounted(){
        window.scrollTo(0, 0);
        this.fetchContractInfo();
        this.fetchDealRecord();
        document.getElementsByTagName('body')[0].scrollTop = 0;
    },
    methods: {
        fetchContractInfo(){
            this.isLoadingBlock = true;
            commonService.contractInfo({
                "contract_id": this.contract_id
            }).done((rep) => {
                let info = rep.result;
                this.info.addr = info.contract_id;
                this.info.name = info.name;
                this.info.balance = info.balance || '0';
                this.info.margin = info.margin || '0';
                this.info.regTime = info.reg_time;
                this.info.ownerAddress = info.owner_address;
                this.info.ownerName = info.owner_name; // 如果有 替代所有者地址
                this.info.hash = info.hash;
                this.info.description = info.description;
                this.info.abis = info.abis;
                this.info.events = info.events;
                this.info.circulation = info.circulation;
                this.info.urls = info.contract_urls;
                this.info.coin = info.coin;
                // this.coin = info.coin == 1 ? 'COIN' : '非COIN';

                // let languages = this.$i18n ? Object.keys(this.$i18n.messages) : [];

                // languages.forEach((lang)=>{
                    this.info.status = this.$i18n.messages[this.$i18n.locale].contractStatusList[info.status];
                    this.info.coinType = this.$i18n.messages[this.$i18n.locale].contractTypes[info.coin];
                // });

            }).fail((rep) => {
                window.error(rep);
            }).always(() => {
                this.isLoadingBlock = false;
            });
        },

        fetchDealRecord(){
            this.isLoadingDeal = true;
            commonService.tradeList({
                "block_num": 0,
                "acct_address": this.contract_id,
                "page": +this.pageNo,
                "per_page": this.pageSize
            }).done((rep) => {
                this.pageNum = rep.result.totalPage;
                this.dealList = rep.result.dataList;
            }).fail((rep) => {
                window.error(rep);
            }).always(() => {
                this.isLoadingDeal = false;
            });
        },

        // 去搜索结果页
        searchResult(addr, acct){
            if(/CON.+/.test(addr)){  // 合约详情
                this.$router.push({ name: 'contractInfo', params: { contract_id: addr}, query: {cl:1}})
            }else{
                location.href = './index.html#/searchResult?fromAddress='+ addr + '&fromAcct='+ acct;
            }
        },

        changePage(num){
            this.pageNo = +num;
            this.fetchDealRecord();
        }
    }
});
