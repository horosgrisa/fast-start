'use strict'
let $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('run', (done) => {
    if (!argv.production) {
      if (global.CONFIG.server === 'node') {
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
        if (global.CONFIG.server === 'php') {
          $.connectPhp.server({
            port: 10000,
            hostname: '0.0.0.0',
            base: global.CONFIG.dist
          })
          done()
        } else { done() }
      }
    } else {
      done()
    }
  })
}
