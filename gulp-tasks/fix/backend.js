'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('fix:backend', (done) => {
    if (global.CONFIG.server) {
      const isFixed = (file) => {
        return file.eslint != null && file.eslint.fixed
      }
      return gulp.src([
        'src/lib/**/*.js',
        'src/routes/**/*.js',
        'src/index.js',
        'src/package.json',
        'src/bower.json'
      ], {
        base: 'src/'
      })
        .pipe($.using({
          path: 'relative',
          color: 'yellow',
          filesize: false
        }))
        .pipe($.plumber())
        .pipe($.jsbeautifier())
        .pipe($.eslint({
          fix: true
        }))
        .pipe($.if(isFixed, gulp.dest('src/')))
    } else {
      done()
    }
  })
}
