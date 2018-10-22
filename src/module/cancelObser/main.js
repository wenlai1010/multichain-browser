/**
 * @file
 * @auth donglele
 * @date 2017/2/15
 */

import Vue from 'vue';
import tpl from './tpl.html';

import commonService from '../../common/commonService';
import Loading from '../../component/Loading.vue';
import format from '../../common/format';


export default Vue.extend({
    name: 'index',
    template: tpl,
    data(){
    },
    created() {
        window.scrollTo(0,0);
    },
    components: {
        Loading
    },
    methods: {

    }
});
