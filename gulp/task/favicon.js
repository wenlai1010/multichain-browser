/**
 * @file
 * @auth jinguangguo
 * @date 2017/1/16
 */


import gulp from 'gulp';
import md5 from 'gulp-md5-plus';

gulp.task('favicon:dev', function () {
    return gulp.src('./src/img/favicon.ico')
        .pipe(gulp.dest('./build'));
});

gulp.task('favicon:server', ['favicon:dev'], function () {
    const files = './src/img/favicon.ico';
    const reload = global.browserSync.reload;

    gulp.watch(files, function (event) {
        return gulp.src(files)
            .pipe(gulp.dest('./build'))
            .pipe(reload({stream: true}));
    });
});

gulp.task('favicon:prod', ['favicon:dev'], function () {
    return gulp.src([
            './build/favicon.ico'
        ])
        .pipe(gulp.dest('./prod'));
});