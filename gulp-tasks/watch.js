'use strict'
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('watch', (done) => {
    if (!argv.production) {
      gulp.watch('src/public/js/**', gulp.parallel('build:js'))
      gulp.watch('src/public/css/**', gulp.parallel('build:css'))
      gulp.watch('src/public/font/**', gulp.parallel('build:fonts'))
      gulp.watch('src/public/img/**', gulp.parallel('build:img'))
      gulp.watch([
        'src/lib/**',
        'src/routes/**',
        'src/index.js',
        'src/package.json',
        'src/bower.json'
      ], gulp.parallel('build:backend'))
      gulp.watch('src/views/**', gulp.parallel('build:views'))
    }
    done()
  })
}
