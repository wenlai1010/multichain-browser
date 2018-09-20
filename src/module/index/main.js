/**
 * @file
 * @auth donglele
 * @date 2017/2/15
 */

import Vue from 'vue';
import tpl from './tpl.html';

import commonService from '../../common/commonService';
import Loading from '../../component/Loading.vue';
import TransactionList from '../../component/TransactionList.vue';
import format from '../../common/format';

// window.onpageshow = function(){

//     window.location.href = location.href;
// }

export default Vue.extend({
    name: 'index',
    template: tpl,
    data(){
        return {
            searchTxt : '',
            isHover:false,
            dealList: [],
            blockList: [],
            blockList0 : [],
            blockList1 : [],
            blockList2 : [],
            blockList3 : [],
            blockList4 : [],
            isLoadingBlock: true,
            isLoadingDeal: true,
            isShow: true

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
            this.renderBlockList();
            this.renderDealList();
        }
    },
    created() {
        window.scrollTo(0,0);
        this.renderBlockList();
        this.renderDealList();
    },
    components: {
        // BlockInfo,
        Loading,
        TransactionList
    },
    methods: {
        // 关键字搜索
        toSearch(){
            if(!this.searchTxt){
                window.toast(this.$t('typeSearch'));
                return;
            }else if(this.searchTxt<=0){
                window.toast(this.$t('noData'));
                return;
            }
            commonService.queryType({"keyword" : this.searchTxt}).done((rep)=>{
                if(rep.code == 200){
                    if(rep.result.record_num==0){
                        window.toast(this.$t('noData'));
                        return;
                    }
                    let searchType = rep.result.query_type;
                    if(searchType == 0){ // 区块hash
                        let block_num = rep.result.block_num; // 当查询区块hash时 返回区块高度再跳转区块详情页
                        this.$router.push({ name: 'blockInfo', params: { blockNum: block_num }})
                    }else if(searchType == 1){ // 区块高度
                        this.$router.push({ name: 'blockInfo', params: { blockNum: this.searchTxt }})
                    }else if(searchType == 2){ // 交易id
                        this.$router.push({ name: 'tradeInfo', params: { tradeId: this.searchTxt }})
                    }else if(searchType == 3){ // 账户地址
                        this.$router.push({ name: 'searchResult', query: { fromAddress: this.searchTxt }})
                    }else if(searchType == 4){ // 账户名称
                        let user_address = rep.result.user_address;
                        this.$router.push({ name: 'searchResult', query: { fromAddress: user_address,fromAcct:this.searchTxt}})
                    }else if(searchType == 5){ // 合约
                        location.href = './contract.html#/contractInfo/'+ this.searchTxt +'?cl=1';
                        // this.$router.push({ name: 'contractInfo', params: { contract_id: this.searchTxt}, query: {cl:1}})
                    }else{
                        window.toast(this.$t('noData'));
                    }
                }else{
                    window.error(rep.msg)
                }
            }).fail((rep)=> {
                window.error(rep);
            });
        },

        // 轮询区块列表
        renderBlockList(){
            this.isLoadingBlock = false;
            commonService.onLoopBlockList((rep)=>{
                console.log('',rep);
                this.isLoadingBlock = false;
                if(rep.code==200){
                    if(!rep.result.dataList.length){
                        // window.toast(this.$t('noData'));
                        return;
                    }
                    this.blockList = rep.result.dataList;
                    (rep.result.dataList.length) && rep.result.dataList.forEach((item,index)=>{
                        if(index==0){
                             this.blockList0[index] = item;
                        }
                        if(index>=1 && index<=3){
                            this.blockList1[index-1] = item;
                        }else if(index>=4 && index<=6){
                            this.blockList2[index-4] = item;
                        }else if(index>=7 && index<=9){
                            this.blockList3[index-7] = item;
                        }else{
                            this.blockList4[index-10] = item;
                        }
                    });
                    this.blockList2.reverse();
                    this.blockList4.reverse();

                    setTimeout(()=>{
                        if(document.getElementsByClassName("me-animated").length!=0){
                            $('.mefadeOutRight').css({transform:'translateX(192px)'});
                            $('.mefadeOutLeft').css({transform:'translateX(-192px)'});
                            $('.mefadeOutDown').css({transform:'translateY(182px)'});
                            $('.fastDown').css({transform:'translateY(182px)',opacity:1});
                            $('.fastLeft').css({transform:'translateX(-192px)',opacity:0});

                            $('.me-animated').css({transition:'all 1.5s'});
                            $('.only-animated').css({transition:'all 0.2s'});
                            // $('.fast-animated').css({animation: 'mefastdown 1.5s'});
                        }
                    },10);
                    if(document.getElementsByClassName("me-animated").length!=0){
                        $(".mefadeOutRight").removeAttr("style");
                        $(".mefadeOutLeft").removeAttr("style");
                        $(".mefadeOutDown").removeAttr("style");
                        $(".fastDown").removeAttr("style");
                        $(".fastLeft").removeAttr("style");
                        $(".me-animated").removeAttr("style");
                        $(".only-animated").removeAttr("style");
                        $(".fast-animated").removeAttr("style");
                    }
                }else if(rep.msg){
                    window.error(rep.msg);
                }
            },err=>{
                console.log('err...:',err);
            })
        },

        // 轮询协议列表
        renderDealList(){
            this.isLoadingDeal = true;
            commonService.onLoopDealList((rep)=>{
                this.isLoadingDeal = false;
                if(rep.code==200){
                    if(!rep.result.dataList.length){
                        // window.toast(this.$t('noData'));
                        return;
                    }
                    this.dealList = rep.result.dataList;
                }else if(rep.msg){
                    window.error(rep.msg)
                }
            })
        },

        // 跳转区块详情页
        toBlockInfo(parm){
            this.$router.push({ name: 'blockInfo', params: { blockNum: parm }})
        },


        // 去搜索结果页
        searchResult(addr, acct){
            if(/CON.+/.test(addr)){  // 合约详情
                location.href = './contract.html#/contractInfo/'+ addr +'?cl=1'
            }else{
                this.$router.push({ name: 'searchResult', query: { fromAddress: addr, fromAcct: acct}})
            }
        },

        // 跳转区块代理页
        toBlockAgent(parm){
            this.$router.push({ name: 'BlockAgent', params: { signee: parm }})
        },

        // 去区块列表
        toBlockList(){
            this.$router.push({ name: 'blockList'});
        },

        // 去交易列表
        toDealList(){
            this.$router.push({ name: 'dealList'});
        }
    }
});
