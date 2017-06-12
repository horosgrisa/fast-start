module.exports = () => {
  if (global.CONFIG.server) {
    global.gulp.task('build:views', (done) => gulp.src(`${global.CONFIG.src}/views/**/*.{html,njk}`)
      .pipe($.if(!global.argv.all, $.changed(`${global.CONFIG.dist}/views/`)))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe(gulp.dest(`${global.CONFIG.dist}/views/`))
      .pipe($.touchCmd())
    )
  } else {
    global.gulp.task('build:views', (done) => gulp.src([
      `${global.CONFIG.src}/views/**/*.{html,njk}`
    ])
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.nunjucks.compile({}))
      .pipe($.rename((path) => { path.extname = '.html' }))
      .pipe($.if(process.env.NODE_ENV === 'production', $.htmlmin({ collapseWhitespace: true })))
      .pipe(gulp.dest(global.CONFIG.dist))
      .pipe($.touchCmd())
    )
  }
}
