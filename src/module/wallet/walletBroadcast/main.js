import Vue from 'vue';
import tpl from './tpl.html';
import service from '../../../common/commonService';

export default Vue.extend({
    template: tpl,
    data() {
        return {
            imageCode: '',
            imgCodeKey: '',
            jsonResult: '',
            signature: '',
            code: '',
            resultJson: '',
            trxId: '',
            processing: false,
            success: false,
            fail: false,
            failMsg: ''
        }
    },
    created() {
        this.getCode();
    },

    beforeRouteEnter(to, from, next){
        if(to.params.signature){
            next(vm=>{
                vm.signature = to.params.signature
            })
        } else {
            next()
        }
    },

    methods: {
        
        getCode() {
            service.getBroadcastCode().done(rep=>{
                this.imageCode = 'data:image/jpg;base64,' + rep.imgCode;
                this.imgCodeKey = rep.imgCodeKey;
            });
        },
        
        sendSignature(evt){
            evt.preventDefault();

            if(!this.signature) {
                this.resetStatus();
                this.fail = true;
                this.failMsg = this.$t('fillMessage');
                return;
            }

            try {
                let json = JSON.parse(this.signature)
                if(typeof(json) != 'object'){
                    this.resetStatus();
                    this.fail = true;
                    this.failMsg = this.$t('errMessage');
                    return;
                }
            } catch(err) {
                this.resetStatus();
                this.fail = true;
                this.failMsg = this.$t('errMessage');
                return;
            }

            if(!this.code) {
                this.resetStatus();
                this.fail = true;
                this.failMsg = this.$t('noImageCode');
                return;
            }
            this.resetStatus();
            this.processing = true;

            service.broadcastTransaction( 
                $('.input-form').serialize()
            ).done(rep=>{
                this.getCode();
                switch(rep.code){
                    case 200:
                        this.resetStatus();
                        this.resultJson = rep.result;
                        this.trxId = JSON.parse(this.resultJson).result;
                        this.success = true;
                        break;
                    case 10003:
                        this.resetStatus();
                        this.fail = true;
                        this.failMsg = this.$t('broadcastFail');
                        break;
                    case 10004:
                        this.resetStatus();
                        this.fail = true;
                        this.failMsg = this.$t('broadcastWrongCode');
                        break;
                    case 10005:
                        this.resetStatus();
                        this.fail = true;
                        this.failMsg = this.$t('broadcastWrongCode');
                        break;
                    case 10006:
                        this.resetStatus();
                        this.fail = true;
                        this.failMsg = this.$t('broadcastFail');
                        break;
                    default:
                        break;
                }
            }).fail(()=>{
                this.resetStatus();
                this.fail = true;
                this.failMsg = this.$t('serverErr');
            });
        },

        resetStatus(){
            this.processing = false;
            this.success = false;
            this.fail = false;
            this.resultJson = '';
            this.trxId = '';
            this.code = '';
        }
    }
});