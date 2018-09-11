/**
 * Created by Administrator on 2017/2/13.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import messages from '../module/contract/lang';
import Config from '../config/config';

import './base/init';
import store from '../module/index/store';

import Loading from '../component/Loading.vue';
import Contract from '../module/contract/main';
import ContractInfo from '../module/contract/contractInfo/main'


Vue.use(VueI18n);

let i18n =  new VueI18n({
    locale: window.app.LANG,
    messages, // set locale messages
});

const router = new VueRouter({
    'routes': [
        {
            path: '/',
            name: 'contract',
            component: Contract
        },
        {
            path: '/contractInfo/:contract_id',
            name: 'contractInfo',
            component: ContractInfo
        }
    ]
});

const app = new Vue({
    router,
    i18n,
    store,
    components: {
        Loading,
    },
    created() {
        this.changeMenu();
        this.getPath();
    },
    mounted(){
        let that = this;
        $("#logoHref").click(function(){
            location.href = './index.html';
        });
    },
    watch: {
        '$route':'getPath'
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
            if(window.url.indexOf('ssc') >= 0){
                document.title = this.$t('siteTitleSsc');
                var linkEle = document.getElementById("link1");

                linkEle.href = './img/favicon.ico';
                $('#logo').attr('src','./img/selfsell-logo.png');
                $('.blockchain-nav').text(this.$t('selfsell'));
            }else{
                $('.blockchain-nav').text(this.$t('achain'));
                document.title = this.$t('siteTitleAchain');
                var linkEle = document.getElementById("link1");

                linkEle.href = './img/favicon-a.ico';
                $('#logo').attr('src','./img/achain-logo.png');
            }



            if(key == 'ssc'){
                this.$store.commit('changeUrl',Config.baseUriSsc);
                document.title = this.$t('siteTitleSsc');
                var linkEle = document.getElementById("link1");

                linkEle.href = './img/favicon.ico';
            }else{
                this.$store.commit('changeUrl',Config.baseUriAchain)
                document.title = this.$t('siteTitleAchain');
                var linkEle = document.getElementById("link1");

                linkEle.href = './img/favicon-a.ico';
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
