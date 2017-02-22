module.exports = (gulp, $, argv) => {
  gulp.task('watch', (done) => {
    if (!argv.production) {
      gulp.watch([
        `${global.CONFIG.src}/**`,
        `!${global.CONFIG.src}/views/**`,
        `!${global.CONFIG.src}/views/`,
        `!${global.CONFIG.src}/assets/**`,
        `!${global.CONFIG.src}/assets/`
      ], gulp.parallel('build:base'))
      gulp.watch([
        `${global.CONFIG.src}/../package.json`,
        `${global.CONFIG.src}/../bower.json`
      ], gulp.parallel('build:config'))

      gulp.watch(`${global.CONFIG.src}/assets/**/*.{eot,svg,ttf,woff,woff2,ico}`, gulp.parallel('build:asserts'))

      gulp.watch(`${global.CONFIG.src}/assets/**/*.{jpg,jpeg,png,gif}`, gulp.parallel('build:img'))

      gulp.watch([`${global.CONFIG.src}/assets/**/*.css`], gulp.parallel('build:css'))
      gulp.watch([`${global.CONFIG.src}/assets/**/*.{js,jsx,es6,babel}`], gulp.parallel('build:js'))

      gulp.watch(`${global.CONFIG.src}/views/**/*.{html,njk}`, gulp.parallel('build:html'))
    }
    done()
  })
}
