'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('lint:json', () => {
    return gulp.src([`${global.CONFIG.src}/**/*.json`].concat(global.CONFIG.exclude))
      .pipe($.eslint())
      .pipe($.eslint.format())
  })
}
