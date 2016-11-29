'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('lint:js', () => {
    return gulp.src([`${global.CONFIG.src}/**/*.js`].concat(global.CONFIG.exclude), {
      base: global.CONFIG.src
    })
      .pipe($.eslint())
      .pipe($.eslint.format(require('eslint-formatter-pretty')))
  })
}
