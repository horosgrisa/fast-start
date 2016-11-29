'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('lint:pug', () => {
    return gulp.src([`${global.CONFIG.src}/**/*.pug`].concat(global.CONFIG.exclude))
      .pipe($.plumber())
      .pipe($.pugLinter())
      .pipe($.pugLinter.reporter())
  })
}
