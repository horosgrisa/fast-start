'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('fix:html', () => {
    const jsbeautifier = require('gulp-jsbeautifier')
    return gulp.src([`${global.CONFIG.src}/**/*.html`].concat(global.CONFIG.exclude))
      .pipe(using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe(plumber())
      .pipe(jsbeautifier({
        indent_char: ' ',
        indent_size: 2
      }))
      .pipe(gulp.dest(`${global.CONFIG.src}/`))
  })
}
