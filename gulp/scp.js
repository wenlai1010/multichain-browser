/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/21
 */

import gulp from 'gulp';
import scp2 from 'gulp-scp2';
const SERVER_HOST_TEST = '172.16.33.201';
const PORT = 9422;
const USERNAME = 'root';
const PASSWORD = '&O@@cBn78i7X';

gulp.task('scp:dev', ['dev'], () => {
    return gulp.src('./build/**/*')
        .pipe(scp2({
            host: SERVER_HOST_TEST,
            port: PORT,
            username: USERNAME,
            password: PASSWORD,
            dest: `/data/web/prod`,
            watch() {
                global.logger.info(`[scp file upload ok...`);
                // TODO 可以实时检测public文件中的变化, 然后直接push到远程
                // 在测试机自己独享的情况下使用比较好
            }
        }))
        .on('error', function(err) {
            logger.error(err);
        });
});

gulp.task('scp:qa', ['dev'], () => {

    var options = {
        host: '121.42.41.192',
        port: '19422',
        user: 'appuser',
        pass: 'I6(K#ICPi(ra',
        remotePath: '/data/app/static/exchangeApi'
    };

    return gulp.src('./build/**/*')
        .pipe(scp2({
            host: options.host,
            port: options.port,
            username: options.user,
            password: options.pass,
            dest: options.remotePath,
            watch() {
                global.logger.info(`[scp file upload ok...`);
                // TODO 可以实时检测public文件中的变化, 然后直接push到远程
                // 在测试机自己独享的情况下使用比较好
            }
        }))
        .on('error', function(err) {
            logger.error(err);
        });
});

gulp.task('scp:prod', ['prod'], () => {
    return gulp.src('./prod/**/*')
        .pipe(scp2({
            host: SERVER_HOST_TEST,
            port: PORT,
            username: USERNAME,
            password: PASSWORD,
            dest: `/home/app/static/exchange_news`,
            watch() {
                global.logger.info(`[scp file upload ok ...`);
                // TODO 可以实时检测public文件中的变化, 然后直接push到远程
                // 在测试机自己独享的情况下使用比较好
            }
        }))
        .on('error', function(err) {
            logger.error(err);
        });
});