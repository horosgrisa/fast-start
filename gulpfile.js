'use strict'
/* @flow */

global.gulp = require('gulp')

global.$ = require('gulp-load-plugins')()
global.browserSync = require('browser-sync').create()

global.argv = require('yargs').argv
global.CONFIG = require('./.gulp-tasks/_gen-config.js')

require('./.gulp-tasks/build')()
global.gulp.task('build', global.gulp.parallel(
  'build:base',
  'build:config',
  'build:asserts',
  'build:js',
  'build:css',
  'build:img',
  'build:html'
))

require('./.gulp-tasks/deploy')()
global.gulp.task('deploy', global.gulp.series(
  'deploy:rsync'
))

require('./.gulp-tasks/fix')()
global.gulp.task('fix', global.gulp.series(
  'fix:css',
  'fix:js',
  'fix:html'
))

require('./.gulp-tasks/lint')()
global.gulp.task('lint', global.gulp.series(
  'lint:css',
  'lint:js',
  'lint:html'
))

require('./.gulp-tasks/server')()
global.gulp.task('server', global.gulp.series(
    'run',
    'bs'
))

require('./.gulp-tasks/watch')()

require('./.gulp-tasks/switch')()
global.gulp.task('switch', global.gulp.series(
  'switch:project'
))

global.gulp.task('default',
  global.gulp.series(
    'build',
    'server',
    'watch'
  )
)
