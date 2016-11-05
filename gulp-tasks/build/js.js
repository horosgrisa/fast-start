'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  if (global.CONFIG.browserify) {
    gulp.task('build:js', (done) => {
      const browserify = require('browserify')
      const sourcemapify = require('sourcemapify')
      return gulp.src(['src/assets/js/*.js', 'src/assets/js/views/**/*.js'], {
        base: 'src/assets/js'
      })
        .pipe($.flatmap((stream, file) => {
          return stream
            .pipe($.if(!argv.all, $.newer({
              extra: [
                'src/assets/js/*/**/*.js',
                '!src/assets/js/views/**/*.js'
              ],
              dest: global.CONFIG.dist + '/public/js/',
              ext: '.js'
            })))
            .pipe($.using({
              path: 'relative',
              color: 'green',
              filesize: false
            }))
            .pipe($.plumber())
            .pipe($.tap(function (file) {
              if (argv.production) {
                file.contents = browserify(file.path, {
                  debug: false
                })
                  .transform('babelify', {
                    presets: ['es2015']
                  })
                  .transform('uglifyify')
                  .bundle()
              } else {
                file.contents = browserify(file.path, {
                  debug: true
                })
                  .transform('babelify', {
                    presets: ['es2015']
                  })
                  .plugin(sourcemapify, {
                    base: 'src/assets/js',
                    root: '/public/js'
                  })
                  .bundle()
              }
            }))
            .pipe(gulp.dest(global.CONFIG.dist + '/public/js/'))
            .pipe($.touch())
        }))
    })
  } else {
    gulp.task('build:js', (done) => {
      return gulp.src(['src/assets/js/*.js', 'src/assets/js/views/**/*.js'], {
        base: 'src/assets/js'
      })
      .pipe($.flatmap((stream, file) => {
        return stream
          .pipe($.if(!argv.all, $.newer({
            extra: [
              'src/assets/js/*/**/*.js',
              '!src/assets/js/views/**/*.js'
            ],
            dest: global.CONFIG.dist + '/public/js/',
            ext: '.js'
          })))
          .pipe($.using({
            path: 'relative',
            color: 'green',
            filesize: false
          }))
          .pipe($.plumber())
          .pipe($.if(!argv.production, $.sourcemaps.init({})))
          .pipe($.include())
          .pipe($.babel({
            presets: ['es2015']
          }))
          .pipe($.if(argv.production, $.uglify()))
          .pipe($.if(!argv.production, $.sourcemaps.write({
            mapSources: function (mapFilePath) {
              return '/public/js/' + mapFilePath
            }
          })))
          .pipe(gulp.dest(global.CONFIG.dist + '/public/js/'))
          .pipe($.touch())
      }))
    })
  }
}
