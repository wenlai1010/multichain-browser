<template>
    <div class="transacList">
        <div v-for="item in fliterDealList" class="m-deal-tr">
            <span style="width: 43%" class="m-deal-item">
                <a @click="toTradeInfo(item.trx_id)">{{item.trx_id}}</a>
            </span>
            <div style="width: 23%" class="m-deal-item" :class="item.is_completed !== '0'?'contract_fail':''">
                {{ item.trx_type }}&nbsp;&nbsp;<span v-if="item.is_completed !== '0'">( {{ $t("fail") }} )</span>
            </div>
            <span style="width: 18%" class="m-deal-item">{{item.coinType ? +item.amount + ' ' + item.coinType : '--'}}</span>
            <span style="width: 14.5%" class="m-deal-item gray-data">{{item.trx_time|locale-time}}</span>
            <div class="m-deal-trade">
                <span class="trade-from">
                    <a @click="searchResult(item.from_addr,'')" v-if="!item.from_acct">{{item.from_addr}}</a>
                    <a @click="searchResult(item.from_addr, item.from_acct)" v-else>{{item.from_acct}}</a>
                </span>
                <span class="trade-arrow"><img src="img/arrow.png" alt=""></span>
                <span class="trade-to">
                    <a @click="searchResult(item.to_addr, '')" v-if="!item.to_acct">{{item.to_addr}}</a>
                    <a @click="searchResult(item.to_addr, item.to_acct)" v-else>{{item.to_acct}}</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        props: ['dealList'],
        data() {
            return {
                fliterDealList: []
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
