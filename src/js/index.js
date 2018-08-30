/**
 * Created by donglele on 2017/1/20.
 */


import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import messages from '../module/index/lang';

import './base/init';
import Loading from '../component/Loading.vue';
import Index from '../module/index/main';
import BlockInfo from '../module/index/blockInfoBynum/main'
import TradeInfo from '../module/index/tradeInfo/main'
import SearchResult from '../module/index/searchResult/main'
import BlockAgent from '../module/index/blockAgent/main'
import BlockList from '../module/index/blockList/main'
import DealList from '../module/index/dealList/main'
import Ranking from '../module/index/ranking/main'
// import ContractInfo from '../module/index/contractInfo/main'

Vue.use(VueI18n);

let i18n =  new VueI18n({
    locale: window.app.LANG,
    messages, // set locale messages
});
const router = new VueRouter({
    'routes': [
        {
            path: '/',
            name: 'index',
            component: Index,
            beforeEnter(to, from, next){
                if(from.path != '/'){
                  window.location.href="./index.html";
                }else{
                    next();
                }
            }
        },
        {
            path: '/BlockInfo/:blockNum',
            name: 'blockInfo',
            component: BlockInfo
        },
        {
            path: '/tradeInfo/:tradeId',
            name: 'tradeInfo',
            component: TradeInfo
        },
        {
            path: '/searchResult',
            name: 'searchResult',
            component: SearchResult
        },
        {
            path: '/blockAgent/:signee',
            name: 'BlockAgent',
            component: BlockAgent
        },
        {
            path: '/blockList',
            name: 'blockList',
            component: BlockList
        },
        {
            path: '/dealList',
            name: 'dealList',
            component: DealList
        },
        {
            path: '/ranking/:coinType',
            name: 'ranking',
            component: Ranking
        }
        // {
        //     path: '/contractInfo/:contract_id',
        //     name: 'contractInfo',
        //     component: ContractInfo
        // }
    ]
});


const app = new Vue({
    router,
    i18n,
    components: {
        Loading,
    },
    created() {
        this.changeMenu();
    },

    methods: {
        changeMenu() {
            $('.home-nav').text(this.$t('home'));
            // $('.blockchain-nav').text(this.$t('blockchain'));
            $('.blockchain-blockList-nav').text(this.$t('blockList'));
            $('.blockchain-dealList-nav').text(this.$t('dealList'));
            $('.blockchain-ranking-nav').text(this.$t('ranking'));
            // $('.wallet-broadcast-nav').text(this.$t('walletBroadcast'));
            // $('.corp-mail').text(this.$t('corpMail'));
            // $('.site-lang').text(this.$t('lang'));
            document.title = this.$t('siteTitle');


            $('.blockchain-nav').text(this.$t('achain'));
        },
    }
}).$mount('#app');
