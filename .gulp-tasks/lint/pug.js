'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('lint:pug', () => {
    const plumber = require('gulp-plumber')
    const pugLinter = require('gulp-pug-linter')
    return gulp.src([`${global.CONFIG.src}/**/*.pug`].concat(global.CONFIG.exclude))
      .pipe(plumber())
      .pipe(pugLinter())
      .pipe(pugLinter.reporter())
  })
}
