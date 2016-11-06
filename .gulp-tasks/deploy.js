'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('deploy:rsync', () => {
    console.dir([
      global.CONFIG.src + '.build/**',
      '!' + global.CONFIG.src + '.build/node_modules/**',
      '!' + global.CONFIG.src + '.build/bower_components/**'
    ])
    console.dir(global.CONFIG.deploy)
    return gulp.src([
      global.CONFIG.src + '.build/**',
      '!' + global.CONFIG.src + '.build/node_modules/**',
      '!' + global.CONFIG.src + '.build/bower_components/**'
    ])
      .pipe($.rsync(global.CONFIG.deploy))
  })
}
