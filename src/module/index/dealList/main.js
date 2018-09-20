/**
 * Created by donglele on 2017/8/9.
 */
import Vue from 'vue';
import tpl from './tpl.html';
import commonService from '../../../common/commonService';
import Loading from '../../../component/Loading.vue';
import Pager from '../../../component/Pager.vue';
import NoData from '../../../component/NoData.vue';
import AllTranList from '../../../component/AllTranList.vue';


export default Vue.extend({
    template: tpl,
    components: {
        Loading,
        Pager,
        NoData,
        AllTranList
    },
    data(){
        return {
            dealList: [],
            condition: {
                pageNo: 1,
                pageSize: 10
            },
            pageNum: 0,
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
            this.condition = {
                pageNo: 1,
                pageSize: 10
            };
            this.fetchDealList();
        }
    },
    created() {
        this.fetchDealList();
    },
    mounted(){
        window.scrollTo(0, 0);
    },

    methods: {
        /*
         * 查询交易列表
         *
         * */
        fetchDealList() {
            this.isLoading = true;
            commonService.LoopDealList({
                page: +this.condition.pageNo,
                per_page: this.condition.pageSize
            }).done((rep) => {
                if(rep.code == 200){
                    if(!rep.result.dataList){
                        window.toast(this.$t('noData'));
                        return;
                    }
                    this.pageNum = rep.result.totalPage;
                    this.dealList = rep.result.dataList;
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
            this.fetchDealList();
        }
    }
});
