/**
 * Created by donglele on 2017/1/20.
 */


import Vue from 'vue';
// import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'

import './base/init';
import Loading from '../component/Loading.vue';
import Index from '../module/cancelObser/main';

import Commonservice  from '../common/commonService';

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
        }
    ]
});

const app = new Vue({
    router,
    components: {
        Loading,
    }
}).$mount('#app');
