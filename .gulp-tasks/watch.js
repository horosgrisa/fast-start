'use strict'
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('watch', (done) => {
    if (!argv.production) {
      gulp.watch([
        global.CONFIG.src + '/**',
        '!' + global.CONFIG.src + '/node_modules/**',
        '!' + global.CONFIG.src + '/node_modules/',
        '!' + global.CONFIG.src + '/bower_components/**',
        '!' + global.CONFIG.src + '/bower_components/',
        '!' + global.CONFIG.src + '/views/**',
        '!' + global.CONFIG.src + '/views/',
        '!' + global.CONFIG.src + '/assets/**',
        '!' + global.CONFIG.src + '/assets/'
      ], gulp.parallel('build:base'))
      gulp.watch(global.CONFIG.src + '/assets/css/**', gulp.parallel('build:css'))
      gulp.watch(global.CONFIG.src + '/assets/fonts/**', gulp.parallel('build:fonts'))
      gulp.watch(global.CONFIG.src + '/views/**/*.html', gulp.parallel('build:html'))
      gulp.watch(global.CONFIG.src + '/assets/img/**', gulp.parallel('build:img'))
      gulp.watch(global.CONFIG.src + '/assets/js/**', gulp.parallel('build:js'))
      gulp.watch(global.CONFIG.src + '/views/**/*.pug', gulp.parallel('build:pug'))
      gulp.watch(global.CONFIG.src + '/views/**/*.njk', gulp.parallel('build:njk'))
    }
    done()
  })
}