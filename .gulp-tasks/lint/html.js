'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('lint:html', () => {
    const htmlhint = require('gulp-htmlhint')
    return gulp.src([`${global.CONFIG.src}/**/*.html`].concat(global.CONFIG.exclude))
      .pipe($.plumber())
      .pipe(htmlhint('.htmlhintrc'))
      .pipe(htmlhint.reporter('htmlhint-stylish'))
  })
}
