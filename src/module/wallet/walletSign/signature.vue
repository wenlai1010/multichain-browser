<template>
    <div class="wallet-sign-broadcast">
        
        <form class="w-container result-form">
            <h3><span v-text="$t('walletSign')"></span></h3>
            <pre v-text="sign"></pre>
            <p class="code-img">
                <img :src="imageCode" alt="" @click="getCode">
                <input type="text" name="code" class="form-control" v-model="code" maxlength="4">
                <button :disabled="processing" @click="sendSignature($event)" v-text="$t('broadcast')"></button>
            </p>
            <input type="hidden" name="imgCodeKey" :value="imgCodeKey">
            <input type="hidden" name="message" :value="sign">
        </form>

        <div class="broadcast-result" v-show="resultJson">
            <div class="w-container status processing" v-if="processing" v-text="$t('broadcastProcessing')"></div>
            <div class="w-container">
                <h3><small style="float: right;" v-show="trxId"><a :href="'/index.html#/tradeInfo/'+ trxId" target="_blank" v-text="$t('viewTrans')"></a></small><span v-text="$t('broadcastResult')"></span></h3>
                <pre v-text="resultJson"></pre>
            </div>
        </div>
       
    </div>
</template>

<script type="text/babel">
    import service from '../../../common/commonService';

    export default {
        data() {
            return {
                imageCode: '',
                imgCodeKey: '',
                jsonResult: '',
                code: '',
                resultJson: '',
                trxId: '',
                processing: false,
                success: false,
                fail: false,
                failMsg: ''
            };
        },
        props: ['sign'],
        created(){
            this.getCode();
        },
        watch: {
            sign(nVal){
                if(!nVal) this.resultJson = ''
            }
        },
        mounted(){
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

                try {
                    let json = JSON.parse(this.sign)
                    if(typeof(json) != 'object'){
                        this.resetStatus();
                        window.error(this.$t('errMessage'));
                        return;
                    }
                } catch(err) {
                    this.resetStatus();
                    window.error(this.$t('errMessage'));
                    return;
                }

                if(!this.code) {
                    this.resetStatus();
                    window.error(this.$t('noImageCode'));
                    return;
                }
                this.resetStatus();
                this.processing = true;

                service.broadcastTransaction( 
                    $('.result-form').serialize()
                ).done(rep=>{
                    this.getCode();
                    switch(rep.code){
                        case 200:
                            this.resetStatus();
                            this.resultJson = rep.result;
                            this.trxId = JSON.parse(this.resultJson).result;
                            window.success(this.$t('broadcastSuccess'));
                            break;
                        case 10003:
                            this.resetStatus();
                             window.error(this.$t('broadcastFail'));
                            break;
                        case 10004:
                            this.resetStatus();
                            window.error(this.$t('broadcastWrongCode'));
                            break;
                        case 10005:
                            this.resetStatus();
                            window.error(this.$t('broadcastWrongCode'));
                            break;
                        case 10006:
                            this.resetStatus();
                            window.error(this.$t('broadcastFail'));
                            break;
                        default:
                            break;
                    }
                }).fail(()=>{
                    this.resetStatus();
                     window.error(this.$t('serverErr'));
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
    }
</script>

<style lang="sass" rel="stylesheet/scss">
    .wallet-sign-broadcast {
        pre {
            display: block;
            padding: 9.5px;
            background: #fff;
            margin: 10px 0;
            font-size: 13px;
            line-height: 1.42857143;
            white-space: pre-wrap;
            word-wrap: break-word;
            color: #333;
            border: 1px solid #ccc;
            border-radius: 4px;
            min-height: 160px;
        }

        .broadcast-result {
            pre {
                min-height: 60px;
            }
        }

        .result-form {
            .code-img {
                width: 95%;
                margin: 0 auto;
            }
            img {
                height: 35px;
                float: left;
                border-radius: 4px;
                cursor: pointer;
            }
            input[type=text] {
                width: 80px;
                height: 35px;
                margin: 0 10px;
                float: left;
            } 
            button {
                height: 35px;
                padding: 6px 12px;
                font-size: 14px;
                line-height: 1.42857143;
                border-radius: 4px;
                user-select: none;
                border: 1px solid #ccc;
                vertical-align: middle;
                text-align: center;
                box-sizing: border-box;
            }
        }
    }
</style>