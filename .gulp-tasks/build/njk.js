'use strict'

module.exports = function (gulp, $, argv) {
  if (global.CONFIG.server) {
    gulp.task('build:njk', (done) => {
      return gulp.src(`${global.CONFIG.src}/views/**/*.njk`, {
        base: `${global.CONFIG.src}/views/`
      })
        .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/views/`)))
        .pipe($.using(global.CONFIG.using))
        .pipe($.plumber())
        .pipe(gulp.dest(`${global.CONFIG.dist}/views/`))
        .pipe($.touch())
    })
  } else {
    gulp.task('build:njk', (done) => {
      return gulp.src([`${global.CONFIG.src}/views/*.njk`], {
        base: `${global.CONFIG.src}/views`
      })
        .pipe($.using(global.CONFIG.using))
        .pipe($.plumber())
        .pipe($.nunjucks.compile({}))
        .pipe($.rename(function (path) {
          path.extname = '.html'
        }))
        .pipe($.if(argv.production, $.htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(global.CONFIG.dist))
        .pipe($.touch())
    })
  }
}
