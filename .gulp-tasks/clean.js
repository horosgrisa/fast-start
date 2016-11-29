'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('clean:files', (done) => {
    return gulp.src([
      `${global.CONFIG.dist}/**`
    ], { read: false }) // much faster
    .pipe($.ignore('node_modules/**'))
      .pipe($.rimraf())
  })
}
