'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('deploy:rsync', () => {
    return gulp.src([
      global.CONFIG.src + '.build/**',
      '!' + global.CONFIG.src + '.build/node_modules/**',
      '!' + global.CONFIG.src + '.build/bower_components/**'
    ])
      .pipe($.rsync(global.CONFIG.deploy))
  })
}
