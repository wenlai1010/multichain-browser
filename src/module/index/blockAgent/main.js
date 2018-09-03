/**
 * Created by zhangyanbo on 2017/2/21.
 */

/**
 * @file
 * @auth donglele
 * @date 2016/2/21
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
            agentName:this.$route.params.signee || '',
            blockList:[],
            condition: {
                pageNo: 1,
                pageSize: 10
            },
            pageNum: 0,

            isLoading:true,
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
            this.fetchBlockList();
        }
    },
    created() {
        this.fetchBlockList();
    },

    mounted(){
        window.scrollTo(0,0);
    },
    methods: {
        fetchBlockList(){
            this.isLoading = true;
            let param = {
                'signee':this.agentName,
                'page':+this.condition.pageNo,
                'per_page':this.condition.pageSize
            };
            commonService.blockAgent(param).done((rep) => {
                if(rep.code == 200){
                    if(!rep.result.dataList){
                        window.toast(this.$t('noData'));
                        return;
                    }
                    this.blockList = rep.result.dataList;
                    this.pageNum = rep.result.totalPage;
                }else{
                    window.error(rep.msg)
                }
            }).fail((rep) => {
                window.error(rep);
            }).always(()=>{
                this.isLoading = false;
            });
        },

        // 跳转到区块详情
        toBlockInfo(parm){
            this.$router.push({ name: 'blockInfo', params: { blockNum: parm }})
        },
        /**
         * 分页
         * @param pageNo
         */
        changePage(pageNo) {
            this.condition.pageNo = pageNo;
            this.fetchBlockList();
        }
    }
});


