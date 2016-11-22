'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('fix:json', () => {
    const eslint = require('gulp-eslint')
    return gulp.src([`${global.CONFIG.src}/**/*.json`].concat(global.CONFIG.exclude))
    .pipe(using({
      path: 'relative',
      color: 'yellow',
      filesize: false
    }))
    .pipe(plumber())
    .pipe(eslint({
      fix: true
    }))
    .pipe(gulp.dest(`${global.CONFIG.src}/`))
  })
}
