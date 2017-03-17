module.exports = (gulp, $, argv) => {
  if (argv.production) {
    gulp.task('bs', (done) => {
      done()
    })
  } else if (global.CONFIG.server) {
    gulp.task('bs', (done) => {
      global.browserSync.init({
        proxy: 'http://localhost:10000',
        files: [
          `${global.CONFIG.dist}/public/**/*.{css,js,png,jpg,jpeg,gif,ico,eot,ttf,woff,woff2,svg}`,
          '{global.CONFIG.dist}/views/**'
        ],
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
  } else {
    gulp.task('bs', (done) => {
      global.browserSync.init({
        server: {
          baseDir: global.CONFIG.dist,
          index: 'index.html',
          routes: {
            '/public': `${global.CONFIG.dist}/public`,
            '/bower_components': `${global.CONFIG.dist}/bower_components`
          }
        },
        files: [
          `${global.CONFIG.dist}/public/*.{css,js,png,jpg,jpeg,gif,ico,eot,ttf,woff,woff2,svg}`,
          '{global.CONFIG.dist}/views/**'
        ],
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
