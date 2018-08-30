/**
 * @file
 * @auth donglele
 * @date 2017/2/15
 */

import Vue from 'vue';
import tpl from './tpl.html';
import Detail from '../Detail.vue';


export default Vue.extend({
    name: 'index',
    template: tpl,
    data(){
        return {
            isShowDetail: !1
        }
    },
    components: {
        Detail
    }
});
