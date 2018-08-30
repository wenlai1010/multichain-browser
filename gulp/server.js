/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import gulp from 'gulp';
import sequence from 'gulp-sequence';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import autoresponse from 'autoresponse';
import request from 'superagent';

import util from './util';

let browserSync = require('browser-sync').create();

global.browserSync = browserSync;

import webpackConfig from '../webpack.config.babel';

gulp.task('reload', sequence(
    ['html:server', 'img:server', 'js:server', 'scss:server', 'font:server']
));

function loadingCompiler() {
    if (!webpackConfig.plugins) {
        webpackConfig.plugins = [];
    }
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    webpackConfig.devtool = 'source-map';

    const webpackClient = 'webpack-hot-middleware/client?reload=true';

    for (let key in webpackConfig.entry) {
        webpackConfig.entry[key].unshift(webpackClient);
    }

    return webpack(webpackConfig);
}
const REG_STATIC = /\.(html|js|css|scss|png|gif|jpg|ttf|eot|svg|woff|map|json|ico|pdf)(\?.*)?(\#.*)?$/i;

gulp.task('server', ['reload'], function() {

    if (!webpackConfig.plugins) {
        webpackConfig.plugins = [];
    }
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    webpackConfig.devtool = 'source-map';

    const webpackClient = 'webpack-hot-middleware/client?reload=true';

    for (let key in webpackConfig.entry) {
        webpackConfig.entry[key].unshift(webpackClient);
    }

    let compiler = webpack(webpackConfig);

    browserSync.init({
        server: "./build",
        port: 8000,
        open: false,
        middleware: [
            webpackDevMiddleware(compiler, {
                hot: true,
                quiet: true,
                historyApiFallback: true,
                stats: {
                    colors: true
                },
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                },
                publicPath: webpackConfig.output.publicPath
            }),
            webpackHotMiddleware(compiler),
            getAutoResponse()
        ],
        ui: {
            port: 8001,
            weinre: {
                port: 8002
            }
        }
    });

    function getAutoResponse() {
        return autoresponse({
            responseDir: './mock',
            logLevel: 'info',
            post: true,
            get: {
                match: function (reqPathName) { // mock all `/xx/xx` path
                    return !/\.\w+(\?.*)?$/.test(reqPathName);
                }
            }
        });
    }

});

// 测试环境调试
gulp.task('server:remote', ['reload'], function() {

    let compiler = loadingCompiler();

    browserSync.init({
        server: "./build",
        port: 9000,
        open: false,
        middleware: [
            webpackDevMiddleware(compiler, {
                hot: true,
                quiet: false,
                historyApiFallback: true,
                stats: {
                    colors: true
                },
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                },
                publicPath: webpackConfig.output.publicPath
            }),
            webpackHotMiddleware(compiler),
            function (req, res, next) {
                if (REG_STATIC.test(req.originalUrl)) {
                    next();
                } else {
                    res.setHeader("Content-Type", "application/json;charset=UTF-8");
                    global.logger.warn('remote request begin: ' + req.originalUrl);
                    let dataArr = [];
                    req.on("data", function (data) {    //接收参数
                        dataArr.push(data);
                    });
                    req.on("end", function () {
                        let data = Buffer.concat(dataArr).toString();
                        // let host = 'http://api.dev.ico.com'; // 汪洋的ip
                        // let host = "http://10.23.3.15:8388" // qiangkezhen ip
                        // let host="https://10.23.1.112:8382"; // fanyukun ip
                        // let host="http://10.23.1.198:8382"; // jianjian
                        // let host="http://172.16.33.201:8388"; // 红包
                        let host="http://192.168.102.98:8340"; // 内网测试服务器
                        let params = {};
                        try {
                            params = JSON.parse(data);
                        } catch (err) {
                            params = data;
                        }

                        // global.logger.info('req.headers:' + JSON.stringify(req.headers));

                        if (req.method.toUpperCase() == 'GET') {
                            // console.log("get from ")
                            global.logger.warn('request get is begin : ' + req.originalUrl);
                            // global.logger.warn('============== begin ==============');
                            request
                                .get(host + req.originalUrl)
                                .send(params)
                                .set('Accept', 'application/json')
                                .set('accept-language', req.headers['accept-language'])
                                .set('Cookie', req.headers.cookie || '')
                                .set('Authorization', req.headers['authorization'] || '')
                                .end(function(err,resInner){
                                    if(resInner){
                                        res.end(resInner.text);
                                    }
                                });

                        } else {
                            global.logger.warn('request post is begin : ' + req.originalUrl);
                            request
                                .post(host + req.originalUrl)
                                .send(params)
                                .set('Accept', 'application/json')
                                .set('accept-language', req.headers['accept-language'])
                                .set('Cookie', req.headers.cookie || '')
                                .end((err, resInner) => {
                                    // debugger;
                                    console.log(JSON.stringify(resInner));
                                    global.logger.info('The set-cookie is: ' + JSON.stringify(resInner.header['set-cookie']));

                                    // 登录失败或者近期内使用同一个session
                                    if (!resInner.header['set-cookie']) {
                                        res.end(resInner.text);
                                        // res.end(JSON.stringify(resInner));
                                    } else {
                                        let cookieFromServer = resInner.header['set-cookie'][0];

                                        let sessionValue = cookieFromServer.split(';')[0].split('=')[1];
                                        global.logger.info('Your current session is :' + sessionValue);

                                        res.setHeader('set-cookie', cookieFromServer);
                                        res.end(resInner.text);
                                    }
                                });
                        }
                    })
                }
            }
        ],
        ui: {
            port: 9001,
            weinre: {
                port: 9002
            }
        }
    });

});

