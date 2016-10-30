'use strict'
const argv = require('yargs').argv
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()

module.exports = function (gulp) {
  gulp.task('server:node', (done) => {
    if (!argv.production && global.CONFIG.server) {
      let started = false
      nodemon({
        script: global.CONFIG.dist + '/index.js',
        ext: 'js',
        watch: [global.CONFIG.dist + '/lib/*', global.CONFIG.dist + '/index.js'],
        env: { 'NODE_ENV': 'dev' },
        quiet: false
      }).on('start', () => {
        if (!started) {
          done()
          started = true
        }
      })
    } else {
      done()
    }
  })
  gulp.task('server:bs', (done) => {
    if (!argv.production) {
      if (!global.CONFIG.server) {
        browserSync.init({
          server: {
            baseDir: 'dist/views',
            index: 'index.html',
            directory: true,
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
          reloadDelay: 1000,
          online: true,
          open: false,
          logFileChanges: true,
          notify: false
        })
        done()
      } else {
        browserSync.init(null, {
          proxy: 'http://localhost:10000',
          files: [
            global.CONFIG.dist + '/public/css/**/*.css',
            global.CONFIG.dist + '/public/js/**/*.js',
            global.CONFIG.dist + '/public/img/**/*.*',
            global.CONFIG.dist + '/public/font/**/*.*'
          ],
          port: 8000,
          using: true,
          reloadDelay: 1000,
          online: true,
          open: false,
          logFileChanges: false,
          notify: false
        })
        done()
      }
    }
  })
}
