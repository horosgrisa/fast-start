'use strict'
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('watch', (done) => {
    if (!argv.production) {
      gulp.watch('src/public/js/**', gulp.parallel('frontend:js'))
      gulp.watch('src/public/css/**', gulp.parallel('frontend:css'))
      gulp.watch('src/public/font/**', gulp.parallel('frontend:font'))
      gulp.watch('src/public/img/**', gulp.parallel('frontend:img'))
      gulp.watch([
        'src/lib/**',
        'src/routes/**',
        'src/index.js',
        'src/package.json',
        'src/bower.json'
      ], gulp.parallel('backend'))
      gulp.watch('src/views/**', gulp.parallel('views'))
    }

    done()
  })
}
