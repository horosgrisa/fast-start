module.exports = (gulp, $, argv) => {
  if (global.CONFIG.server) {
    gulp.task('build:html', (done) => gulp.src(`${global.CONFIG.src}/views/**/*.html`)
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/views/`)))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe(gulp.dest(`${global.CONFIG.dist}/views/`))
      .pipe($.touchCmd())
)
  } else {
    gulp.task('build:html', (done) => gulp.src([
      `${global.CONFIG.src}/views/**/*.html`,
      `!${global.CONFIG.src}/views/**/_*.html`
    ])
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.nunjucks.compile({}))
      .pipe($.if(argv.production, $.htmlmin({ collapseWhitespace: true })))
      .pipe(gulp.dest(global.CONFIG.dist))
      .pipe($.touchCmd())
  )
  }
}
