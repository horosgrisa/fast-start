module.exports = () => {
  global.gulp.task('run', done => {
    if (process.env.NODE_ENV !== 'production' && global.CONFIG.server === 'node') {
      let started = false;
      $.nodemon({
        script: `${global.CONFIG.dist}/index.js`,
        ext: 'js json hjs html',
        watch: [
          `${global.CONFIG.dist}/`,
          `!${global.CONFIG.dist}/bower_components`,
          `!${global.CONFIG.dist}/public`,
        ],
        env: {
          NODE_ENV: 'development',
          DEBUG: process.env.DEBUG,
        },
        quiet: false,
      }).on('start', () => {
        if (!started) {
          started = true;
        }
        done();
      });
    }
    done();
  });
};
