'use strict'

module.exports = function (gulp, $, argv) {
  if (global.CONFIG.server) {
    gulp.task('build:html', (done) => {
      return gulp.src(`${global.CONFIG.src}/views/**/*.html`, {
        base: `${global.CONFIG.src}/views/`
      })
        .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/views/`)))
        .pipe($.using(global.CONFIG.using))
        .pipe($.plumber())
        .pipe(gulp.dest(`${global.CONFIG.dist}/views/`))
        .pipe($.touch())
    })
  } else {
    gulp.task('build:html', (done) => {
      const nunjucks = require('gulp-nunjucks')
      return gulp.src([`${global.CONFIG.src}/views/*.html`], {
        base: `${global.CONFIG.src}/views`
      })
        .pipe($.using(global.CONFIG.using))
        .pipe($.plumber())
        .pipe(nunjucks.compile({}))
        .pipe(gulp.dest(global.CONFIG.dist))
        .pipe($.touch())
    })
  }
}
