'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('docs:jsdoc', () => {
    const documentation = require('gulp-documentation')
    return gulp.src([`${global.CONFIG.src}/**/*.{css,js,html,pug}`].concat(global.CONFIG.exclude))
      .pipe(documentation('html'))
      .pipe(gulp.dest(`${global.CONFIG.src}/docs/`))
  })
}
