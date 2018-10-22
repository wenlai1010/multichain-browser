/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/1
 */

import ajax from '../util/ajax';

const RENDER_INTERVAL = 6000;

export default {
    /**
     * 取消订阅---暗中观察
     * @param param
     * @returns {*}
     */
    cancelObser(param = {}){
        return ajax.post('/mailinfo.Delete', param);
    },

    /**
     * 搜索类型查询
     * @param param:keyword
     * @returns {*}
     */
    queryType(param = {}) {
        return ajax.get('/Query.Type',param);
    },
    /**
     * 搜索币种类型查询
     * @param param:keyword
     * @returns {*}
     */
    SortTotalList(param = {}) {
        return ajax.get('/SortTotalList.Query',param);
    },

    /**
     * 轮训统计数据
     */
    onLoopStatistic: (function () {
        const LOOP_TIME = RENDER_INTERVAL;
        let isRequesting = false;

        let callbacks = [];

        return function (callback) {
            let that = this;

            callbacks.push(callback);

            if (isRequesting === true) {
                return;
            } else {
                loop();
            }

            // 非调试状态下
            var timer = setInterval(() => {
                if(location.hash.indexOf('?')>0){
                    clearInterval(timer);
                    return;
                }else{
                    loop();
                }
            }, LOOP_TIME);

            function loop() {
                isRequesting = true;
                that.loopStatistic().always((rep) => {
                    isRequesting = false;
                    callbacks.forEach((callback, index) => {
                        callback.call(that, rep);
                    });
                })
            }
        };
    })(),

    /**
     * 主页统计数据
     * @param param: ''
     * @returns {*}
     */
    statistic(param = {}) {
        return ajax.get('/Statistic.Transaction', param);
    },

    /**
     * 轮询区块列表
     */
    onLoopBlockList: (function () {
        const LOOP_TIME = RENDER_INTERVAL;
        let isRequesting = false;

        let callbacks = [];

        return function (isClear,callback) {
            let that = this;

            callbacks.push(callback);

            if (isRequesting === true) {
                return;
            } else {
                loop();
            }

            // 非调试状态下
            var timer = setInterval(() => {
                console.log('isClear...111',isClear);
                if(location.hash.substring(2,location.hash.length).length>0 || isClear){
                    console.log('isClear...',isClear);
                    clearInterval(timer);
                }else{
                    loop();
                }
            }, LOOP_TIME);

            function loop() {
                isRequesting = true;
                that.LoopBlockList({page: 1, per_page: 7}).always((rep) => {
                    isRequesting = false;
                    callbacks.forEach((callback, index) => {
                        callback.call(that, rep);
                    });
                });
            }
        };
    })(),

    /**
     * 轮训查询区块列表
     * @param param
     * @returns {*}
     */
    LoopBlockList(param = {}) {
        return ajax.get('/Block.Query', param);
    },

    onLoopDealList: (function () {
        const LOOP_TIME = RENDER_INTERVAL;
        let isRequesting = false;

        let callbacks = [];

        return function (isClear,callback) {
            let that = this;

            callbacks.push(callback);

            if (isRequesting === true) {
                return;
            } else {
                loop();
            }

            // 非调试状态下
            var timer = setInterval(() => {
                if(location.hash.substring(2,location.hash.length).length>0 || isClear){
                    clearInterval(timer);
                }else{
                    loop();
                }
            }, LOOP_TIME);

            function loop() {
                isRequesting = true;
                that.LoopDealList({page: 1, per_page: 7}).always((rep) => {
                    isRequesting = false;
                    callbacks.forEach((callback, index) => {
                        callback.call(that, rep);
                    });
                });
            }
        };
    })(),

    /**
     * 轮训查询交易列表
     * @param param:per_page
     * @returns {*}
     */
    LoopDealList(param = {}) {
        return ajax.get('/Transaction.Query', param);
    },

    /**
     * 获取区块信息
     * @param param block_id block_num
     * @returns {*}
     * */
    blockInfo(param = {}) {
        return ajax.get('/BlockInfo.Query',param);
    },

    /**
     * 获取区块代理信息
     * @param param:signee page per_page
     * @returns {*}
     * */
    blockAgent(param = {}) {
        return ajax.get('/BlockAgent.Query',param);
    },

    /**
     * 获取排名详情列表
     * @param param:signee page per_page
     * @returns {*}
     * */
    SortList(param = {}) {
        return ajax.get('/SortList.Query',param);
    },

    /**
     * 获取区块总数
     * @param param:''
     * @returns {*}
     * */
    blockMaxNum(param = {}){
        return ajax.get('/BlockMaxNum.Query', param);
    },

    /**
     * 获取交易信息
     * @param param:trx_id
     * @returns {*}
     * */
    tradeInfo(param = {}) {
        return ajax.get('/TransactionInfo.Query', param);
    },

    /**
     * 搜索交易列表
     * @param param:block_id(块的hash) page per_page
     * @returns {*}
     * */
    tradeList(param = {}){
        return ajax.get('/TransactionList.Query', param);
    },
    /**
     * 搜索账户余额
     */
    userBalance(param = {}){
        return ajax.get('/contract/balance/query/' + param.address);
    },
    /**
     * 搜索合约列表
     * @param param
     * @returns {*}
     * */
    contractList(param = {}){
        return ajax.get('/contract/query/' + param.page + '/' + param.per_page,  param);
        // return ajax.get('/ContractList.Query', param);
    },
    /**
     * 搜索合约详细信息
     * @param param
     * @returns {*}
     * */
    contractInfo(param = {}){
        return ajax.get('/ContractInfo.Query', param);
    },
    /**
     * 搜索合约出账详细信息  先不要
     * @param param
     * @returns {*}
     * */
    transactionExInfo(param = {}){
        return ajax.get('/TransactionEx.Query', param);
    },

    /**
     * 获取红包接口
     * @param param
     * @returns {*}
     * */
    getBonus(param = {}){
        return ajax.get('/bonus/apply/' + param.address, {noPrefix: true});
    },

    /**
     * 获取红包获取结果
     * @param param
     * @returns {*}
     * */
    getBonusResult(param = {}){
        return ajax.get('/bonus/query/' + param.recordId, {noPrefix: true});
    },

    /**
     * 获取获奖列表
     * @param param
     * @returns {*}
     * */
    getUserList(param = {}){
        return ajax.get('/bonus/list/records', {noPrefix: true});
    },

     /**
     * 获取广播验证码
     * @param param
     * @returns {*}
     * */
    getBroadcastCode(param = {}){
        return ajax.get('/wallets/api/wallet/act/broadcast/get/code', {noPrefix: true});
    },

    /**
     * 发布广播
     * @param param
     * @returns {*}
     * */
    broadcastTransaction(param = {}){
        return ajax.post('/wallets/api/wallet/act/network_broadcast_transaction/code', {noPrefix: true}, param, true);
    },

    /**
     * 合约币列表
     * @param param
     * @returns {*}
     * */
    getCoinList(param = {}){
        return ajax.get('/wallets/api/browser/act/contract/query/forever', {noPrefix: true});
    },
    

};
