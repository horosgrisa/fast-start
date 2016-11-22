'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('build:fonts', (done) => {
    const argv = require('yargs').argv

    const changed = require('gulp-changed')
    return gulp.src(`${global.CONFIG.src}/assets/fonts/**/*.*`)
      .pipe(gIf(!argv.all, changed(`${global.CONFIG.dist}/public/fonts/`)))
      .pipe(using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe(plumber())
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/fonts/`))
      .pipe(touch())
  })
}
