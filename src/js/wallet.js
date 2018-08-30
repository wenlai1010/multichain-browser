/**
 * Created by Administrator on 2017/2/13.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import messages from '../module/wallet/lang';

import './base/init';

import Loading from '../component/Loading.vue';
import Wallet from '../module/wallet/main';
import WalletSign from '../module/wallet/walletSign/main'
import WalletBroadcast from '../module/wallet/walletBroadcast/main'
import WalletAddress from '../module/wallet/walletAddress/main'


Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: window.app.LANG,
    messages, // set locale messages
});

const router = new VueRouter({
    'routes': [
        {
            path: '/',
            name: 'wallet',
            component: Wallet
        },
        {
            path: '/sign',
            name: 'walletSign',
            component: WalletSign
        },
        {
            path: '/broadcast',
            name: 'walletBroadcast',
            component: WalletBroadcast
        },
        {
            path: '/address',
            name: 'walletAddress',
            component: WalletAddress
        }
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
            $('.home-nav').text(this.$t('home'))
            $('.contract-nav').text(this.$t('contractTitle'));
            $('.forum-nav').text(this.$t('forum'));
            $('.wallet-nav').text(this.$t('wallet'));
            $('.wallet-create-nav').text(this.$t('myWallet'));
            $('.wallet-address-nav').text(this.$t('analyzeMnemonic'));
            $('.wallet-sign-nav').text(this.$t('walletSign'));
            $('.wallet-broadcast-nav').text(this.$t('walletBroadcast'));
            $('.corp-mail').text(this.$t('corpMail'));
            $('.site-lang').text(this.$t('lang'));
            document.title = this.$t('siteTitle');
        },
    }
}).$mount('#app');
