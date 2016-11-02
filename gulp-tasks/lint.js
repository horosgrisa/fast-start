'use strict'

let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('frontend:js::lint', () => {
    return gulp.src('src/public/js/**/*.js')
      .pipe($.eslint())
      .pipe($.eslint.format())
  })

  gulp.task('frontend:css::lint', () => {
    return gulp.src('src/public/css/**/*.css')
      .pipe($.stylelint({
        failAfterError: false,
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ]
      }))
  })

  gulp.task('backend::lint', (done) => {
    if (global.CONFIG.server) {
      return gulp.src([
        'src/lib/**/*.js',
        'src/routes/**/*.js',
        'src/index.js',
        'src/package.json',
        'src/bower.json'
      ], {
        base: 'src/'
      })
        .pipe($.plumber())
        .pipe($.eslint())
        .pipe($.eslint.format())
    } else {
      done()
    }
  })

  gulp.task('views::lint', () => {
    const pugFilter = $.filter(['**/*.pug'], {
      restore: true
    })
    const htmlFilter = $.filter(['**/*.html'], {
      restore: true
    })
    return gulp.src('src/views/**/*.*')
      .pipe($.plumber())
      .pipe(pugFilter)
      .pipe($.pugLinter())
      .pipe($.pugLinter.reporter())
      .pipe(pugFilter.restore)
      .pipe(htmlFilter)
      .pipe($.htmllint())
      .pipe(htmlFilter.restore)
  })
}
