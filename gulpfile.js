'use strict'
/* @flow */

const gulp = require('gulp')

const $ = require('gulp-load-plugins')()
global.browserSync = require('browser-sync').create()

const argv = require('yargs').argv
global.CONFIG = require('./.gulp-tasks/_gen-config.js')

require('./.gulp-tasks/build')(gulp, $, argv)
gulp.task('build', gulp.parallel(
  'build:base',
  'build:config',
  'build:asserts',
  'build:js',
  'build:css',
  'build:img',
  'build:html'
))

require('./.gulp-tasks/deploy')(gulp, $, argv)
gulp.task('deploy', gulp.series(
  'deploy:rsync'
))

require('./.gulp-tasks/fix')(gulp, $, argv)
gulp.task('fix', gulp.series(
  'fix:css',
  'fix:js',
  'fix:html'
))

require('./.gulp-tasks/lint')(gulp, $, argv)
gulp.task('lint', gulp.series(
  'lint:css',
  'lint:js',
  'lint:html'
))

require('./.gulp-tasks/server')(gulp, $, argv)
gulp.task('server', gulp.series(
    'run',
    'bs'
))

require('./.gulp-tasks/watch')(gulp, $, argv)

require('./.gulp-tasks/switch')(gulp, $, argv)
gulp.task('switch', gulp.series(
  'switch:project'
))

gulp.task('default',
  gulp.series(
    'build',
    'server',
    'watch'
  )
)
