'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('build:img', (done) => {
    const argv = require('yargs').argv
    const changed = require('gulp-changed')
    const imagemin = require('gulp-imagemin')
    return gulp.src(`${global.CONFIG.src}/assets/img/**/*.*`)
      .pipe(gIf(!argv.all, changed(`${global.CONFIG.dist}/public/img/`)))
      .pipe(using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe(plumber())
      .pipe(imagemin())
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/img/`))
      .pipe(touch())
  })
}
