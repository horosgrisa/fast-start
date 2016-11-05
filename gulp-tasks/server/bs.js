'use strict'
const argv = require('yargs').argv
const debuga = require('debuga')
const browserSync = require('browser-sync').create()

module.exports = function (gulp) {
  if (!argv.production) {
    if (global.CONFIG.server) {
      gulp.task('bs', (done) => {
        browserSync.init({
          proxy: 'http://localhost:10000',
          files: [
            global.CONFIG.dist + '/public/css/**/*.css',
            global.CONFIG.dist + '/public/js/**/*.js',
            global.CONFIG.dist + '/public/img/**/*.*',
            global.CONFIG.dist + '/public/font/**/*.*'
          ],
          port: 8000,
          using: true,
          online: true,
          open: false,
          logFileChanges: false,
          notify: false,
          ui: false,
          ghostMode: false,
          middleware: [debuga()]
        })
        done()
      })
    } else {
      gulp.task('bs', (done) => {
        browserSync.init({
          server: {
            baseDir: 'dist/views',
            index: 'index.html',
            routes: {
              '/public': './dist/public',
              '/bower_components': './dist/bower_components'
            }
          },
          files: [
            global.CONFIG.dist + '/views/**/*.html',
            global.CONFIG.dist + '/public/css/**/*.css',
            global.CONFIG.dist + '/public/js/**/*.js',
            global.CONFIG.dist + '/public/img/**/*.*',
            global.CONFIG.dist + '/public/font/**/*.*'
          ],
          port: 8000,
          using: true,
          online: true,
          open: false,
          logFileChanges: false,
          notify: false,
          ui: false,
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
