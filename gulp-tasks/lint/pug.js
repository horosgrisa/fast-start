'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:pug', () => {
    return gulp.src('src/**/*.pug')
      .pipe($.plumber())
      .pipe($.pugLinter())
      .pipe($.pugLinter.reporter())
  })
}
