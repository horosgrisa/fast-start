const exec = require('exec')

module.exports = function (gulp) {
  gulp.task('update', (done) => {
    exec('git', ['pull'], (err, out, code) => {
      if (err) { throw err }
      done()
    })
  })
}
