'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('fix:views', () => {
    const htmlFilter = $.filter(['**/*.html'], {
      restore: true
    })
    return gulp.src('src/views/**/*.*')
      .pipe($.using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe(htmlFilter)
      .pipe($.jsbeautifier({
        indent_char: ' ',
        indent_size: 2
      }))
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest('src/views/'))
  })
}
