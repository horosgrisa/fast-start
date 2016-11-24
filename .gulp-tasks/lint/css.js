'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('lint:css', () => {
    return gulp.src([`${global.CONFIG.src}/**/*.css`].concat(global.CONFIG.exclude))
      .pipe($.stylelint({
        failAfterError: false,
        reporters: [{
          formatter: 'string',
          console: true
        }]
      }))
  })
}
