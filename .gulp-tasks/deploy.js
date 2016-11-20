'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('deploy:rsync', () => {
    return gulp.src([
      global.CONFIG.src + '/build/**'
    ])
      .pipe($.rsync(global.CONFIG.deploy))
  })
}
