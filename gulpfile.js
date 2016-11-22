'use strict'
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const using = require('gulp-using')
const gIf = require('gulp-if')
const touch = require('gulp-touch')

const argv = require('yargs').argv
global.CONFIG = require('./.gulp-tasks/_gen-config.js')

if (argv._[0] === 'build' || !argv._[0]) {
  require('./.gulp-tasks/build')(gulp, plumber, using, gIf, touch)
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
}
if (argv._[0] === 'deploy') {
  require('./.gulp-tasks/deploy')(gulp, plumber, using, gIf, touch)
  gulp.task('deploy', gulp.series(
    'deploy:rsync'
  ))
}
if (argv._[0] === 'fix') {
  require('./.gulp-tasks/fix')(gulp, plumber, using, gIf, touch)
  gulp.task('fix', gulp.series(
    'fix:css',
    'fix:js',
    'fix:json',
    'fix:html'
  ))
}
if (argv._[0] === 'lint') {
  require('./.gulp-tasks/lint')(gulp, plumber, using, gIf, touch)
  gulp.task('lint', gulp.series(
    'lint:css',
    'lint:js',
    'lint:json',
    'lint:pug',
    'lint:html',
    'lint:todo'
  ))
}
if (argv._[0] === 'docs') {
  require('./.gulp-tasks/docs')(gulp, plumber, using, gIf, touch)
  gulp.task('docs', gulp.series(
    'docs:todo'
  ))
}
if (argv._[0] === 'server' || !argv._[0]) {
  require('./.gulp-tasks/server')(gulp, plumber, using, gIf, touch)
  gulp.task('server', gulp.series(
      'run',
      'bs'
  ))
}
if (argv._[0] === 'update') {
  require('./.gulp-tasks/update')(gulp, plumber, using, gIf, touch)
  gulp.task('self-update', gulp.series(
    'self-update:git'
  ))
}
if (argv._[0] === 'watch' || !argv._[0]) {
  require('./.gulp-tasks/watch')(gulp, plumber, using, gIf, touch)
}
if (argv._[0] === 'switch') {
  require('./.gulp-tasks/switch')(gulp, plumber, using, gIf, touch)
  gulp.task('switch', gulp.series(
    'switch:project'
  ))
}

if (!argv._[0]) {
  gulp.task('default',
  gulp.series(
    'build',
    'server',
    'watch'
  )
)
}

