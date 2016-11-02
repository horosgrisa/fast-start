'use strict'

let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('frontend:js::fix', () => {
    const isFixed = (file) => {
      return file.eslint != null && file.eslint.fixed
    }
    return gulp.src('src/public/js/**/*.js')
      .pipe($.using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe($.jsbeautifier())
      .pipe($.eslint({
        fix: true
      }))
      .pipe($.if(isFixed, gulp.dest('src/public/js/')))
  })

  gulp.task('frontend:css::fix', () => {
    return gulp.src('src/public/css/**/*.css')
      .pipe($.using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe($.stylefmt())
      .pipe($.postcss([
        require('postcss-sorting')(
          require('../.postcss-sorting.json')
        )
      ]))
      .pipe(gulp.dest('src/public/css/'))
  })

  gulp.task('backend::fix', (done) => {
    if (global.CONFIG.server) {
      const isFixed = (file) => {
        return file.eslint != null && file.eslint.fixed
      }
      return gulp.src([
        'src/lib/**/*.js',
        'src/routes/**/*.js',
        'src/index.js',
        'src/package.json',
        'src/bower.json'
      ], {
        base: 'src/'
      })
        .pipe($.using({
          path: 'relative',
          color: 'yellow',
          filesize: false
        }))
        .pipe($.jsbeautifier())
        .pipe($.eslint({
          fix: true
        }))
        .pipe($.if(isFixed, gulp.dest('src/')))
    } else {
      done()
    }
  })

  gulp.task('views::fix', () => {
    const htmlFilter = $.filter(['**/*.html'], {
      restore: true
    })
    return gulp.src('src/views/**/*.*')
      .pipe($.using({
        path: 'relative',
        color: 'yellow',
        filesize: false
      }))
      .pipe(htmlFilter)
      .pipe($.jsbeautifier({
        indent_char: ' ',
        indent_size: 2
      }))
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest('src/views/'))
  })
}
