'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  if (global.CONFIG.server) {
    gulp.task('build:pug', (done) => {
      return gulp.src('src/views/**/*.pug')
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
    gulp.task('build:pug', (done) => {
      return gulp.src(['src/views/*.pug'], {
        base: 'src/views'
      })
        .pipe($.flatmap(function (stream, file) {
          return stream
            .pipe($.if(!argv.all, $.newer({
              extra: [
                'src/views/*/**/*.pug'
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
            .pipe($.if(!argv.production, $.pug({
              pretty: true
            })
          ))
          .pipe($.if(argv.production, $.pug()))
          .pipe(gulp.dest(global.CONFIG.dist))
          .pipe($.touch())
        }))
    })
  }
}
