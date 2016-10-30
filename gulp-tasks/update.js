const child_process = require('child_process')

module.exports = function (gulp) {
  gulp.task('update', (done) => {
    child_process.exec('git', ['pull'], (err, out, code) => {
      if (err) { throw err }
      done()
    })
  })
}
