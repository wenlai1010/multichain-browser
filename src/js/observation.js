import Vue from 'vue';
import VueRouter from 'vue-router';
// import '../dep/intlTelInput'
// import VueI18n from 'vue-i18n'
// import messages from '../module/bonus/lang';


import Observation from '../module/observation/main';


// Vue.use(VueI18n);
//
// const i18n = new VueI18n({
//     locale: localStorage.getItem('lang') || 'en',
//     messages, // set locale messages
// });

const router = new VueRouter({
    'routes': [
        {
            path: '/',
            name: 'observation',
            component: Observation
        }
    ]
});

const app = new Vue({
    router
}).$mount('#app');