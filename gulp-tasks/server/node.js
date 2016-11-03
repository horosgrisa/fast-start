'use strict'
let $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('nodemon', (done) => {
    if (!argv.production && global.CONFIG.server) {
      let started = false
      $.nodemon({
        script: global.CONFIG.dist + '/index.js',
        ext: 'js',
        watch: [global.CONFIG.dist + '/lib/*', global.CONFIG.dist + '/index.js'],
        env: {
          'NODE_ENV': 'dev'
        },
        quiet: false
      })
        .on('start', () => {
          if (!started) {
            done()
            started = true
          }
        })
    } else {
      done()
    }
  })
}
