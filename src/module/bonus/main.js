/**
 * @file
 * @auth donglele
 * @date 2017/2/15
 */

import Vue from 'vue';
import tpl from './tpl.html';

import commonService from '../../common/commonService';
import Tip from '../../component/Tips.vue';
import Detail from './Detail.vue';

export default Vue.extend({
    name: 'index',
    template: tpl,
    data(){
        return {
            address: '',
            userList: [],
            currUser: 0,
            timer: 11,
            tipText: '',
            isShowTip: false,
            counting: !1,
            isShowDetail: false,
            reqFinished: true,
        }
    },

    filters: {
        shorten(val) {
            return 'SSC...' + val.substr(-4);
        },

        timeFormat(val, i18n){
            const MIN = 60 * 1000,
                  HOUR = MIN * 60,
                  DAY = HOUR * 25;

            let now = new Date().getTime(),
                diff = now - val,
                min_diff = ~~(diff / MIN),
                hour_diff = ~~(diff / HOUR),
                day_diff = ~~(diff / DAY);

            let msg = i18n.messages,
                locale = i18n.locale,
                lang = msg[locale];

            return day_diff ? day_diff + lang.dayago : hour_diff ? hour_diff + lang.hourago : min_diff ? min_diff + lang.minago : lang.justnow;
        }
    },

    beforeRouteEnter( to, from, next ){
        localStorage.getItem('recordId') ? next('/result') : next();
    },

    beforeRouteLeave( to, from, next ){
        if(to.name == 'bonusResult' && this.recordId) localStorage.setItem('recordId', this.recordId);
        next();
    },

    mounted(){
    },

    created() {
         this.getUserList();
    },

    components: {
        Tip, Detail
    },

    methods: {
        showTip(txt) {
            this.isShowTip = true;
            this.tipText = txt;
        },

        getUserList(){
            commonService.getUserList().done(rep => {
                if(rep.code==200){
                    this.userList = rep.data;
                    this.scrollList();
                }
            }).fail(rep => {
                this.showTip( this.$i18n.messages[this.$i18n.locale].networkErr );
            })
        },

        scrollList(){
            this.currUser++;
            setTimeout(()=>{
                this.scrollList()
            }, 3000);
        },

        getBonus() {
            let msg = this.$i18n.messages[this.$i18n.locale];

            if(!this.address) {
                this.showTip(msg.emptyAddr);
                return;
            }

            if(this.address.indexOf('SSC')) {
                this.showTip(msg.wrongAddr);
                return;
            }

            commonService.getBonus({
                "address": this.address
            }).done(rep => {
                if(rep.code==200){
                    this.counting = true;
                    this.recordId = rep.data;
                    this.countdown();
                } else if(rep.code==10004){ // 活动过期
                    this.$router.push('/expired');
                } else if(rep.code==10002){ // 地址已使用
                    this.showTip(msg.doubleApply);
                } else if(rep.code==10007){ // 地址错误
                    this.showTip(msg.addrErr);
                } else {
                    this.showTip(rep.msg);
                    this.address = '';
                    this.stopCount()
                }
            }).fail((rep) => {
                this.showTip( msg.networkErr );
            })
        },

        getBonusResult(){
            let msg = this.$i18n.messages[this.$i18n.locale];
            commonService.getBonusResult({
                "recordId": this.recordId,
            }).done(rep => {
                if(rep.code==200){
                    this.stopCount();
                    this.$router.push('/result');
                } else if(rep.code==10005){  // 地址如果不成功 允许他再次
                    localStorage.removeItem('recordId');
                    this.stopCount();
                    this.showTip( msg.applyErr );
                } else if(rep.code==10004) {
                    this.stopCount();
                    this.$router.push('/expired');
                } else if(rep.code==10006) {
                    this.stopCount();
                    this.showTip( msg.orderNotExist );
                } else if(rep.code==10002) {
                    this.stopCount();
                    this.showTip( msg.doubleApply );
                }
            }).fail((rep) => {
                this.showTip( msg.networkErr );
            })
        },

        countdown() {
            if(this.timer==1) this.timer=11;
            this.timer--;
            this.getBonusResult();
            this.counting && setTimeout(()=>{
                this.countdown();
            },1000)
        },

        stopCount() {
            this.counting = false;
            this.timer = 11;
        }
    }
});
