'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('build:img', (done) => {
    return gulp.src(`${global.CONFIG.src}/assets/img/**/*.*`)
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/img/`)))
      .pipe($.using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe($.imagemin())
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/img/`))
      .pipe($.touch())
  })
}
