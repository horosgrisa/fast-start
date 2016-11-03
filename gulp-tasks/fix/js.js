'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('fix:js', () => {
    const isFixed = (file) => {
      return file.eslint != null && file.eslint.fixed
    }
    return gulp.src('src/public/js/**/*.js')
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
    .pipe($.if(isFixed, gulp.dest('src/public/js/')))
  })
}
