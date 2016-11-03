'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:js', () => {
    return gulp.src('src/public/js/**/*.js')
      .pipe($.eslint())
      .pipe($.eslint.format())
  })
}
