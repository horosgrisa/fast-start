module.exports = () => {
  global.gulp.task('build:base', (done) => gulp.src([
    `${global.CONFIG.src}/**`,
    `!${global.CONFIG.src}/views/**`,
    `!${global.CONFIG.src}/views`,
    `!${global.CONFIG.src}/public/**`,
    `!${global.CONFIG.src}/public`
  ])
    .pipe($.if(!global.argv.all, $.changed(global.CONFIG.dist)))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe(gulp.dest(global.CONFIG.dist))
    .pipe($.touchCmd())
  )
}
