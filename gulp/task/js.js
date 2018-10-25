/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import gulp from 'gulp';
import webpack from 'gulp-webpack';
import uglify from 'gulp-uglify';
import md5 from 'gulp-md5-plus';
import replace from 'gulp-replace';
import webpackConfig from '../../webpack.config.babel';
import util from '../util';

gulp.task('dep:dev', function () {
    return gulp.src('./src/dep/*')
        .pipe(gulp.dest('./build/dep'))
});

gulp.task('js:dev', ['dep:dev'], function () {
    webpackConfig.devtool = 'source-map';
    return gulp
        .src('./src/js/*.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./build'));
});

gulp.task('js:server', ['dep:dev']);

gulp.task('dep-min', ['dep:dev'], function () {
    return gulp
        .src('./build/dep/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./prod/dep'));
});

gulp.task('js:prod', ['js:dev'], function () {
    return gulp
        .src('./build/**/*.js')
        .pipe(replace('http://www.achainlabs.ak/udc/udc/authcode/sendPeep', 'https://www.achainlabs.com/udc/udc/authcode/sendPeep')) //测试链改正式链
        .pipe(uglify())
        .pipe(md5(6, './prod/*.html'))
        .pipe(gulp.dest('./prod'));
});
