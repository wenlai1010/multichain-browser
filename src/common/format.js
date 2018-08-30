/**
 * @file
 * @auth zhaojing
 * @date 202016/11/28
 */

export default {

    /**
     * 将支付宝账号加密
     * @param alipayAccount
     */
    getSuffixEmail(email) {
        let idx = email.indexOf('@');
        let passedStr = email.substring(2, idx);
        return email.replace(passedStr, '****');
    },

    /**
     * 获取银行卡后4位
     * @param bankCode
     * @returns {string}
     */
    getSuffixBankCode(bankCode) {
        bankCode = bankCode + '';   // 强制转变成字符串
        return bankCode.substr(-4);
    },

    /**
     * 将数字千位分割
     * @param num
     * @returns {*}
     */
    thousandBitSeparator(num) {
        var reg=/\d{1,3}(?=(\d{3})+$)/g;   
        return (num + '').replace(reg, '$&,');  
    },


    /**
     * 总资产数据
     * @param param
     * @returns {*}
     * */
    getBankIconByName(bankName) {

        /**
         * 中国工商银行-ICBC
         招商银行-CMB
         中国建设银行-CBC
         中国银行-BC
         中国农业银行-ABC
         交通银行-BCM
         中国邮政储蓄银行-PSBC
         上海浦东发展银行-SPDB
         广东发展银行-GDB
         中信银行-CITIC
         中国光大银行-CEB
         兴业银行-CIB
         中国民生银行-CMBC
         华夏银行-HXB
         北京银行-BOB
         浙商银行-CZB
         */
        var iconName = '';
        switch (bankName) {
            case '中国工商银行':
                iconName = 'ICBC';
                break;
            case '招商银行':
                iconName = 'CMB';
                break;
            case '中国建设银行':
                iconName = 'CCB';
                break;
            case '中国银行':
                iconName = 'BOC';
                break;
            case '中国农业银行':
                iconName = 'ABC';
                break;
            case '交通银行':
                iconName = 'BCM';
                break;
            case '中国邮政储蓄银行':
                iconName = 'PSBC';
                break;
            case '上海浦东发展银行':
                iconName = 'SPDB';
                break;
            case '广发银行':
                iconName = 'GDB';
                break;
            case '中信银行':
                iconName = 'CITIC';
                break;
            case '中国光大银行':
                iconName = 'CEB';
                break;
            case '兴业银行':
                iconName = 'CIB';
                break;
            case '中国民生银行':
                iconName = 'CMBC';
                break;
            case '华夏银行':
                iconName = 'HXB';
                break;
            case '北京银行':
                iconName = 'BOB';
                break;
            case '浙商银行天津分行':
                iconName = 'CZB';
                break;
            case '浙商银行':
                iconName = 'CZB';
                break;
            default:
                iconName = 'BANK_OTHER';
        }
        return iconName;
    }

};
