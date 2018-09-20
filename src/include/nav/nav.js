/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/18
 */
import Config from '../../config/config';

window.url = Config.baseUriAchain;

$(function () {
    // let lang = window.sessionStorage.getItem('LANG')? window.sessionStorage.getItem('LANG') : 'en';
        // window.location.reload();

    let $module = $('.layout-nav');


    if ($module[0]) {
        $module.find('.js-nav').click(function (e) {
            e.preventDefault();
            // 页面间的跳转
            // window.location.href = $(this).data('href');
            $('.js-selected').css('visibility','hidden');
            $(this).find('i').css('visibility','visible');
            $('.blockchain-nav').text($(this).text());
            if($(this).data('href') == 'selfsell'){
                $('#logo').attr('src','./img/selfsell-logo.png');
            }else{
                $('#logo').attr('src','./img/achain-logo.png');
            }

        });
        $(".blockchain-nav").mouseenter(function(e){
            $(".browser-select").css('visibility','visible');
            $(".browser-select").css('opacity','1');
            $(".browser-select").css('transform','translateY(-18px)');
        });
        $(".blockchain-nav").hover(function(e){
            $(".browser-select").css('visibility','visible');
            $(".browser-select").css('opacity','1');
            $(".browser-select").css('transform','translateY(-18px)');
        });
        $(".item").mouseleave(function(e){
            $(".browser-select").css('visibility','hidden');
            $(".browser-select").css('opacity','0');
            $(".browser-select").css('transform','translateY(0)');
        });
    }
    // $('.js-lang').click(function(e) {
    //     // 获取当前页面
    //     let targetLang = $(this).data('lang');
    //     window.sessionStorage.setItem('LANG',targetLang);
    //     window.location.reload();
    // });

});



