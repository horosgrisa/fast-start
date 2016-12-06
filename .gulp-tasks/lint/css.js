'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('lint:css', () => {
    return gulp.src([`${global.CONFIG.src}/**/*.css`].concat(global.CONFIG.exclude))
      .pipe($.postcss([
        require('stylelint')(),
        require('postcss-bem-linter'),
        require('doiuse'),
        require('postcss-reporter')({ clearMessages: true })
      ]))
  })
}
