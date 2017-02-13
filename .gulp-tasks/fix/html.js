module.exports = (gulp, $, argv) => {
  gulp.task('fix:html', () => gulp.src([`${global.CONFIG.src}/**/*.html`])
    .pipe($.using(Object.assign(global.CONFIG.using, {
      color: 'yellow',
      prefix: 'Fixed'
    })))
    .pipe($.plumber())
    .pipe($.jsbeautifier({
      indent_char: ' ',
      indent_size: 2
    }))
    .pipe(gulp.dest(`${global.CONFIG.src}/`)))
}
