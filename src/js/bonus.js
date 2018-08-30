import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import messages from '../module/bonus/lang';


import Bonus from '../module/bonus/main';
import BonusResult from '../module/bonus/result/main';
import BonusExpired from '../module/bonus/expired/main';


Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'en',
    messages, // set locale messages
});

const router = new VueRouter({
    'routes': [
        {
            path: '/',
            name: 'bonus',
            component: Bonus
        },
        {
            path: '/result',
            name: 'bonusResult',
            component: BonusResult
        },
        {
            path: '/expired',
            name: 'bonusExpired',
            component: BonusExpired
        }
    ]
});

const app = new Vue({
    router,
    i18n
}).$mount('#app');