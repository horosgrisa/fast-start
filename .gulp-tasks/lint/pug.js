'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('lint:pug', () => {
    const pugLinter = require('gulp-pug-linter')
    return gulp.src([`${global.CONFIG.src}/**/*.pug`].concat(global.CONFIG.exclude))
      .pipe($.plumber())
      .pipe(pugLinter())
      .pipe(pugLinter.reporter())
  })
}
