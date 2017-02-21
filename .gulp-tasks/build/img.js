module.exports = (gulp, $, argv) => {
  gulp.task('build:img', (done) => gulp.src(`${global.CONFIG.src}/assets/**/*.{jpg,jpeg,png,gif}`)
    .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/`)))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
    .pipe($.touchCmd())
  )
}
