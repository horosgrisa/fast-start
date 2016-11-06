'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('build:img', (done) => {
    return gulp.src(global.CONFIG.src + '/assets/img/**/*.*')
      .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/public/img')))
      .pipe($.using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe($.imagemin())
      .pipe(gulp.dest(global.CONFIG.dist + '/public/img'))
      .pipe($.touch())
  })
}
