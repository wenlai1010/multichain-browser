/**
 * @file
 * @auth jinguangguo
 * @date 2016/9/19
 */
 
export default function (url) {
    if (!url) {
        url = window.location.href;
    }

    let temp = url.split('#');

    if(!temp[1]) return {};

    temp[0] = temp[1].split('?');

    let query = {};
    let queryStr = temp[0][1];
    if (queryStr) {
        queryStr = queryStr.split('&');
        $(queryStr).each(function (index, item) {
            let _temp = item.split('=');
            query[_temp[0]] = decodeURIComponent(_temp[1]);
        });
    }

    return query;
}