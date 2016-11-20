'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  if (global.CONFIG.server) {
    gulp.task('build:html', (done) => {
      return gulp.src(global.CONFIG.src + '/views/**/*.html', {
        base: global.CONFIG.src + '/views/'
      })
        .pipe($.if(!argv.all, $.changed(global.CONFIG.dist + '/views/')))
        .pipe($.using(global.CONFIG.using))
        .pipe($.plumber())
        .pipe(gulp.dest(global.CONFIG.dist + '/views/'))
        .pipe($.touch())
    })
  } else {
    gulp.task('build:html', (done) => {
      return gulp.src([global.CONFIG.src + '/views/*.html'], {
        base: global.CONFIG.src + '/views'
      })
        .pipe($.using(global.CONFIG.using))
        .pipe($.plumber())
        .pipe($.nunjucks.compile({}))
        .pipe(gulp.dest(global.CONFIG.dist))
        .pipe($.touch())
    })
  }
}
