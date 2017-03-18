module.exports = () => {
  gulp.task('build:asserts', (done) => gulp.src(`${global.CONFIG.src}/assets/**/*.{eot,svg,ttf,woff,woff2,ico}`)
    .pipe($.if(!global.argv.all, $.changed(`${global.CONFIG.dist}/public/`)))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
    .pipe($.touchCmd())
  )
}
