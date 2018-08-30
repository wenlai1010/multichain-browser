/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import gulp from 'gulp';
import sequece from 'gulp-sequence';

gulp.task('dev', sequece(
    ['clean:dev'],
    ['html:dev', 'js:dev', 'scss:dev', 'img:dev', 'font:dev',  'favicon:dev']
));