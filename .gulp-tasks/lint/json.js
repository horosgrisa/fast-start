module.exports = (gulp, $, argv) => {
  gulp.task('lint:json', () => gulp.src([`${global.CONFIG.src}/**/*.json`])
    .pipe($.eslint())
    .pipe($.eslint.format()))
}
