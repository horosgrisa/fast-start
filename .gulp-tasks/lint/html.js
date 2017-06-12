module.exports = () => {
  global.gulp.task('lint:html', () => gulp.src(`${global.CONFIG.src}/**/*.{html,njk}`)
    .pipe($.plumber())
    .pipe($.htmlhint('.htmlhint.json'))
    .pipe($.htmlhint.reporter('htmlhint-stylish')))
}
