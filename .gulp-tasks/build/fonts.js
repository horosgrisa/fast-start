'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('build:fonts', (done) => {
    return gulp.src(`${global.CONFIG.src}/assets/fonts/**/*.*`)
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/fonts/`)))
      .pipe($.using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/fonts/`))
      .pipe($.touch())
  })
}
