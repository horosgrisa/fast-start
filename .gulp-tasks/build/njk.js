'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  if (global.CONFIG.server) {
    gulp.task('build:njk', (done) => {
      const argv = require('yargs').argv
      const changed = require('gulp-changed')
      return gulp.src(`${global.CONFIG.src}/views/**/*.njk`, {
        base: `${global.CONFIG.src}/views/`
      })
        .pipe(gIf(!argv.all, changed(`${global.CONFIG.dist}/views/`)))
        .pipe(using(global.CONFIG.using))
        .pipe(plumber())
        .pipe(gulp.dest(`${global.CONFIG.dist}/views/`))
        .pipe(touch())
    })
  } else {
    gulp.task('build:njk', (done) => {
      const nunjucks = require('gulp-nunjucks')
      return gulp.src([`${global.CONFIG.src}/views/*.njk`], {
        base: `${global.CONFIG.src}/views`
      })
        .pipe(using(global.CONFIG.using))
        .pipe(plumber())
        .pipe(nunjucks.compile({}))
        .pipe(gulp.dest(global.CONFIG.dist))
        .pipe(touch())
    })
  }
}
