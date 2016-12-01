'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('fix:css', () => {
    return gulp.src([`${global.CONFIG.src}/**/*.css`].concat(global.CONFIG.exclude))
      .pipe($.using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe($.postcss([
        require('stylefmt')(),
        require('postcss-sorting')(
          require('../../.postcss-sorting.json')
        )
      ]))
      .pipe(gulp.dest(`${global.CONFIG.src}/`))
  })
}
