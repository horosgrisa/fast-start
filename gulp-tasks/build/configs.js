'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('build:configs', (done) => {
    return gulp.src('src/{package.json,bower.json,config.json,robots.txt}', {
      base: 'src'
    })
      .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/')))
      .pipe($.using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe(gulp.dest(global.CONFIG.dist + '/'))
      .pipe($.touch())
      .pipe($.if(argv.deploy, $.rsync(global.CONFIG.deploy)))
  })
}
