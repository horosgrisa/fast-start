'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('deploy:rsync', () => {
    const rsync = require('gulp-rsync')
    return gulp.src([
      `${global.CONFIG.src}/build/**`
    ])
      .pipe(rsync(global.CONFIG.deploy))
  })
}
