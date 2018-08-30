/**
 * @file
 * @auth donglele
 * @date 2017/2/15
 */

import Vue from 'vue';
import tpl from './tpl.html';

import commonService from '../../../common/commonService';
import Tip from '../../../component/Tips.vue';
import Detail from '../Detail.vue';


export default Vue.extend({
    name: 'index',
    template: tpl,
    data(){
        return {
            amount: this.$route.query.amount || "--",
            address: this.$route.query.address || '',
            tipText: '',
            isShowTip: false,
            isShowDetail: !1,
            isFirstTime: localStorage.getItem('firstTimeResult')
        }
    },

    beforeRouteEnter( to, from, next ){
        !localStorage.getItem('recordId') ? next('/') : next();
    },

    mounted(){
        localStorage.setItem('firstTimeResult', 1)
    },
    created() {
        this.getBonusResult();
    },

    components: {
        Tip, Detail
    },

    methods: {
        showTip(txt) {
            this.isShowTip = true;
            this.tipText = txt;
        },

        getBonusResult(){
            commonService.getBonusResult({
                "recordId": localStorage.getItem('recordId'),
            }).done(rep => {
                if(rep.code==200){
                    this.amount = rep.data.actAmount;
                    this.address = rep.data.actAddress;
                    if( rep.data.currentVersion != rep.data.version && +rep.data.contractBalance ){
                        localStorage.removeItem('recordId');
                        this.$router.push('/');
                    }
                } else if(rep.code==10005){  // 地址如果不成功 允许他再次
                    localStorage.removeItem('recordId');
                    this.showTip( msg.applyErr );
                } else if(rep.code==10004) {
                    this.$router.push('/expired');
                }
            }).fail((rep) => {
                this.showTip( this.$i18n.messages[this.$i18n.locale].networkErr );
            })
        },

        hideTips() {
            this.isShowTip = false;
            setTimeout(()=>{ this.$router.push('/') }, 3000 )
        }
    }
});
