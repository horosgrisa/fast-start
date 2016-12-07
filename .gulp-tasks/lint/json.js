module.exports = (gulp, $, argv) => {
  gulp.task('lint:json', () => gulp.src([`${global.CONFIG.src}/**/*.json`].concat(global.CONFIG.exclude))
    .pipe($.eslint())
    .pipe($.eslint.format()))
}
