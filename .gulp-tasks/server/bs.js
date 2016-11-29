'use strict'
module.exports = (gulp, $, argv) => {
  if (!argv.production) {
    const browserSync = require('browser-sync').create()
    if (global.CONFIG.server !== false) {
      gulp.task('bs', (done) => {
        browserSync.init({
          proxy: 'http://localhost:10000',
          files: [
            `${global.CONFIG.dist}/public/css/**/*.css`,
            `${global.CONFIG.dist}/public/js/**/*.js`,
            `${global.CONFIG.dist}/public/img/**/*.*`,
            `${global.CONFIG.dist}/public/font/**/*.*`
          ],
          port: 8000,
          using: true,
          online: true,
          open: false,
          logFileChanges: false,
          notify: false,
          ui: false,
          reloadDelay: 500,
          ghostMode: false
        })
        done()
      })
    } else {
      gulp.task('bs', (done) => {
        browserSync.init({
          server: {
            baseDir: global.CONFIG.dist,
            index: 'index.html',
            routes: {
              '/public': `${global.CONFIG.dist}/public`,
              '/bower_components': `${global.CONFIG.dist}/bower_components`
            }
          },
          files: [
            `${global.CONFIG.dist}/views/**/*.html`,
            `${global.CONFIG.dist}/public/css/**/*.css`,
            `${global.CONFIG.dist}/public/js/**/*.js`,
            `${global.CONFIG.dist}/public/img/**/*.*`,
            `${global.CONFIG.dist}/public/font/**/*.*`
          ],
          port: 8000,
          using: true,
          online: true,
          open: false,
          logFileChanges: false,
          notify: false,
          ui: false,
          reloadDelay: 500,
          ghostMode: false
        })
        done()
      })
    }
  } else {
    gulp.task('bs', (done) => {
      done()
    })
  }
}
