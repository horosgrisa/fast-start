'use strict'
let $ = require('gulp-load-plugins')()
$.buffer = require('gulp-buffer')

const argv = require('yargs').argv
const browserify = require('browserify')
const sourcemapify = require('sourcemapify')

module.exports = function (gulp) {
  gulp.task('frontend:js', () => {
    return gulp.src(['src/public/js/*.js', 'src/public/js/views/*.js'], {
      base: 'src/public/js'
    })
      .pipe($.flatmap((stream, file) => {
        return stream
          .pipe($.if(!argv.all, $.newer({
            extra: [
              'src/public/js/includes/**/*.js',
              'src/public/js/partials/**/*.js'
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
          .pipe($.if(global.CONFIG.browserify, $.tap(function (file) {
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
                  base: 'src/public/js',
                  root: '/public/js'
                })
                .bundle()
            }
          })))
          .pipe($.if(global.CONFIG.browserify, gulp.dest(global.CONFIG.dist + '/public/js/')))
          .pipe($.if(!global.CONFIG.browserify && !argv.production, $.sourcemaps.init({})))
          .pipe($.if(!global.CONFIG.browserify, $.include()))
          .pipe($.if(!global.CONFIG.browserify, $.babel({
            presets: ['es2015']
          })))
          .pipe($.if(!global.CONFIG.browserify, $.uglify()))
          .pipe($.if(!global.CONFIG.browserify && !argv.production, $.sourcemaps.write({
            mapSources: function (mapFilePath) {
              return '/public/js/' + mapFilePath
            }
          })))
          .pipe($.if(!global.CONFIG.browserify, gulp.dest(global.CONFIG.dist + '/public/js/')))
          .pipe($.touch())
          .pipe($.buffer())
          .pipe($.if(argv.deploy, $.rsync(global.CONFIG.deploy)))
      }))
  })

  gulp.task('frontend:css', (done) => {
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
          .pipe($.if(argv.deploy, $.rsync(global.CONFIG.deploy)))
      }))
  })

  gulp.task('frontend:font', () => {
    return gulp.src('src/public/font/**/*.*')
      .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/public/font')))
      .pipe($.using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe(gulp.dest(global.CONFIG.dist + '/public/font'))
      .pipe($.touch())
      .pipe($.if(argv.deploy, $.rsync(global.CONFIG.deploy)))
  })

  gulp.task('frontend:img', () => {
    return gulp.src('src/public/img/**/*.*')
      .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/public/img')))
      .pipe($.using({
        path: 'relative',
        color: 'green',
        filesize: false
      }))
      .pipe($.plumber())
      .pipe($.imagemin())
      .pipe(gulp.dest(global.CONFIG.dist + '/public/img'))
      .pipe($.touch())
      .pipe($.if(argv.deploy, $.rsync(global.CONFIG.deploy)))
  })

  gulp.task('backend', (done) => {
    if (global.CONFIG.server) {
      return gulp.src([
        'src/lib/**/*.js',
        'src/routes/**/*.js',
        'src/index.js'
      ], {
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
    } else {
      done()
    }
  })

  gulp.task('views', (done) => {
    const pugFilter = $.filter(['**/*.pug'], {
      restore: true
    })
    const htmlFilter = $.filter(['**/*.html'], {
      restore: true
    })
    if (!global.CONFIG.server) {
      return gulp.src(['src/views/*.*'], {
        base: 'src/views'
      })
        .pipe($.flatmap(function (stream, file) {
          return stream
            .pipe($.if(!argv.all, $.newer({
              extra: [
                'src/views/partials/**/*.*',
                'src/views/templates/**/*.*'
              ],
              dest: global.CONFIG.dist + '/views/',
              ext: '.html'
            })))
            .pipe($.using({
              path: 'relative',
              color: 'green',
              filesize: false
            }))
            .pipe($.plumber())
            .pipe(pugFilter)
            .pipe($.if(!argv.production, $.pug({
              pretty: true
            })
          ))
            .pipe($.if(argv.production, $.pug()
              ))
            .pipe(pugFilter.restore)
            .pipe(htmlFilter)
            .pipe($.include())
            .pipe(htmlFilter.restore)
            .pipe(gulp.dest(global.CONFIG.dist + '/views/'))
            .pipe($.touch())
            .pipe($.if(argv.deploy, $.rsync(global.CONFIG.deploy)))
        }))
    } else {
      return gulp.src('src/views/**/*.*')
        .pipe($.if(!argv.all, $.newer(global.CONFIG.dist + '/views/')))
        .pipe($.using({
          path: 'relative',
          color: 'green',
          filesize: false
        }))
        .pipe($.plumber())
        .pipe(gulp.dest(global.CONFIG.dist + '/views/'))
        .pipe($.touch())
        .pipe($.if(argv.deploy, $.rsync(global.CONFIG.deploy)))
    }
  })

  gulp.task('config', () => {
    return gulp.src('src/{package.json,bower.json,config.json}', {
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
