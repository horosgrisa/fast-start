'use strict'
const gulp = require('gulp')
const argv = require('yargs').argv

global.CONFIG = require('./config.json')

require('./gulp-tasks/build')(gulp)
require('./gulp-tasks/lint')(gulp)
require('./gulp-tasks/fix')(gulp)
require('./gulp-tasks/watch')(gulp)
require('./gulp-tasks/server')(gulp)

gulp.task('build', gulp.parallel(
  'frontend:js',
  'frontend:css',
  'frontend:font',
  'frontend:img',
  'backend',
  'views',
  'config'
))

gulp.task('server', gulp.series(
    'server:node',
    'server:bs'
))

gulp.task('lint', gulp.series(
  'frontend:css::lint',
  'frontend:js::lint',
  'backend::lint',
  'views::lint'
))

gulp.task('fix', gulp.series(
  'frontend:css::fix',
  'frontend:js::fix',
  'backend::fix',
  'views::fix'
))

gulp.task('self-update', gulp.series(
  'update'
))

gulp.task('default',
  gulp.series(
    'build',
    'server',
    'watch'
  )
)
