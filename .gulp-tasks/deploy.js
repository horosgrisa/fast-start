'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('deploy:rsync', () => {
    return gulp.src([
      `${global.CONFIG.src}.build/**`
    ])
      .pipe($.using((Object.assign(global.CONFIG.using, {
        color: 'red',
        prefix: 'Deploy',
        filesize: true
      }))))
      .pipe($.rsync(global.CONFIG.deploy))
  })
}
