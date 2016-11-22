'use strict'
const childProcess = require('child_process')

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('self-update:git', (done) => {
    childProcess.exec('git pull', (err, out, code) => {
      if (err) {
        throw err
      }
      console.log(out)
      done()
    })
  })
}
