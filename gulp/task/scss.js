/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import md5 from 'gulp-md5-plus';

gulp.task('scss:dep', function () {
    return gulp
        .src('./src/scss/dep/*.{scss,css}')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/dep'));
});

gulp.task('scss:dev', ['scss:dep'], function () {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('scss:server', ['scss:dep'], function () {

    const reload = global.browserSync.reload;
    const files = './src/scss/*.scss';

    function todo(path = files) {
        return gulp.src(path)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build/css'))
            .pipe(reload({stream: true}))
    }

    gulp.watch([
        './src/include/**/*.scss',
        './src/scss/base/*.scss',
        './src/scss/dep/*.scss',
        './src/scss/*.scss',
        './src/module/**/*.scss'
    ], function (event) {
        let path = event.path;
        if (path.indexOf('include') >= 0 || path.indexOf('base') >= 0 || path.indexOf('module') >= 0) {
            todo();
        } else {
            return todo(path);
        }
    });

    gulp.watch(files, function (event) {
        return todo(event.path);
    });

    return todo();

});

gulp.task('scss:prod', ['scss:dev'], function () {
    return gulp.src('./build/css/**/*.css')
        .pipe(webpcss())
        .pipe(cleanCSS())
        .pipe(md5(6, './prod/*.html'))
        .pipe(gulp.dest('./prod/css'));
});