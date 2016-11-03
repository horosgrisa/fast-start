'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:backend', (done) => {
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
}
