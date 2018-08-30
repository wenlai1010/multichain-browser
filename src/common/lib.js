/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/19
 */
 
// import filter from '../util/filter';
// import parseUrl from '../util/parseUrl';
// import {REG_URL} from '../constants';

// export default {
    // filter: filter,
    /**
     * 做登录之后的处理
     */
    // doLogin() {
    //     cookie.set('LOGIN_TOKEN', 1);
    //     goPage();
    //
    //     function goPage() {
    //         let query = parseUrl();
    //         let to = window.decodeURIComponent(query.from);
    //         if (REG_URL.test(to) ===  true) {
    //             window.location.href = to;
    //         } else {
    //             window.location.href = './index.html';
    //         }
    //     }
    //
    // },

    /**
     * 登出
     */
    // doLogout() {
    //     cookie.remove('LOGIN_TOKEN');
    //
    //     // 清理轮循
    //     let app = window.app;
    //     window.clearInterval(app.loopTradeInfoTimeId);
    //     window.clearInterval(app.loopTradeGetListTimeId);
    //     window.clearInterval(app.loopDepthMapTimeId);
    //     window.clearInterval(app.loopUnReadMessageTimeId);
    //
    //     window.location.href = './index.html';
    // },

    /**
     * 是否登录
     * @returns {boolean}
     */
    // isLogin() {
    //     return cookie.get('LOGIN_TOKEN') === '1'? true : false;
    // },

    /**
     * 用户是否已经实名
     */
    // hasAuth() {
    //     return !cookie.get('HAS_AUTH') === true ? false : true;
    // },

    /**
     * 复制
     * @param element
     */
    // copy(element) {
    //     element.select();
    //     $(element).addClass('fn-selected');
    //     document.execCommand("Copy");
    //
    //     element.blur();
    //     setTimeout(() => {
    //         $(element).removeClass('fn-selected');
    //     }, 2000);
    //     window.success('Success');
    // },

    /**
     * 判断是否已经登录
     * @param next
     */
    // checkLogin(next) {
    //     if (this.isLogin() === true) {
    //         next();
    //     } else {
    //         window.location.href = './login.html';
    //     }
    // },

    /**
     * 判断是否实名
     * @param next
     */
    // checkAuth(next) {
    //     if (this.hasAuth() === true) {
    //         next();
    //     } else {
    //         window.location.href = './account.html#/certification';
    //     }
    // },

    /**
     * 判断登录和实名认证
     * @param next
     */
    // checkLoginAndAuth(next) {
    //     if (this.isLogin() === true) {
    //         if (this.hasAuth() === true) {
    //             next();
    //         } else {
    //             window.location.href = './account.html#/certification';
    //         }
    //     } else {
    //         window.location.href = './login.html';
    //     }
    // },

    /**
     * 获取手机字符串
     */
    // getPhoneSuffix() {
    //     if (window.app.user.requested === false) {
    //         throw new Error('No login ...');
    //     }
    //     return window.app.user.value.mobileText;
    // }

// }

