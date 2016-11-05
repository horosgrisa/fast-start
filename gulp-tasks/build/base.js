'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('build:base', (done) => {
    return gulp.src([
      'src/**',
      '!src/node_modules/**',
      '!src/node_modules/',
      '!src/bower_components/**',
      '!src/bower_components/',
      '!src/views/**',
      '!src/views/',
      '!src/assets/**',
      '!src/assets/'
    ], {
      base: 'src'
    })
      .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/')))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe(gulp.dest(global.CONFIG.dist))
      .pipe($.touch())
  })
}
