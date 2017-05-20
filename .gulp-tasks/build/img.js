module.exports = () => {
  global.gulp.task('build:img', (done) => gulp.src(`${global.CONFIG.src}/public/**/*.{jpg,jpeg,png,gif}`)
    .pipe($.if(!global.argv.all, $.changed(`${global.CONFIG.dist}/public/`)))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
    .pipe($.touchCmd())
  )
}
