/**
 * Created by jiangxiaoni on 2018/9/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Config from '../../config/config';


export default new Vuex.Store({
    strict: true,
    state: {
        localUrl: Config.baseUriAchain
    },
    // getters: {
    //     marketGopAddress: status => status.marketGopAddress,
    //     setMarketAddressTip: status => {
    //         return status.marketGopAddress ? '查看' : '未设置'
    //     },
    //     hasMarketAddress: status => !!status.marketGopAddress,
    //     sentFeedback: status => status.sentFeedback
    // },
    mutations: {
        changeUrl(state, url) {
            state.localUrl = url;
        }
    }
});