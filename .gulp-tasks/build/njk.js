'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  if (global.CONFIG.server) {
    gulp.task('build:njk', (done) => {
      return gulp.src(global.CONFIG.src + '/views/**/*.njk')
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
    gulp.task('build:njk', (done) => {
      return gulp.src([global.CONFIG.src + '/views/*.njk'], {
        base: global.CONFIG.src + '/views/'
      })
        .pipe($.flatmap(function (stream, file) {
          return stream
            .pipe($.if(!argv.all, $.newer({
              extra: [
                global.CONFIG.src + '/views/*/**/*.njk'
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
             .pipe($.nunjucks.compile({}))
             .pipe($.rename(function (path) {
               path.extname = '.html'
             }))
            .pipe(gulp.dest(global.CONFIG.dist))
            .pipe($.touch())
        }))
    })
  }
}
