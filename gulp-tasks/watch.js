'use strict'
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('watch', (done) => {
    if (!argv.production) {
      gulp.watch([
        'src/**',
        '!src/node_modules/**',
        '!src/node_modules/',
        '!src/bower_components/**',
        '!src/bower_components/',
        '!src/views/**',
        '!src/views/',
        '!src/assets/**',
        '!src/assets/'
      ], gulp.parallel('build:base'))
      gulp.watch('src/assets/css/**', gulp.parallel('build:css'))
      gulp.watch('src/assets/fonts/**', gulp.parallel('build:fonts'))
      gulp.watch('src/viewss/**/*.html', gulp.parallel('build:html'))
      gulp.watch('src/assets/img/**', gulp.parallel('build:img'))
      gulp.watch('src/assets/js/**', gulp.parallel('build:js'))
      gulp.watch('src/viewss/**/*.pug', gulp.parallel('build:pug'))
    }
    done()
  })
}
