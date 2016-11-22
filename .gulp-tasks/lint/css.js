'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('lint:css', () => {
    const stylelint = require('gulp-stylelint')
    return gulp.src([`${global.CONFIG.src}/**/*.css`].concat(global.CONFIG.exclude))
      .pipe(stylelint({
        failAfterError: false,
        reporters: [{
          formatter: 'string',
          console: true
        }]
      }))
  })
}
