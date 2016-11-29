'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('lint:html', () => {
    return gulp.src([`${global.CONFIG.src}/**/*.html`].concat(global.CONFIG.exclude))
      .pipe($.plumber())
      .pipe($.htmlhint('.htmlhintrc'))
      .pipe($.htmlhint.reporter('htmlhint-stylish'))
  })
}
