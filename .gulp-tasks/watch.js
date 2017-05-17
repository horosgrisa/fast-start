module.exports = () => {
  global.gulp.task('watch', (done) => {
    if (process.env.NODE_ENV !== 'production') {
      global.gulp.watch([
        `${global.CONFIG.src}/**`,
        `!${global.CONFIG.src}/views/**`,
        `!${global.CONFIG.src}/views/`,
        `!${global.CONFIG.src}/assets/**`,
        `!${global.CONFIG.src}/assets/`
      ], global.gulp.parallel('build:base'))
      global.gulp.watch([
        `${global.CONFIG.src}/../package.{json,js}`,
        `${global.CONFIG.src}/../bower.{json,js}`
      ], global.gulp.parallel('build:config'))

      global.gulp.watch(`${global.CONFIG.src}/assets/**/*.{eot,svg,ttf,woff,woff2,ico}`, global.gulp.parallel('build:public'))

      global.gulp.watch(`${global.CONFIG.src}/assets/**/*.{jpg,jpeg,png,gif}`, global.gulp.parallel('build:img'))

      global.gulp.watch([`${global.CONFIG.src}/assets/**/*.css`], global.gulp.parallel('build:css'))
      global.gulp.watch([`${global.CONFIG.src}/assets/**/*.{js,jsx,es6,babel}`], global.gulp.parallel('build:js'))

      global.gulp.watch(`${global.CONFIG.src}/views/**/*.{html,njk}`, global.gulp.parallel('build:html'))
    }
    done()
  })
}
