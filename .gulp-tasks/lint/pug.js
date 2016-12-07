module.exports = (gulp, $, argv) => {
  gulp.task('lint:pug', () => gulp.src([`${global.CONFIG.src}/**/*.pug`].concat(global.CONFIG.exclude))
    .pipe($.plumber())
    .pipe($.pugLinter())
    .pipe($.pugLinter.reporter('puglint-stylish')))
}
