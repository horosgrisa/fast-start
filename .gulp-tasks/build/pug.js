'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  if (global.CONFIG.server) {
    const argv = require('yargs').argv
    const changed = require('gulp-changed')
    gulp.task('build:pug', (done) => {
      return gulp.src(`${global.CONFIG.src}/views/**/*.pug`, {
        base: `${global.CONFIG.src}/views/`
      })
        .pipe(gIf(!argv.all, changed(`${global.CONFIG.dist}/views/`)))
        .pipe(using(global.CONFIG.using))
        .pipe(plumber())
        .pipe(gulp.dest(`${global.CONFIG.dist}/views/`))
        .pipe(touch())
    })
  } else {
    gulp.task('build:pug', (done) => {
      const argv = require('yargs').argv
      const pug = require('gulp-pug')
      return gulp.src([`${global.CONFIG.src}/views/*.pug`], {
        base: `${global.CONFIG.src}/views`
      })
          .pipe(using(global.CONFIG.using))
          .pipe(plumber())
          .pipe(gIf(!argv.production, pug({
            pretty: true
          })
        ))
        .pipe(gIf(argv.production, pug()))
        .pipe(gulp.dest(global.CONFIG.dist))
        .pipe(touch())
    })
  }
}
