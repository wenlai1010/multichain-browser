/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/19
 */

const DEFAULT_TYPE = 'POST';
const DEFAULT_TIMEOUT = 30000;


let errorMsg = {
    // zh: {
    //     networkErr: '网络异常，请稍后再试',
    //     serverErr: '服务器异常，请稍后再试'
    // },

    en: {
        networkErr: 'Network exception, please try again later',
        serverErr: 'Server exception, please try again later'
    }
};

export default {

    /**
     * 发送请求
     * @param method
     * @param params
     * @returns {*}
     */
    send(method, params = {}) {
        let deferred = $.Deferred();

        let reqData = {
            jsonrpc: '2.0',
            id: new Date().getTime(),
            method: method,
            params: params
        };

        $.ajax({
            url: '/api',
            data: JSON.stringify(reqData),
            type: DEFAULT_TYPE,
            dataType: 'JSON',
            contentType: 'application/json; charset=UTF-8',
            async: true,
            timeout: DEFAULT_TIMEOUT,
            success: function (rep) {
                console.log('ajax5:',rep);
                if (rep.error) {
                    // 报错了
                    deferred.rejectWith(this, [errorMsg[window.app.LANG].networkErr]);
                } else {
                    // 正确
                    deferred.resolveWith(this, [rep]);
                }
            },
            error: function (xhr, type) {

            }
        });

        return deferred.promise();
    },

    /**
     * 发送请求
     * @param path
     * @param params
     * @returns {*}
     */
    post(method, param = {}, formData, isFormData) {
        let deferred = $.Deferred();

        $.ajax({
            // url: (url || '/api/browser/ssc') + method,
            url:  window.url + method,
            data: isFormData ? formData : JSON.stringify(param),
            type: 'POST',
            dataType: 'JSON',
            headers: {
                'accept-language': 'zh-CN'
            },
            contentType: isFormData ? 'application/x-www-form-urlencoded; charset=utf-8' : 'application/json; charset=UTF-8',
            async: true,
            timeout: DEFAULT_TIMEOUT,
            success: function (rep) {
                console.log('ajax1:',rep);
                if (rep.error) {
                    console.log('ajax2:',rep);
                    // 报错了
                    deferred.rejectWith(this, ['Network exception, please try again later']);
                } else {
                    // 正确
                    deferred.resolveWith(this, [rep]);
                }
            },
            error: function (xhr, type) {console.log('ajax3:',rep);
                deferred.rejectWith(this, ['Network exception, please try again later']);
            }
        });

        return deferred.promise();
    },

    /**
     * 发送请求get
     * @param method
     * @param param
     * @param showError
     */
    get(method, param={}) {
        let deferred = $.Deferred();

        $.ajax({
            // url: (url || '/api/browser/ssc')+ method,
            url:  window.url + method,
            data: $.param(param),
            type: 'GET',
            headers: {
                'accept-language': 'zh-CN'
            },
            contentType: 'application/json; charset=UTF-8',
            async: param.async || true,
            timeout: param.timeout || DEFAULT_TIMEOUT,
            success(rep) {
                deferred.resolveWith(this, [rep]);
            },
            error(xhr, type) {
                console.log('ajax4:',xhr,type);
                deferred.rejectWith(this, ['Network exception, please try again later']);
            }
        });

        return deferred.promise();
    },



};