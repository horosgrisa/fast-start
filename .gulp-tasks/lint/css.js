module.exports = () => {
  global.gulp.task('lint:css', () => gulp.src(`${global.CONFIG.src}/**/*.css`)
    .pipe($.stylelint({
            failAfterError: false,
        debug: false,

      reporters: [{
        formatter: require('stylelint-formatter-pretty'),
        console: true
      }]
    }))
  )
}
