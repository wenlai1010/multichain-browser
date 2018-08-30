/**
 * Created by donglele on 2017/2/16.
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
            acct_address: this.$route.query.fromAddress || '',
            acct_name: this.$route.query.fromAcct || '',

            btnContext: this.$tc('btnContext', 1),
            hasMore: true, // 更多的账户有余额
            isActive: false, // 账户余额是否展开
            balanceList: [], // 账户余额列表
            ssc_balance:'',
            jr_blance:'',
            tradeList: [],
            condition: {
                pageNo: 1,
                pageSize: 10
            },
            pageNum: 0,
            isLoading: false,
        }
    },
    created() {
        this.fetchBalance();
        this.fetchTradeInfo();
    },
    mounted(){
        window.scrollTo(0, 0);
    },
    watch: {
        '$route.query.fromAddress'(val,oldVal){
            this.updateQuery();
        },
        '$route.query.fromAcct'(val,oldVal){
            this.updateQuery();
        }
    },
    methods: {
        updateQuery(){
            this.tradeList = [];
            this.hasMore = true;
            this.acct_address = this.$route.query.fromAddress || '';
            this.acct_name = this.$route.query.fromAcct || '';
            this.fetchBalance();
            this.fetchTradeInfo();
        },
        toMore(){
            if(!this.hasMore){
                return;
            }
            this.isActive = !this.isActive;
            if(this.isActive){
                this.btnContext = this.$tc('btnContext', 2);
            }else{
                this.btnContext = this.$tc('btnContext', 1);
            }
        },

        // 获取账户余额
        fetchBalance(){
            commonService.userBalance({
                address: this.acct_address
            }).done(rep =>{
                this.balanceList = rep.data;
                this.balanceList.coinType = this.balanceList.coinType=='JRT'?'JR10':this.balanceList.coinType;
                if( this.balanceList.length<=3 ) this.hasMore = false;
            })
        },

        /*
         * 通过账户地址显示查找交易信息
         *
         * */
        fetchTradeInfo() {
            this.isLoading = true;
            commonService.tradeList({
                block_num: 0,
                acct_address: this.acct_address,
                page: this.condition.pageNo,
                per_page: this.condition.pageSize
            }).done((rep) => {
                if(rep.code == 200){
                    if(!rep.result.dataList){
                        window.toast(this.$t('noData'));
                        return;
                    }
                    this.tradeList = rep.result.dataList;
                    this.pageNum = rep.result.totalPage;
                }else{
                    window.error(rep.msg);
                }
            }).fail((rep) => {
                window.error(rep);
            }).always(() => {
                this.isLoading = false;
            });
        },


        // 跳转交易详情页
        toTradeInfo(parm){
            this.$router.push({ name: 'tradeInfo', params: { tradeId: parm }})
        },

        /**
         * 分页
         * @param pageNo
         */
        changePage(pageNo) {
            this.condition.pageNo = +pageNo;
            this.fetchTradeInfo();
        }
    }
});


