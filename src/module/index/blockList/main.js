/**
 * Created by donglele on 2017/8/9.
 */
import Vue from 'vue';
import tpl from './tpl.html';
import commonService from '../../../common/commonService';
import Loading from '../../../component/Loading.vue';
import Pager from '../../../component/Pager.vue';
import NoData from '../../../component/NoData.vue';

export default Vue.extend({
    template: tpl,
    components: {
        Loading,
        Pager,
        NoData
    },
    data(){
        return {
            blockList: [],
            condition: {
                pageNo: 1,
                pageSize: 10
            },
            pageNum: 0,
            url: window.url,
            isLoading: true,
        }
    },
    computed: {
        localUrl() {
            window.url = this.$store.state.localUrl;
            alert(this.$store.state.localUrl);
            return this.$store.state.localUrl;
        }
    },
    watch: {
        localUrl() {
            this.fetchBlockList();
        }
    },
    created() {
        this.fetchBlockList();
    },
    mounted(){
        window.scrollTo(0, 0);
    },
    methods: {
        /*
         * 查询区块列表
         *
         * */
        fetchBlockList() {
            this.isLoading = true;
            commonService.LoopBlockList({
                page: +this.condition.pageNo,
                per_page: this.condition.pageSize
            }).done((rep) => {
                if(rep.code == 200){
                    if(!rep.result.dataList){
                        window.toast(this.$t('noData'));
                        return;
                    }
                    this.pageNum = rep.result.totalPage;
                    this.blockList = rep.result.dataList;
                }else{
                    window.error(rep.msg);
                }
            }).fail((rep) => {
                window.error(rep);
            }).always(() => {
                this.isLoading = false;
            });
        },

        // 跳转区块代理页
        toBlockAgent(parm){
            this.$router.push({ name: 'BlockAgent', params: { signee: parm }})
        },

        // 跳转区块详情页
        toBlockInfo(parm){
            this.$router.push({ name: 'blockInfo', params: { blockNum: parm }})
        },

        /**
         * 分页
         * @param pageNo
         */
        changePage(pageNo) {
            this.condition.pageNo = +pageNo;
            this.fetchBlockList();
        }
    }
});



