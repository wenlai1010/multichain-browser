/**
 * Created by zhangyanbo on 2016/12/30.
 */
import Vue from 'vue';
import tpl from './tpl.html';
import commonService from '../../../common/commonService';
import Loading from '../../../component/Loading.vue';
import Pager from '../../../component/Pager.vue';
import NoData from '../../../component/NoData.vue';

export default Vue.extend({
    name: "blockInfo",
    template: tpl,
    components: {
        Loading,
        Pager,
        NoData
    },

    data(){
        return {
            locale: window.app.LANG,
            tradeId: this.$route.params.tradeId || '',
            trade:[],
            extended: {
                pageNo: 1,
                pageSize: 10
            },
            pageNum: 0,
            extTrades: {actTransactionExList: []},
            isLoading:true,

            // isShowContract:false, // 是否显示合约出账
            // tempTransactionId:'',
            // contractList:{}
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
            this.fetchTradeInfo();
        }
    },
    created() {
        this.fetchTradeInfo();
    },
    mounted(){
        window.scrollTo(0,0);
    },
    methods: {
        /*
         * 通过交易id显示查找交易信息
         *
         * */
        fetchTradeInfo() {
            this.isLoading = true;
            commonService.tradeInfo({
                trx_id: this.tradeId,
                page: this.extended.pageNo,
                per_page: this.extended.pageSize
            }).done((rep) => {
                if(rep.code == 200){
                    this.trade = rep.result;
                    let tempTrade = rep.result;
                    this.extTrades = rep.result.ActTransactionExs;
                    this.pageNum = this.extTrades ? this.extTrades.totalPage : 0;
                    tempTrade.coin_type = tempTrade.coin_type=='JRT'?'JR10':tempTrade.coin_type;
                    tempTrade.memo = tempTrade.memo.replace(/JRT/g,'JR10');
                    let dtype = tempTrade.trx_type; // 交易类型
                    let etype = tempTrade.event_type;
                        let dealType = this.$i18n.messages[this.$i18n.locale].transacTypes[dtype];
                        switch( dtype ){
                            case 0:
                                dealType = tempTrade.coin_type + ' ' + dealType;
                                break;
                            case 14:
                                dealType = tempTrade.coin_type + ' ' + (tempTrade.called_abi == 'transfer_to' ? this.$i18n.messages[this.$i18n.locale].transfer : tempTrade.called_abi);
                                // dealType = tempTrade.coin_type + ' ' + tempTrade.called_abi;
                                break;
                        }
                        this.trade.trx_type = dealType;
                        if( etype == 'transfer_to_fail' ) this.trade.transResult = this.$t('fail');
                        else if( etype == 'transfer_to_success' ) this.trade.transResult = this.$t('success');

                }else{
                    window.error(rep.msg)
                }
            }).fail((rep) => {
                window.error(rep);
            }).always(()=>{
                this.isLoading = false;
            });
        },

        // 去搜索结果页
        searchResult(addr, acct){
            if(/CON.+/.test(addr)){  // 合约详情
                location.href = './contract.html#/contractInfo/'+ addr +'?cl=1'
            }else{
                this.$router.push({ name: 'searchResult', query: { fromAddress: addr, fromAcct: acct}})
            }
        },

        // 跳转区块详情页
        toBlockInfo(parm){
            this.$router.push({ name: 'blockInfo', params: { blockNum: parm }})
        },

        /*
        *
        *合约出账信息展示
        * */
        // fetchTransactionExInfo() {
        //     this.isLoading = true;
        //     let param = {
        //         'orig_trx_id':this.tempTransactionId,
        //         'page':+this.condition.pageNo,
        //         'per_page':this.condition.pageSize
        //         // 'orig_trx_id':'b75084b1eaaf14898ec8ff74fe57bda438328192'
        //     }
        //     commonService.transactionExInfo(param).done((rep) => {
        //         this.pageNum = Math.ceil(rep.result.total/this.condition.pageSize);
        //         if(rep.result.data.length) {
        //             this.isShowContract = true;
        //             this.contractList = rep.result.data;
        //         }
        //     }).fail((rep) => {
        //         this.isShowContract = false;
        //         window.error("网络异常，请稍后再试");
        //
        //     }).always(()=>{
        //         this.isLoading = false;
        //     });
        // },
        /**
         * 分页
         * @param pageNo
         */
        changePage(pageNo) {
            // localStorage.TradePageNo = +pageNo;
            this.extended.pageNo = +pageNo;
            this.fetchTradeInfo();
        },
        // 去搜索结果页
        searchResult(addr, acct){
            let page = location.pathname;
            if (page === '/index.html' || page === '/') {
                if (/CON.+/.test(addr)) {
                    location.href = './contract.html#/contractInfo/' + addr + '?cl=1';
                } else {
                    this.$router.push({name: 'searchResult', query: {fromAddress: addr, fromAcct: acct}})
                }
            } else if (page === '/contract.html') {
                if (/CON.+/.test(addr)) {
                    this.$router.push({name: 'contractInfo', params: {contract_id: addr}, query: {cl: 1}})
                } else {
                    location.href = './index.html#/searchResult?fromAddress=' + addr + '&fromAcct=' + acct;
                }
            }
        },
    }
});
