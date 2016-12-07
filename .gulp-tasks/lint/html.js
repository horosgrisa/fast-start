module.exports = (gulp, $, argv) => {
  gulp.task('lint:html', () => gulp.src([`${global.CONFIG.src}/**/*.html`].concat(global.CONFIG.exclude))
    .pipe($.plumber())
    .pipe($.htmlhint({
      htmlhintrc: '.htmlhintrc'
    }))
    .pipe($.htmlhint.reporter('htmlhint-stylish')))
}
