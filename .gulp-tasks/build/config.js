module.exports = () => {
  gulp.task('build:config', (done) => gulp.src([
    `${global.CONFIG.src}/../package.{json,js}`,
    `${global.CONFIG.src}/../bower.{json,js}`
  ])
    .pipe($.if(!global.argv.all, $.changed(`${global.CONFIG.dist}/`)))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe(gulp.dest(global.CONFIG.dist))
    .pipe($.touchCmd())
  )
}
