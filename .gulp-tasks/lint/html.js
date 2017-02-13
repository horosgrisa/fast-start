module.exports = (gulp, $, argv) => {
  gulp.task('lint:html', () => gulp.src([`${global.CONFIG.src}/**/*.html`])
    .pipe($.plumber())
    .pipe($.htmlhint({
      htmlhintrc: '.htmlhintrc'
    }))
    .pipe($.htmlhint.reporter('htmlhint-stylish')))
}
