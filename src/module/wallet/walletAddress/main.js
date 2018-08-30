/**
 * @file
 * @auth donglele
 * @date 2016/12/29
 */

import Vue from 'vue';
import tpl from './tpl.html';
import ACT from 'act-jsapi';

export default Vue.extend({
    template: tpl,
    data() {
        return {
            phrase: '',
            password: '',
            comfirmPwd: '',
            actAddress: '',
            wifPrivateKey: ''
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        // 已有地址用户导出地址
        fetchActAddr() {
            if(!this.checkPhraseAndPwd()){
                return;
            }
            let seedStr = ACT.calcBIP39Seed(this.phrase, this.password);
            this.actAddress = ACT.generateKey(seedStr).actAddress;
        },

        // 已有地址用户导出私钥
        exportPrivKey(){
            if(!this.checkPhraseAndPwd()){
                return;
            }
            let seedStr = ACT.calcBIP39Seed(this.phrase, this.password);
            this.wifPrivateKey = ACT.generateKey(seedStr).wifPrivateKey;
        },

        // 签名
        toSign(){
            if(!this.checkPhraseAndPwd()){
                return;
            }
            this.exportPrivKey();
            this.$router.push({ name: 'walletSign', params: { privKey: this.wifPrivateKey }})
        },

        checkPhraseAndPwd(){
            let phraseResult = ACT.findPhraseErrors(this.phrase); // 返回false 则助记词格式正确
            if(phraseResult){
                window.error(this.$t('phraseErrorTip'));
                return false;
            }
            if(this.password !== this.comfirmPwd){
                window.error(this.$t('passwordTip'));
                return false;
            }
            return true;
        }
    }
});
