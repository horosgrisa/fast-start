module.exports = () => {
  global.gulp.task('lint:css', () => gulp.src([`${global.CONFIG.src}/**/*.css`])
    .pipe($.postcss([
      require('stylelint')(),
      require('postcss-reporter')({ clearMessages: true })
    ])))
}
