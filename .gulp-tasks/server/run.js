module.exports = (gulp, $, argv) => {
  gulp.task('run', (done) => {
    if (!argv.production) {
      if (global.CONFIG.server === 'node') {
        let started = false
        $.nodemon({
          script: `${global.CONFIG.dist}/index.js`,
          ext: 'js json pug hjs html',
          watch: [
            `${global.CONFIG.dist}/`,
            `!${global.CONFIG.dist}/node_modules`,
            `!${global.CONFIG.dist}/bower_components`,
            `!${global.CONFIG.dist}/public`
          ],
          env: {
            NODE_ENV: 'dev'
          },
          quiet: false
        })
        .on('start', () => {
          if (!started) {
            started = true
          }
          return done()
        })
      } else { return done() }
    }
    return done()
  })
}
