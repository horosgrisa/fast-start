'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('fix:json', () => {
    return gulp.src([global.CONFIG.src + '/**/*.json'].concat(global.CONFIG.exclude))
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
