'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('fix:html', () => {
    const jsbeautifier = require('gulp-jsbeautifier')
    return gulp.src([`${global.CONFIG.src}/**/*.html`].concat(global.CONFIG.exclude))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe(jsbeautifier({
        indent_char: ' ',
        indent_size: 2
      }))
      .pipe(gulp.dest(`${global.CONFIG.src}/`))
  })
}
