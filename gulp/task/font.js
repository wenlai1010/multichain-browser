/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import gulp from 'gulp';
import md5 from 'gulp-md5-plus';

gulp.task('font:dev', function () {
    return gulp.src('./src/icomoon/fonts/*')
        .pipe(gulp.dest('./build/css/fonts'));
});

gulp.task('font:server', ['font:dev'], function () {
    const files = './icomoon/fonts/*';
    const reload = global.browserSync.reload;

    /**
     * 当font.scss文件发生变化
     *  1.复制字体
     *  2.重新编译scss
     */
    gulp.watch(files, function (event) {
        // 样式重新编译一次
        gulp.run('scss:dev');
        return gulp.src(files)
            .pipe(gulp.dest('./build/css/fonts'))
            .pipe(reload({stream: true}));
    });
});

gulp.task('font:prod', ['font:dev'], function () {
    return gulp.src([
        './build/css/fonts/*.*'
    ])
        .pipe(md5(6, './prod/css/*.css'))
        .pipe(gulp.dest('./prod/css/fonts/'));
});