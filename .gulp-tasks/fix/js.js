'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('fix:js', () => {
    return gulp.src([global.CONFIG.src + '/**/*.js'])
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
    .pipe(gulp.dest(global.CONFIG.src + '/'))
  })
}
