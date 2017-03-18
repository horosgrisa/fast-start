module.exports = () => {
  gulp.task('lint:js', () => gulp.src([`${global.CONFIG.src}/**/*.{js,jsx,json}`], {
    base: global.CONFIG.src
  })
    .pipe($.eslint())
    .pipe($.eslint.format(require('eslint-formatter-pretty'))))
}
