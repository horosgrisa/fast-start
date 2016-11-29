'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('deploy:rsync', () => {
    return gulp.src([
      `${global.CONFIG.src}/build/**`
    ])
      .pipe($.rsync(global.CONFIG.deploy))
  })
}
