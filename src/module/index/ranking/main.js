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
import AssetDrop from '../../../component/AssetDrop.vue';
import mathtools from '../../../common/mathtool.js';

export default Vue.extend({
    template: tpl,
    components: {
        Loading,
        Pager,
        NoData,
        AssetDrop
    },
    data(){
        return {
            mathtools: mathtools,
            agentName: this.$route.params.signee || '',
            coinType: this.$route.params.coinType || '',
            blockList:[],
            condition: {
                pageNo: 1,
                pageSize: 25
            },
            pageNum: 0,
            coinList:null,
            isLoading:true,
            isShow: true,
            currentPage: 0
        }
    },
    created() {
        this.fetchCoinList();
        this.fetchBlockList();
    },

    mounted(){
        window.scrollTo(0,0);
    },
    methods: {
        fetchBlockList(){
            this.isLoading = true;
            let param = {
                'coinType':this.coinType.replace(/JR10/i,'JRT'),
                'page':+this.condition.pageNo,
                'per_page':this.condition.pageSize
            };
            commonService.SortList(param).done((rep) => {
                if(rep.code == 200){
                    if(!rep.result.dataList){
                        window.toast(this.$t('noData'));
                        return;
                    }
                    this.blockList = rep.result.dataList;
                    this.currentPage = rep.result.currentPage-1;
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
        },
        changeCoinType(coinType){
            this.coinType = coinType;
            this.$router.push({ name: 'ranking', params: { coinType: this.coinType }});
            this.reload();
        },
        fetchCoinList(){
            commonService.SortTotalList().done(rep=>{
                if(rep.code === 200){
                    let results = [];
                    $.map(rep.result, item => {
                        results.push(item.replace(/JRT/i,'JR10'));
                    });
                    this.coinList = results;
                    this.coinList.sort();
                }
            });
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


