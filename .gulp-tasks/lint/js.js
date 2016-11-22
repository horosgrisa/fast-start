'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('lint:js', () => {
    const eslint = require('gulp-eslint')
    return gulp.src([`${global.CONFIG.src}/**/*.js`].concat(global.CONFIG.exclude))
      .pipe(eslint())
      .pipe(eslint.format(require('eslint-formatter-pretty')))
  })
}
