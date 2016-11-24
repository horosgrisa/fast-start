'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('lint:js', () => {
    const eslint = require('gulp-eslint')
    return gulp.src([`${global.CONFIG.src}/**/*.js`].concat(global.CONFIG.exclude), {
      base: global.CONFIG.src
    })
      .pipe(eslint())
      .pipe(eslint.format(require('eslint-formatter-pretty')))
  })
}
