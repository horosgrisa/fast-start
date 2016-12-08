module.exports = (gulp, $, argv) => {
  gulp.task('lint:js', () => gulp.src([`${global.CONFIG.src}/**/*.{js,jsx}`].concat(global.CONFIG.exclude), {
    base: global.CONFIG.src
  })
    .pipe($.eslint())
    .pipe($.eslint.format(require('eslint-formatter-pretty'))))
}
