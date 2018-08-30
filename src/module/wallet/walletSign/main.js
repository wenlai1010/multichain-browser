import Vue from 'vue';
import tpl from './tpl.html';
import service from '../../../common/commonService';
import ACT from 'act-jsapi';
import signature from './signature.vue';

export default Vue.extend({
    template: tpl,
    data() {
        return {
            transferType: 0,
            signType: 'transfer',
            importType: 'privkey',
            // privKey: '5JiKij1JqpLUbzs3jSEjaNQqeYRdJpKKr1dQtoLEuc8s5tBbZAA',
            wifPrivkey: '',
            privKey: '',
            transferAmount: '',
            transferAddress: '',
            transferNote: '',
            transContractId: '',
            // callContractId: 'CON37fNWVo36yUzgTdeyRQwmcAtwvNwRbh2X',
            callContractId: '',
            contractFn: '',
            contractParams: '',
            signature: '',
            coinList: [{coinType: 'ACT'}],
            showGenerateBox: false,
            mnemonic: '',
            password: '',
            actAddress: '',
            qrcode: ''
        }
    },

    components: { signature },

    computed: {
        transParams() {
            return {
                transactionFee: 1000, // 交易手续费
                maxCallContractCost:  5000, // 调用合约最大费用
                contractId: this.callContractId, // 合约ID
                chainId: '5260ca3470af412ea1dc9fd647903901b9adb4d618effec8f4f9479eaa0c9c69' // 测试链ID
                // chainId: '6a1cb528f6e797e58913bff7a45cdd4709be75114ccd1ccb0e611b808f4d1b75' // 正式链ID
            }
        },
        // actAddress(){
        //     if( !this.checkPrivKey(this.privKey) ) return;
        //     return ACT.wif2address(this.privKey)
        // }
    },

    watch: {
        transferType(nVal, oVal){
            this.transContractId = this.coinList[nVal].contractId
            if(nVal>0) this.transferNote = ''
        },

        actAddress(nVal){
            if(!nVal) return;
            if(this.qrcode) {
                this.qrcode.clear();
                this.qrcode.makeCode(nVal)
            }
        }
    },
 
    created() {
        this.getCoinList();
    },

    mounted() {
        this.qrcode = new QRCode(this.$refs.qrcode, {
            text: this.actAddress,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    },

    methods: {
        callContract(){
            if(!this.actAddress) {
                window.error(this.$t('noAddress'))
                return
            }
            
            if(!this.callContractId) {
                window.error(this.$t('noContractId'))
                return
            }
            if(!this.checkContractId(this.callContractId)){
                window.error(this.$t('wrongContractId'))
                return
            }
            if(!this.contractFn) {
                window.error(this.$t('noContractFn'))
                return
            }
            // if(!this.contractParams) {
            //     window.error(this.$t('noContractParams'))
            //     return
            // }
            // let privkey = ACT.wif2privkey(this.wifPrivkey)
            this.signature = JSON.stringify(ACT.callContract(this.privKey, this.contractFn, this.contractParams, this.transParams))
        },

        transferCoin() {
            if(!this.actAddress) {
                window.error(this.$t('noAddress'))
                return
            }
            
   
            if(!this.transferAddress) {
                window.error(this.$t('noTransferAddress'))
                return
            }

            if(!this.checkACTaddress(this.transferAddress)) {
                window.error(this.$t('wrongACTaddress'))
                return
            }

            if(this.transferType !== 0) {
                if(!this.transContractId) {
                    window.error(this.$t('noContractId'))
                    return
                }

                // if(!this.checkContractId(this.transContractId)) {
                //     window.error(this.$t('wrongContractId'))
                //     return
                // }
            }
            
            if(!this.transferAmount) {
                window.error(this.$t('noTransferAmount'))
                return
            }
            
            if(!(/^[0-9]+.?[0-9]*$/.test(this.transferAmount))) {
                window.error(this.$t('wrongTransferAmount'))
                return
            }

            if(this.getRealLen(this.transferNote)>40) {
                window.error(this.$t('wrongTransferNote'))
                return
            }
            // if(/.*[\u4e00-\u9fa5]+.*/.test(this.transferNote)) {
            //     window.error(this.$t('wrongTransferNote'))
            //     return
            // }
            
            
            // let privkey = ACT.wif2privkey(this.wifPrivkey)
            if(this.transferType === 0) {
                if(/^ACT/.test(this.transferAddress)){
                    this.signature = JSON.stringify(ACT.actTransfer(this.privKey, this.transferAddress, this.transferAmount*100000, this.transferNote, this.transParams))
                } else if(/^CON/.test(this.transferAddress)){
                    this.transParams.contractId = this.transferAddress
                    this.signature = JSON.stringify(ACT.contractDeposit(this.privKey, this.transferAmount*100000, this.transParams))
                }
            } else {
                this.transParams.contractId = this.transContractId
                this.signature = JSON.stringify(ACT.callContract(this.privKey, 'transfer_to', this.transferAddress+'|'+this.transferAmount, this.transParams))
            }
        },

        setSignType(type){
            this.signType = type
            if(type == 'transfer'){
                this.resetContractData()
            }
            if(type == 'contractCall'){
                this.resetTransferData()
            }
        }, 

        setImportType(type){
            this.importType = type
            if(type == 'transfer'){
                // this.resetContractData()
            }
            if(type == 'contractCall'){
                // this.resetTransferData()
            }
        }, 

        openGenerateBox() {
            this.showGenerateBox = true
            this.wifPrivkey = ''
            this.privKey = ''
            this.password = ''
            this.mnemonic = ''
            this.importType = 'privkey'
        },

        resetContractData(){
            // this.callContractId = 'CON37fNWVo36yUzgTdeyRQwmcAtwvNwRbh2X'
            this.callContractId = ''
            this.contractFn = ''
            this.contractParams = ''
            this.signature = ''
        },

        resetTransferData(){
            this.transferType = 0
            this.transferAmount = ''
            this.transferAddress = ''
            this.transferNote = ''
            this.transContractId = ''
            this.signature = ''
        },

        goBroadcast() {
            this.$router.push({
                name: 'walletBroadcast',
                params: {
                    signature: this.signature
                }
            })
        },

        checkPrivKey(key) {
            return key.length == 51 && key.indexOf('5') == 0
        },

        checkContractId(id){
            return id.indexOf('CON') == 0 && (id.length == 36 || id.length == 35)
        },

        checkACTaddress(addr){
            return /^(ACT|CON)/.test(addr) && (addr.length == 36 || addr.length == 35 || addr.length > 60)
        },

        readGkeyFile($evt){
            let vm = this
            let base64 =  new Base64()
            let file = $evt.target
            let value = file.value
            if(value == "") {
                window.warn(this.$t('nofile'))
            }

            let files = file.files

            if(files.length == 0){
                window.error(this.$t('nofile'))
            } else if(!(/\.gkey/.test(files[0].name))){
                window.error(this.$t('wrongFiletype'))
            } else{
                var reader = new FileReader();
                reader.readAsText(files[0], "UTF-8");
                reader.onload = function(evt){ 
                    vm.wifPrivkey = base64.decode(evt.target.result);
                    vm.privKey = ACT.wif2privkey(vm.wifPrivkey);
                    vm.actAddress = ACT.wif2address(vm.wifPrivkey);
                    vm.showGenerateBox = false;
                    file.value = ''
                }
            }
        },

        confirmPrivkey(){
            if( this.importType != 'privkey' ) return;
            if( !this.wifPrivkey ){
                window.error(this.$t('noPrivkey'))
            } else if( !this.checkPrivKey(this.wifPrivkey) ) {
                window.error(this.$t('wrongPrivkey'))
            } else {
                this.privKey = ACT.wif2privkey(this.wifPrivkey)
                this.actAddress = ACT.wif2address(this.wifPrivkey)
                this.showGenerateBox = false
            }
        },

        confirmMnemonic(){
            if( this.importType != 'mnemonic' ) return;
            if( !this.mnemonic ) {
                window.error(this.$t('noMnemonic'))
            } else if( !this.password ) {
                window.error(this.$t('noPassword'))
            } else if ( ACT.findPhraseErrors(this.mnemonic) ) {
                window.error(this.$t('phraseErrorTip'))
            } else {
                let seed = ACT.calcBIP39Seed(this.mnemonic, this.password);
                this.privKey = ACT.generateKey(seed).privateKey;
                this.actAddress = ACT.priv2address(this.privKey)
                this.showGenerateBox = false
            }
        },

        getRealLen(str) {
            var len = 0;  
            for (var i=0; i<str.length; i++) {  
              if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {  
                 len += 2;  
               } else {  
                 len ++;  
               }  
             }  
            return len;  
        },

        trim($evt, prop){
            let target = $evt.target,
                value = target.value;

            this[prop] = value.replace(/(^\s*)|(\s*$)/g, "")
        },

        getCoinList() {
            service.getCoinList().done(rep=>{
                this.coinList = this.coinList.concat(rep.data.actContractInfoList);
            });
        },


    }


});