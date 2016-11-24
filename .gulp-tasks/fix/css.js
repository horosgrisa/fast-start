'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('fix:css', () => {
    const postcss = require('gulp-postcss')
    const stylefmt = require('gulp-stylefmt')
    return gulp.src([`${global.CONFIG.src}/**/*.css`].concat(global.CONFIG.exclude))
      .pipe($.using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe(postcss([
        require('postcss-sorting')(
          require('../../.postcss-sorting.json')
        )
      ]))
      .pipe(stylefmt())
      .pipe(gulp.dest(`${global.CONFIG.src}/`))
  })
}
