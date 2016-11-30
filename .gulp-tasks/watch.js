'use strict'
module.exports = (gulp, $, argv) => {
  gulp.task('watch', (done) => {
    if (!argv.production) {
      gulp.watch([
        `${global.CONFIG.src}/**`,
        `!${global.CONFIG.src}/views/**`,
        `!${global.CONFIG.src}/views/`,
        `!${global.CONFIG.src}/assets/**`,
        `!${global.CONFIG.src}/assets/`
      ].concat(global.CONFIG.exclude), gulp.parallel('build:base'))

      gulp.watch(`${global.CONFIG.src}/assets/**/*.{eot,svg,ttf,woff,woff2,ico}`, gulp.parallel('build:asserts'))
      gulp.watch(`${global.CONFIG.src}/assets/**/*.{jpg,jpeg,png,gif}`, gulp.parallel('build:img'))

      gulp.watch([`${global.CONFIG.src}/assets/**/*.css`], gulp.parallel('build:css'))
      gulp.watch([`${global.CONFIG.src}/assets/*/**/*.css`], gulp.parallel('build:css:all'))
      gulp.watch([`${global.CONFIG.src}/assets/**/*.js`], gulp.parallel('build:js'))
      gulp.watch([`${global.CONFIG.src}/assets/*/**/*.js`], gulp.parallel('build:js:all'))

      gulp.watch(`${global.CONFIG.src}/views/**/*.html`, gulp.parallel('build:html'))
      gulp.watch(`${global.CONFIG.src}/views/**/*.pug`, gulp.parallel('build:pug'))
      gulp.watch(`${global.CONFIG.src}/views/**/*.njk`, gulp.parallel('build:njk'))
    }
    done()
  })
}
