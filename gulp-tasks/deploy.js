'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('deploy:rsync', () => {
    return gulp.src(['./dist/**', '!./dist/node_modules/**', '!./dist/bower_components/**'])
      .pipe($.rsync(global.CONFIG.deploy))
  })
}
