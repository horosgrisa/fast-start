const childProcess = require('child_process')

module.exports = (gulp, $, argv) => {
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
