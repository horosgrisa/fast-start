'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('build:css', (done) => {
    return gulp.src(['src/public/css/*.css', 'src/public/css/views/*.css'], {
      base: 'src/public/css'
    })
    .pipe($.flatmap(function (stream, file) {
      return stream
        .pipe($.if(!argv.all, $.newer({
          extra: [
            'src/public/css/includes/**/*.css',
            'src/public/css/partials/**/*.css'
          ],
          dest: global.CONFIG.dist + '/public/css/',
          ext: '.css'
        })))
        .pipe($.using({
          path: 'relative',
          color: 'green',
          filesize: false
        }))
        .pipe($.plumber())
        .pipe($.if(!argv.production, $.sourcemaps.init()))
        .pipe($.postcss([
          require('precss')(),
          require('postcss-cssnext')()
        ])
          )
        .pipe($.if(argv.production, $.postcss([
          require('cssnano')()
        ])))
        .pipe($.if(!argv.production, $.sourcemaps.write({
          mapSources: function (mapFilePath) {
            return '/public/css/' + mapFilePath
          }
        })))
        .pipe(gulp.dest(global.CONFIG.dist + '/public/css/'))
        .pipe($.touch())
    }))
  })
}
