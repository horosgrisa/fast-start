module.exports = (gulp, $, argv) => {
  gulp.task('lint:css', () => gulp.src([`${global.CONFIG.src}/**/*.css`])
    .pipe($.postcss([
      require('stylelint')(),
      require('postcss-bem-linter'),
      require('doiuse'),
      require('postcss-reporter')({ clearMessages: true })
    ])))
}
