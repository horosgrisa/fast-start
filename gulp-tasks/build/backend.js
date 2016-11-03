'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('build:backend', (done) => {
    if (global.CONFIG.server) {
      return gulp.src([
        'src/lib/**/*.js',
        'src/routes/**/*.js',
        'src/index.js'
      ], {
        base: 'src'
      })
        .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/')))
        .pipe($.using({
          path: 'relative',
          color: 'green',
          filesize: false
        }))
        .pipe($.plumber())
        .pipe(gulp.dest(global.CONFIG.dist + '/'))
        .pipe($.touch())
    } else {
      done()
    }
  })
}
