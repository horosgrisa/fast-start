'use strict'
const gulp = require('gulp')

global.CONFIG = require('./config.json')

require('./gulp-tasks/build')(gulp)
require('./gulp-tasks/fix')(gulp)
require('./gulp-tasks/lint')(gulp)
require('./gulp-tasks/server')(gulp)
require('./gulp-tasks/update')(gulp)
require('./gulp-tasks/watch')(gulp)

gulp.task('build', gulp.parallel(
  'build:backend',
  'build:configs',
  'build:css',
  'build:fonts',
  'build:img',
  'build:js',
  'build:views'
))

gulp.task('fix', gulp.parallel(
  'fix:backend',
  'fix:css',
  'fix:js',
  'fix:views'
))

gulp.task('lint', gulp.series(
  'lint:backend',
  'lint:css',
  'lint:js',
  'lint:views'
))

gulp.task('server', gulp.series(
    'nodemon',
    'bs'
))

gulp.task('self-update', gulp.series(
  'self-update:git'
))

gulp.task('default',
  gulp.series(
    'build',
    'server',
    'watch'
  )
)
