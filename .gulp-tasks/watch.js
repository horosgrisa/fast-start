module.exports = () => {
  global.gulp.task('watch', (done) => {
    if (process.env.NODE_ENV !== 'production') {
      global.gulp.watch([
        `${global.CONFIG.src}/**`,
        `!${global.CONFIG.src}/views/**`,
        `!${global.CONFIG.src}/views/`,
        `!${global.CONFIG.src}/public/**`,
        `!${global.CONFIG.src}/public/`
      ], global.gulp.parallel('build:base'))
      global.gulp.watch([
        `${global.CONFIG.src}/../package.{json,js}`,
        `${global.CONFIG.src}/../bower.{json,js}`
      ], global.gulp.parallel('build:config'))

      global.gulp.watch(`${global.CONFIG.src}/public/**/*.{eot,svg,ttf,woff,woff2,ico}`, global.gulp.parallel('build:public'))

      global.gulp.watch(`${global.CONFIG.src}/public/**/*.{jpg,jpeg,png,gif}`, global.gulp.parallel('build:img'))

      global.gulp.watch([`${global.CONFIG.src}/public/**/*.css`], global.gulp.parallel('build:css'))
      global.gulp.watch([`${global.CONFIG.src}/public/**/*.{js,jsx,es6,babel}`], global.gulp.parallel('build:js'))

      global.gulp.watch(`${global.CONFIG.src}/views/**/*.{html,njk}`, global.gulp.parallel('build:views'))
    }
    done()
  })
}
