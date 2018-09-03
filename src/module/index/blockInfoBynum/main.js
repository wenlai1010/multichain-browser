/**
 * Created by donglele on 2017/8/4.
 */

import Vue from 'vue';
import tpl from './tpl.html';
import commonService from '../../../common/commonService';
import Loading from '../../../component/Loading.vue';
import Pager from '../../../component/Pager.vue';
import NoData from '../../../component/NoData.vue';

import Transaction from '../../../component/AllTranList.vue';

export default Vue.extend({
    template: tpl,
    components: {
        Loading,
        Pager,
        NoData,
        Transaction
    },
    data(){
        return {
            block: {},
            tradeList: [],
            condition: {
                pageNo: 1,
                pageSize: 10
            },
            pageNum: 0,

            // param_hash: '',
            currentBlockNum: this.$route.params.blockNum || '',
            // maxBlockNum: 0, // 最大区块数
            isLastBlock: false,
            isLoadingInfo: true,
            isLoadingDeal: true,
        }
    },
    computed: {
        localUrl() {
            window.url = this.$store.state.localUrl;
            return this.$store.state.localUrl;
        }
    },
    created() {
        this.fetchBlockInfo();
        // this.getMaxBlockNum();
    },
    mounted(){
        window.scrollTo(0, 0);
    },
    watch:{
        '$route.params.blockNum'(val,oldVal){
            this.tradeList = [];
            this.fetchBlockInfo();
        },
        localUrl() {
            this.fetchBlockInfo();
        }
    },
    methods: {
        /*
         * 获取区块的总数
         *
         * */
        // getMaxBlockNum(){
        //     commonService.blockMaxNum().done((rep) => {
        //         if(rep.code == 200){
        //             this.maxBlockNum = +rep.result;
        //         }else{
        //             window.error(rep.msg)
        //         }
        //     }).fail((rep) => {
        //         window.error(rep)
        //     })
        // },

        fetchBlockInfo() {
            this.isLoadingInfo = true;
            commonService.blockInfo({
                block_id: '',
                block_num: +this.currentBlockNum,
            }).done((rep) => {
                if(rep.code == 200){
                    this.block = rep.result;
                }
            }).fail((rep) => {
                window.error(rep);
            }).always(() => {
                this.isLoadingInfo = false;
                this.fetchTradeInfo();
            });
        },
        /*
         * 通过区块hash显示查找交易列表
         *
         * */
        fetchTradeInfo() {
            this.isLoadingDeal = true;

            let param = {
                'block_num': +this.currentBlockNum,
                'acct_address': '',
                'page': +this.condition.pageNo,
                'per_page': this.condition.pageSize
            }
            commonService.tradeList(param).done((rep) => {
                if(rep.code == 200){
                    if(!rep.result.dataList.length){
                        return;
                    }
                    this.pageNum = rep.result.totalPage;
                    this.tradeList = rep.result.dataList;
                }else{
                    window.error(rep.msg)
                }
            }).fail((rep) => {
                window.error(rep);
            }).always(() => {
                this.isLoadingDeal = false;
            });
        },

        /*
         * 查找上一个区块
         *
         * */
        showPrevBlock() {
            if (+this.currentBlockNum === 1) {
                window.toast(this.$t('lastBlockTip'));
                return;
            }
            this.currentBlockNum = +this.currentBlockNum - 1;

            this.$router.push({name: 'blockInfo', params:{blockNum: +this.currentBlockNum}});
        },

        /*
         * 查找下一个区块
         *
         * */
        showNextBlock() {
            this.isLoadingInfo = true;

            commonService.blockInfo({
                block_id: '',
                block_num: +this.currentBlockNum+1,
            }).done((rep) => {
                if(rep.code == 200){
                    let isLastBlock = !Object.keys(rep.result).length ? true : false;

                    if(isLastBlock) {
                        window.toast(this.$t('lastBlockTip')); return;
                    } else {
                        this.currentBlockNum = +this.currentBlockNum + 1;
                        this.$router.push({name: 'blockInfo', params:{blockNum: +this.currentBlockNum}});
                    }
                }
            }).fail((rep) => {
                window.error(rep);
            }).always(() => {
                this.isLoadingInfo = false;
                this.fetchTradeInfo();
            });
        },

        // 跳转区块代理页
        toBlockAgent(parm){
            this.$router.push({ name: 'BlockAgent', params: { signee: parm }})
        },

        /**
         * 分页
         * @param pageNo
         */
        changePage(pageNo) {
            this.condition.pageNo = pageNo;
            this.fetchTradeInfo();
        }
    }
});

