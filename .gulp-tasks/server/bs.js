module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    global.gulp.task('bs', (done) => {
      done()
    })
  } else if (global.CONFIG.server) {
    global.gulp.task('bs', (done) => {
      global.browserSync.init({
        proxy: 'http://localhost:10000',
        files: `{global.CONFIG.dist}/public`

      })
      done()
    })
  } else {
    global.gulp.task('bs', (done) => {
      global.browserSync.init({
        server: {
          baseDir: global.CONFIG.dist,
          index: 'index.html'
        },
        files: [`${global.CONFIG.dist}/public/*`],
        port: 8000,
        using: true,
        online: true,
        open: false,
        logFileChanges: false,
        notify: false,
        reloadDelay: 500,
        ghostMode: false
      })
      done()
    })
  }
}
