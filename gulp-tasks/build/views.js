'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

const pug = require('gulp-pug')
module.exports = function (gulp) {
  if (global.CONFIG.server) {
    gulp.task('build:views', (done) => {
      return gulp.src('src/views/**/*.*')
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
    gulp.task('build:views', (done) => {
      const pugFilter = $.filter(['**/*.pug'], {
        restore: true
      })
      const htmlFilter = $.filter(['**/*.html'], {
        restore: true
      })
      return gulp.src(['src/views/*.*'], {
        base: 'src/views'
      })
        .pipe($.flatmap(function (stream, file) {
          return stream
            .pipe($.if(!argv.all, $.newer({
              extra: [
                'src/views/partials/**/*.*',
                'src/views/templates/**/*.*'
              ],
              dest: global.CONFIG.dist + '/views/',
              ext: '.html'
            })))
            .pipe($.using({
              path: 'relative',
              color: 'green',
              filesize: false
            }))
            .pipe($.plumber())
            .pipe(pugFilter)
            .pipe($.if(!argv.production, $.pug({
              pretty: true
            })
          ))
            .pipe($.if(argv.production, $.pug()))
            .pipe(pugFilter.restore)
            .pipe(htmlFilter)
            .pipe($.include())
            .pipe(htmlFilter.restore)
            .pipe(gulp.dest(global.CONFIG.dist))
            .pipe($.touch())
        }))
    })
  }
}
