'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:pug', () => {
    return gulp.src([global.CONFIG.src + '/**/*.pug'].concat(global.CONFIG.exclude))
      .pipe($.plumber())
      .pipe($.pugLinter())
      .pipe($.pugLinter.reporter())
  })
}
