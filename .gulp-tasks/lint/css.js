'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:css', () => {
    return gulp.src([global.CONFIG.src + '/**/*.css'].concat(global.CONFIG.exclude))
      .pipe($.stylelint({
        failAfterError: false,
        reporters: [{
          formatter: 'string',
          console: true
        }]
      }))
  })
}
