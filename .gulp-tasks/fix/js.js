module.exports = (gulp, $, argv) => {
  gulp.task('fix:js', () => {
    const isFixed = (file) => file.eslint !== null && file.eslint.fixed
    return gulp.src([`${global.CONFIG.src}/**/*.{js,jsx}`])
    .pipe($.using(Object.assign(global.CONFIG.using, {
      color: 'yellow',
      prefix: 'Fixed'
    })))
    .pipe($.plumber())
      .pipe($.eslint({
        fix: true
      }))
    .pipe($.if(isFixed, gulp.dest(`${global.CONFIG.src}/`)))
  })
}
