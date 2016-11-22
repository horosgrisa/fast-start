'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('build:base', (done) => {
    const argv = require('yargs').argv
    const changed = require('gulp-changed')
    return gulp.src([
      `${global.CONFIG.src}/**`,
      `!${global.CONFIG.src}/views/**`,
      `!${global.CONFIG.src}/views`,
      `!${global.CONFIG.src}/assets/**`,
      `!${global.CONFIG.src}/assets`
    ].concat(global.CONFIG.exclude), {
      base: `${global.CONFIG.src}/`
    })
      .pipe(gIf(!argv.all, changed(`${global.CONFIG.dist}/`)))
      .pipe(using(global.CONFIG.using))
      .pipe(plumber())
      .pipe(gulp.dest(global.CONFIG.dist))
      .pipe(touch())
  })
}
