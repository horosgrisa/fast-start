'use strict'
const gulp = require('gulp')

var $ = require('gulp-load-plugins')()

const argv = require('yargs').argv
global.CONFIG = require('./.gulp-tasks/_gen-config.js')

require('./.gulp-tasks/build')(gulp, $, argv)
gulp.task('build', gulp.parallel(
  'build:base',
  'build:css',
  'build:fonts',
  'build:img',
  'build:js',
  'build:pug',
  'build:html',
  'build:njk'
))

require('./.gulp-tasks/deploy')(gulp, $, argv)
gulp.task('deploy', gulp.series(
  'deploy:rsync'
))

require('./.gulp-tasks/fix')(gulp, $, argv)
gulp.task('fix', gulp.series(
  'fix:css',
  'fix:js',
  'fix:json',
  'fix:html'
))

require('./.gulp-tasks/lint')(gulp, $, argv)
gulp.task('lint', gulp.series(
  'lint:css',
  'lint:js',
  'lint:json',
  'lint:pug',
  'lint:html',
  'lint:todo'
))

require('./.gulp-tasks/docs')(gulp, $, argv)
gulp.task('docs', gulp.series(
  'docs:todo',
  'docs:jsdoc'
))

require('./.gulp-tasks/server')(gulp, $, argv)
gulp.task('server', gulp.series(
    'run',
    'bs'
))

require('./.gulp-tasks/update')(gulp, $, argv)
gulp.task('self-update', gulp.series(
  'self-update:git'
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

