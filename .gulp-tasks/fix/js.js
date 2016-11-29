'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('fix:js', () => {
    const eslint = require('gulp-eslint')
    return gulp.src([`${global.CONFIG.src}/**/*.js`].concat(global.CONFIG.exclude))
    .pipe($.using({
      path: 'relative',
      color: 'yellow',
      filesize: false
    }))
    .pipe($.plumber())
      .pipe(eslint({
        fix: true
      }))
    .pipe(gulp.dest(`${global.CONFIG.src}/`))
  })
}
