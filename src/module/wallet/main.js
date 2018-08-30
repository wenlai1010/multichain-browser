/**
 * @file
 * @auth donglele
 * @date 2016/12/29
 */

import Vue from 'vue';
import tpl from './tpl.html';
import ACT from 'act-jsapi';

export default Vue.extend({
    name: 'wallet',
    template: tpl,
    data() {
        return {
            phrase: '',
            password: '',
            comfirmpPwd: '',

            hasGetPhrase: false, // 已经获得了助记词
            inputPhraseStr: '', // 用户填入的助记词
            wifPrivateKey: '',
        }
    },
    created() {
        this.fetchWords();
    },
    mounted() {

    },
    components: {},
    methods: {
        // 获取助记词
        fetchWords() {
            this.phrase = ACT.generateRandomPhrase();
        },

        // 第一步，助记词密码生成私钥
        fetchActAddr() {
            if(this.password !== this.comfirmpPwd){
                window.error(this.$t('passwordTip'))
                return;
            }
            this.hasGetPhrase = true;
            let seedStr = ACT.calcBIP39Seed(this.phrase, this.password);
            this.wifPrivateKey = ACT.generateKey(seedStr).wifPrivateKey;
        },

        // 确认助记词
        toWallet(){
            if(this.phrase !== this.inputPhraseStr){
                window.error(this.$t('phraseErrorTip'));
                return;
            }
            this.$router.push({ name: 'walletSign', params: { privKey: this.wifPrivateKey }})
        },

        toWalletAddr(){
            this.$router.push({ name: 'walletSign'})
        }
    }
});
