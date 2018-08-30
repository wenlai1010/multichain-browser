/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import gulp from 'gulp';
import sequence from 'gulp-sequence';

gulp.task('prod', sequence(
    ['clean:dev', 'clean:prod'],
    'html:prod',
    'js:prod',
    'scss:prod',
    ['img:prod', 'font:prod', 'favicon:prod']
));