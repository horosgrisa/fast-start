'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  if (global.CONFIG.server) {
    gulp.task('build:html', (done) => {
      return gulp.src(global.CONFIG.src + '/views/**/*.html')
        .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/views/')))
        .pipe($.using({
          path: 'relative',
          color: 'green',
          filesize: false
        }))
        .pipe($.plumber())
        .pipe(gulp.dest(global.CONFIG.dist + '/views/'))
        .pipe($.touch())
    })
  } else {
    gulp.task('build:html', (done) => {
      return gulp.src([global.CONFIG.src + '/views/*.html'], {
        base: global.CONFIG.src + '/views'
      })
        .pipe($.flatmap(function (stream, file) {
          return stream
            .pipe($.if(!argv.all, $.newer({
              extra: [
                global.CONFIG.src + '/views/*/**/*.html'
              ],
              dest: global.CONFIG.dist,
              ext: '.html'
            })))
            .pipe($.using({
              path: 'relative',
              color: 'green',
              filesize: false
            }))
            .pipe($.plumber())
            .pipe($.include())
            .pipe(gulp.dest(global.CONFIG.dist))
            .pipe($.touch())
        }))
    })
  }
}
