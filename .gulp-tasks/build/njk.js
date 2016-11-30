'use strict'

module.exports = (gulp, $, argv) => {
  if (global.CONFIG.server) {
    gulp.task('build:njk', (done) => {
      return gulp.src(`${global.CONFIG.src}/views/**/*.njk`)
        .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/views/`)))
        .pipe($.using(global.CONFIG.using))
        .pipe($.plumber())
        .pipe(gulp.dest(`${global.CONFIG.dist}/views/`))
        .pipe($.touch())
    })
  } else {
    gulp.task('build:njk', (done) => {
      return gulp.src([`${global.CONFIG.src}/views/**/*.njk`, `${global.CONFIG.src}/views/**/_*.njk`])
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
