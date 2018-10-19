/**
 * Created by donglele on 2017/1/20.
 */


import Vue from 'vue';
// import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import messages from '../module/index/lang';
import Config from '../config/config';

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

import store from '../module/index/store';
import Commonservice  from '../common/commonService';

Vue.use(VueI18n);
// Vue.use(Vuex);
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
                // if(from.path != '/'){
                  // window.location.href="./index.html";
                // }else{
                    next();
                // }

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
    store,
    components: {
        Loading,
    },
    // computed: {
    //     localUrl() {
    //         window.url = this.$store.state.localUrl;
    //         return this.$store.state.localUrl;
    //     }
    // },
    created() {
        this.changeMenu();
        this.getPath();
    },
    mounted(){
        let that = this;
        $("#logoHref").click(function(){
            that.$router.push('/');
        });
    },
    watch: {
        '$route':'getPath',
        // localUrl() {
        //     this.changeMenu();
        //     this.getPath();
        // }
    },
    methods: {
        changeMenu(key) {
            $('.home-nav').text(this.$t('home'));
            // $('.blockchain-nav').text(this.$t('blockchain'));
            $('.blockchain-blockList-nav').text(this.$t('blockList'));
            $('.blockchain-dealList-nav').text(this.$t('dealList'));
            $('.blockchain-ranking-nav').text(this.$t('ranking'));
            // $('.wallet-broadcast-nav').text(this.$t('walletBroadcast'));
            // $('.corp-mail').text(this.$t('corpMail'));
            // $('.site-lang').text(this.$t('lang'));
            if(key != undefined){
                $(".browser-select").css('visibility','hidden');
                $(".browser-select").css('opacity','0');
                $(".browser-select").css('transform','translateY(0)');
            }
            if(sessionStorage.getItem('chain') == 'ssc' || key == 'ssc'){
                document.title = this.$t('siteTitleSsc');
                var linkEle = document.getElementById("link1");

                linkEle.href = './img/favicon.ico';
                $('#logo').attr('src','./img/selfsell-logo.png');
                $('.blockchain-nav').text(this.$t('selfsell'));
                this.$store.commit('changeUrl',Config.baseUriSsc);
            }else{
                $('.blockchain-nav').text(this.$t('achain'));
                document.title = this.$t('siteTitleAchain');
                var linkEle = document.getElementById("link1");

                linkEle.href = './img/favicon-a.ico';
                $('#logo').attr('src','./img/achain-logo.png');
                this.$store.commit('changeUrl',Config.baseUriAchain);
            }

            if(key != undefined && window.location.hash.indexOf("blockList") < 0 && window.location.hash.indexOf("dealList") < 0){
                if(key == 'ssc'){
                    this.$store.commit('changeUrl',Config.baseUriSsc);
                }else{
                    this.$store.commit('changeUrl',Config.baseUriAchain);
                }
                this.$router.push('/');
                return;
            }

        },
        getPath(){
            if(this.$route.path.length > 1){
                $('.layout-nav').addClass("layout-nav-black");
            }else{
                $('.layout-nav').removeClass("layout-nav-black");
            }
        }
    }
}).$mount('#app');
