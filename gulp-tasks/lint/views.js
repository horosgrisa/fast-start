'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:views', () => {
    const pugFilter = $.filter(['**/*.pug'], {
      restore: true
    })
    const htmlFilter = $.filter(['**/*.html'], {
      restore: true
    })
    return gulp.src('src/views/**/*.*')
      .pipe($.plumber())
      .pipe(pugFilter)
      .pipe($.pugLinter())
      .pipe($.pugLinter.reporter())
      .pipe(pugFilter.restore)
      .pipe(htmlFilter)
      .pipe($.htmllint())
      .pipe(htmlFilter.restore)
  })
}
