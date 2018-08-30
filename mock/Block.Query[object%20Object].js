/**
 * @file mock data
 * @author autoresponse
 */

/* eslint-disable fecs-camelcase */

/**
 * 获取 mock 响应数据
 *
 * @param {string} path 请求路径名
 * @param {Object} queryParam 查询参数信息
 * @param {Object} postParam post 的查询参数信息
 * @return {Object}
 */
module.exports = function (path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: 
            {
                "msg": "OK",
                "result": {
                    "totalRecords": 16796,
                    "currentPage": 1,
                    "totalPage": 1680,
                    "pageSize": 10,
                    "dataList": [
                        {
                            "id": 16796,
                            "blockId": "5b642e20d38001f4b70dadc118ca9cafd8252487",
                            "block_num": 16796,
                            "block_time": "2018-08-29 06:43:48",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "james",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16795,
                            "blockId": "0b000ab24df77d28f5ccb63ee825890885027113",
                            "block_num": 16795,
                            "block_time": "2018-08-29 06:43:42",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "lucas",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16794,
                            "blockId": "278d877bf9017667ac389d0331e7b14b7c007345",
                            "block_num": 16794,
                            "block_time": "2018-08-29 06:43:36",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "jack",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16793,
                            "blockId": "9d5e8b75e30ec87c88a4465459895ea3cc283b17",
                            "block_num": 16793,
                            "block_time": "2018-08-29 06:43:30",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "austin",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16792,
                            "blockId": "48f288d6a8e70500b17108d2921441145b68025d",
                            "block_num": 16792,
                            "block_time": "2018-08-29 06:43:24",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "harrison",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16791,
                            "blockId": "23a76e3526751555119c0b7047c0996ddb3f1982",
                            "block_num": 16791,
                            "block_time": "2018-08-29 06:43:18",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "ali",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16790,
                            "blockId": "fc0e1fe8abc605e062e510648784fcccd00dca54",
                            "block_num": 16790,
                            "block_time": "2018-08-29 06:43:12",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "joshua",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16789,
                            "blockId": "6bb5e9ad18f4c08df4aa405f9fc69ca05a06b95d",
                            "block_num": 16789,
                            "block_time": "2018-08-29 06:43:06",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "muhammad",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16788,
                            "blockId": "acabc9f015eb684a5778e7525e74d0d29dfc1c3c",
                            "block_num": 16788,
                            "block_time": "2018-08-29 06:43:00",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "toby",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        },
                        {
                            "id": 16787,
                            "blockId": "63e8978340295638a00df1cc503601fb45aec6de",
                            "block_num": 16787,
                            "block_time": "2018-08-29 06:42:54",
                            "trans_num": 0,
                            "trans_amount": "0.00000",
                            "signee": "levi",
                            "block_size": 166,
                            "block_elapsed_time": "28 minutes ago"
                        }
                    ]
                },
                "code": 200
            }
    };
};

/* eslint-enable fecs-camelcase */
