'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:js', () => {
    return gulp.src(global.CONFIG.src + '/**/*.js')
      .pipe($.eslint())
      .pipe($.eslint.format())
  })
}
