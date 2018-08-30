/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/18
 */


$(function () {
    // let lang = window.sessionStorage.getItem('LANG')? window.sessionStorage.getItem('LANG') : 'en';
        // window.location.reload();

    let $module = $('.layout-nav');


    if ($module[0]) {
        $module.find('.js-nav').click(function (e) {
            e.preventDefault();
            // 页面间的跳转
            window.location.href = $(this).data('href');
        });
    }
    // $('.js-lang').click(function(e) {
    //     // 获取当前页面
    //     let targetLang = $(this).data('lang');
    //     window.sessionStorage.setItem('LANG',targetLang);
    //     window.location.reload();
    // });

});



