'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('fix:html', () => {
    return gulp.src([global.CONFIG.src + '/**/*.html'].concat(global.CONFIG.exclude))
      .pipe($.using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe($.jsbeautifier({
        indent_char: ' ',
        indent_size: 2
      }))
      .pipe(gulp.dest(global.CONFIG.src + '/'))
  })
}
