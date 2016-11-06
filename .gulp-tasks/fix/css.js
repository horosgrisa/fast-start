'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('fix:css', () => {
    return gulp.src(global.CONFIG.src + '/**/*.css')
      .pipe($.using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe($.stylefmt())
      .pipe($.postcss([
        require('postcss-sorting')(
          require('../../.postcss-sorting.json')
        )
      ]))
      .pipe(gulp.dest(global.CONFIG.src + '/'))
  })
}
