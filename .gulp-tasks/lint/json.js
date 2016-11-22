'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('lint:json', () => {
    const eslint = require('gulp-eslint')
    return gulp.src([`${global.CONFIG.src}/**/*.json`].concat(global.CONFIG.exclude))
      .pipe(eslint())
      .pipe(eslint.format())
  })
}
