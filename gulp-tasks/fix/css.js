'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('fix:css', () => {
    return gulp.src('src/public/css/**/*.css')
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
      .pipe(gulp.dest('src/public/css/'))
  })
}
