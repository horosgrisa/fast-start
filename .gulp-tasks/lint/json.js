'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:json', () => {
    return gulp.src(global.CONFIG.src + '/**/*.json')
      .pipe($.eslint())
      .pipe($.eslint.format())
  })
}
