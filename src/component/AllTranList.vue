<template>
    <div class="transacList">
        <div class="mall-deal-tr" v-show="titleShow">
            <span class="mall-deal-item data-bold" style="width: 27%">{{ $t("dealTxHash") }}</span>
            <span class="mall-deal-item data-bold" style="width: 25.7%">{{ $t("dealtime") }}</span>
            <span class="mall-deal-item data-bold" style="width: 15.7%">{{ $t("dealFrom") }}</span>
            <span class="mall-deal-item data-bold" style="width: 14.5%">{{ $t("dealTo") }}</span>
            <span class="mall-deal-item data-bold">{{ $t("dealValue") }}</span>
        </div>
        <div v-for="item in fliterDealList" class="mall-deal-tr">
            <span style="width: 27.34%;position:relative;" class="mall-deal-item">
                <a class="mall-deal-item-underline" @click="toTradeInfo(item.trx_id)">{{item.trx_id_last}}</a>
                <div class="mall-deal-item-content">{{item.trx_id}}</div>
            </span>
            <span style="width: 25.33%" class="mall-deal-item gray-data">{{item.trx_time|locale-time}}</span>
            <span class="trade-from mall-deal-item" style="width: 9.33%;position:relative;">
                <a @click="searchResult(item.from_addr,'')" v-if="!item.from_acct_last">{{item.from_addr_last}}</a>
                <a @click="searchResult(item.from_addr, item.from_acct)" v-else>{{item.from_acct_last}}</a>
                <div class="mall-deal-item-content" style="left: 0;" v-if="!item.from_acct_last">{{item.from_addr}}</div>
                <div class="mall-deal-item-content" style="left: 0;" v-else>{{item.from_acct}}</div>
            </span>
            <span class="trade-arrow mall-deal-item" style="width: 6.17%;text-align: center;"><img src="img/deal-arrow.png" alt=""></span>
            <span class="trade-to mall-deal-item" style="width: 14.33%;position:relative;">
                <a @click="searchResult(item.to_addr, '')" v-if="!item.to_acct_last">{{item.to_addr_last}}</a>
                <a @click="searchResult(item.to_addr, item.to_acct)" v-else>{{item.to_acct_last}}</a>
                <div class="mall-deal-item-content" style="left: 0;" v-if="!item.to_acct_last">{{item.to_addr}}</div>
                <div class="mall-deal-item-content" style="left: 0;" v-else>{{item.to_acct}}</div>
            </span>
            <span class="mall-deal-item gray-value">{{item.coinType ? +item.amount + ' ' + item.coinType : '--'}}</span>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        props: ['dealList','titleShow'],
        data() {
            return {
                fliterDealList: [],
                titleShow: true
            }
        },
        created(){
            this.listFliter();
        },
        mounted() {

        },

        methods: {
            // 处理列表结果
            listFliter(){
                let vm = this;
                let arr = this.dealList;
                arr.forEach(function (deal, index) {
                    arr[index].from_addr_last = deal.from_addr.substr(0,15)+"...";
                    arr[index].to_addr_last = deal.to_addr.substr(0,15)+"...";
                    arr[index].trx_id_last = deal.trx_id.substr(0,21)+"......";
                    deal.coinType = deal.coinType=='JRT'?'JR10':deal.coinType;
                    let dtype = deal.trx_type;
                    let dealType = vm.$i18n.messages[vm.$i18n.locale].transacTypes[dtype];
                    switch (dtype) {
                        case '0':
                            dealType = deal.coinType + ' ' + dealType;
                            break;
                        case '14':
                            dealType = deal.coinType + ' ' + (deal.called_abi == 'transfer_to' ? vm.$i18n.messages[vm.$i18n.locale].transfer : deal.called_abi);
                            break;
                    }
                    arr[index].trx_type = dealType;
                });
                this.fliterDealList = arr;
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


            // 跳转交易详情页
            toTradeInfo(parm){
                let page = location.pathname;
                if (page === '/index.html' || page === '/') {
                    this.$router.push({name: 'tradeInfo', params: {tradeId: parm}})
                } else if (page === '/contract.html') {
                    location.href = '/index.html#/tradeInfo/' + parm;
                }
            }
        }
    }
</script>
<style lang="sass" rel="stylesheet/scss">
    .mall-deal-item-underline{
        color: #6c71ff;
    }
    .mall-deal-item-content{
        width: 300px;
        line-height: 20px;
        position: absolute;
        top: 40px;
        left: 19px;
        background: #ffffff;
        border: 1px solid #6c6a6a;
        border-radius: 3px;
        padding: 5px;
        z-index:1000;
        word-wrap:break-word;
        visibility: hidden;
        &:before{
            content: "";
            width: 0;
            height: 0;
            font-size: 0;
            overflow: hidden;
            position: absolute;
            border-width: 8px;
            border-style: solid dashed dashed;
            border-color: transparent transparent #6c6a6a transparent;
            left: 19px;
            top: -17px;
        }
        &:after{
            content: "";
            width: 0;
            height: 0;
            font-size: 0;
            overflow: hidden;
            position: absolute;
            border-width: 10px;
            border-style: solid dashed dashed;
            border-color: transparent transparent #fff transparent;
            left: 17px;
            top: -18px;
        }
    }
    .mall-deal-item:hover .mall-deal-item-content{
        visibility: visible;
    }
</style>
