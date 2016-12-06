'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('deploy:rsync', () => {
    return gulp.src([
      `${global.CONFIG.src}/build/**`
    ])
    .pipe($.using())
      .pipe($.rsync(global.CONFIG.deploy))
  })
}
