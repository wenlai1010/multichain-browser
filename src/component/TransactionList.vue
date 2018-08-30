<template>
    <div class="transacList">
        <div v-for="item in fliterDealList" class="me-deal-ul">
            <!-- <span style="width: 43%" class="me-deal-item">
                <a @click="toTradeInfo(item.trx_id)">{{item.trx_id}}</a>
            </span>
            <div style="width: 23%" class="me-deal-item" :class="item.is_completed !== '0'?'contract_fail':''">
                {{ item.trx_type }}&nbsp;&nbsp;<span v-if="item.is_completed !== '0'">( {{ $t("fail") }} )</span>
            </div>
            <span style="width: 18%" class="me-deal-item">{{item.coinType ? +item.amount + ' ' + item.coinType : '--'}}</span>
            <span style="width: 14.5%" class="me-deal-item gray-data">{{item.trx_time|locale-time}}</span>
            <div class="me-deal-trade">
                <span class="trade-from">
                    <a @click="searchResult(item.from_addr,'')" v-if="!item.from_acct">{{item.from_addr}}</a>
                    <a @click="searchResult(item.from_addr, item.from_acct)" v-else>{{item.from_acct}}</a>
                </span>
                <span class="trade-arrow"><img src="img/arrow.png" alt=""></span>
                <span class="trade-to">
                    <a @click="searchResult(item.to_addr, '')" v-if="!item.to_acct">{{item.to_addr}}</a>
                    <a @click="searchResult(item.to_addr, item.to_acct)" v-else>{{item.to_acct}}</a>
                </span>
            </div> -->
            <div class="me-deal-ul-hover  fn-clearfix">
                <img class="me-deal-logo" src="../img/deal-item.png" alt="">
                <section class="me-deal-left">
                    <a @click="toTradeInfo(item.trx_id)">{{item.trx_id_last}}</a>
                    <div class="me-deal-trade">
                        <span>From </span>
                        <span class="trade-from">
                            <a @click="searchResult(item.from_addr,'')" v-if="!item.from_acct_last">{{item.from_addr_last}}</a>
                            <a @click="searchResult(item.from_addr, item.from_acct_last)" v-else>{{item.from_acct_last}}</a>
                        </span>
                        <span> To </span>
                        <span class="trade-to">
                            <a @click="searchResult(item.to_addr, '')" v-if="!item.to_acct_last">{{item.to_addr_last}}</a>
                            <a @click="searchResult(item.to_addr, item.to_acct)" v-else>{{item.to_acct_last}}</a>
                        </span>
                    </div>

                    <p class="me-deal-item">Amount&nbsp;&nbsp;
                          <span v-if="item.coinType"> {{item.amount + ' ' + item.coinType}}</span>
                          <i v-else>--</i>
                    </p>
                </section>
                <p class="me-deal-right gray-data">{{item.trx_elapsed_time}}</p>
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
                    // if(deal.from_addr&&deal.from_addr.length>=10){
                        arr[index].from_addr_last = deal.from_addr.substr(0,10)+"...";
                    // }
                    // if(deal.to_addr&&deal.to_addr.length>=12){
                        arr[index].to_addr_last = deal.to_addr.substr(0,12)+"...";
                    // }
                    // if(deal.trx_id&&deal.trx_id.length>=18){
                        arr[index].trx_id_last = deal.trx_id.substr(0,18)+"......";
                    // }
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
                // console.log(this.fliterDealList,'from_addr======')
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
                // if (page === '/index.html' || page === '/') {
                    this.$router.push({name: 'tradeInfo', params: {tradeId: parm}})
                // } else if (page === '/contract.html') {
                //     location.href = '/index.html#/tradeInfo/' + parm;
                // }
            }
        }
    }
</script>
