'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('build:fonts', (done) => {
    return gulp.src(global.CONFIG.src + '/assets/fonts/**/*.*')
      .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/public/fonts')))
      .pipe($.using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe(gulp.dest(global.CONFIG.dist + '/public/fonts'))
      .pipe($.touch())
  })
}
