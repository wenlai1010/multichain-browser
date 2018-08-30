/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import gulp from 'gulp';
import swig from 'gulp-swig';
import replace from 'gulp-replace';
import minifyHtml from 'gulp-minify-html';

gulp.task('html:dev', function () {
    return gulp.src('./src/*.html')
        .pipe(swig())
        .pipe(replace('scss', 'css'))
        .pipe(gulp.dest('./build'))
});

gulp.task('html:server', function () {

    const reload = global.browserSync.reload;
    const files = './src/*.html';

    function todo(path = files) {
        return gulp.src(path)
            .pipe(swig({defaults: { cache: false }}))
            .pipe(replace('scss', 'css'))
            .pipe(gulp.dest('./build'))
            .pipe(reload({stream: true}))
    }

    gulp.watch([
        './src/include/**/*.html',
        './src/*.html'
    ], function (event) {
        let path = event.path;
        if (path.indexOf('include') >= 0) {
            todo();
        } else {
            return todo(path);
        }
    });

    return todo();

});

gulp.task('html:prod', ['html:dev'], function () {
    return gulp.src('./build/*.html')
        .pipe(minifyHtml({
            empty: true, // 保留空属性
            cdata: false, // 保留scripts标签的CDATA
            comments: false, // 保留注释
            conditionals: true, // 保留条件语句
            spare: true, // 保留多余属性
            quotes: true, // 保留所有引用
            loose: false // 保留1个空白符
        }))
        .pipe(gulp.dest('./prod'));
});
