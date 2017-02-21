module.exports = (gulp, $, argv) => {
  gulp.task('build:config', (done) => gulp.src([
    `${global.CONFIG.src}/../package.json`,
    `${global.CONFIG.src}/../bower.json`
  ])
    .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/`)))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe(gulp.dest(global.CONFIG.dist))
    .pipe($.touchCmd())
  )
}
