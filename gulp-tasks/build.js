'use strict'
const gulpif = require('gulp-if')
const plumber = require('gulp-plumber')
const newer = require('gulp-newer')
const using = require('gulp-using')
const argv = require('yargs').argv
const flatmap = require('gulp-flatmap')
const touch = require('gulp-touch')
const rsync = require('gulp-rsync')
const filter = require('gulp-filter')
const include = require('gulp-include')
const imagemin = require('gulp-imagemin')
const postcss = require('gulp-postcss')
const postcssPlugins = [
  require('precss')(),
  require('postcss-cssnext')()
]
const pug = require('gulp-pug')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const cssmin = require('gulp-cssmin')
const babel = require('gulp-babel')

const tap = require('gulp-tap')
const buffer = require('gulp-buffer')
const browserify = require('browserify')
const sourcemapify = require('sourcemapify')

module.exports = function (gulp) {
  gulp.task('frontend:js', () => {
    return gulp.src(['src/public/js/*.js', 'src/public/js/views/*.js'], { base: 'src/public/js' })
    .pipe(plumber())
    .pipe(flatmap((stream, file) => {
      return stream
        .pipe(gulpif(!argv.all, newer({
          extra: [
            'src/public/js/includes/**/*.js',
            'src/public/js/partials/**/*.js'
          ],
          dest: global.CONFIG.dist + '/public/js/',
          ext: '.js'
        })))
        .pipe(using({path: 'relative', color: 'green', filesize: false}))
        .pipe(gulpif(global.CONFIG.browserify, tap(function (file) {
          console.log(11)
          file.contents = browserify(file.path, {debug: true})
            .transform('babelify', {presets: ['es2015']})
            .transform('uglifyify')
            .plugin(sourcemapify, {base: 'src/public/js', root: '/public/js'})
            .bundle()
        })))
        .pipe(gulpif(global.CONFIG.browserify, buffer()))
        .pipe(gulpif(!global.CONFIG.browserify, sourcemaps.init()))
        .pipe(gulpif(!global.CONFIG.browserify, include()))
        .pipe(gulpif(!global.CONFIG.browserify, babel({
          presets: ['es2015']
        })))
        .pipe(gulpif(!global.CONFIG.browserify, uglify()))
        .pipe(gulpif(!global.CONFIG.browserify, sourcemaps.write('.', {
          mapSources: function (mapFilePath) {
            return '/public/js/' + mapFilePath
          }
        })))
        .pipe(gulp.dest(global.CONFIG.dist + '/public/js/'))
        .pipe(touch())
        .pipe(gulpif(argv.deploy, rsync(global.CONFIG.deploy)))
    }))
  })

  gulp.task('frontend:css', () => {
    return gulp.src(['src/public/css/*.css', 'src/public/css/views/*.css'], { base: 'src/public/css' })
      .pipe(flatmap(function (stream, file) {
        return stream
          .pipe(plumber())
          .pipe(gulpif(!argv.all, newer({
            extra: [
              'src/public/css/includes/**/*.css',
              'src/public/css/partials/**/*.css'
            ],
            dest: global.CONFIG.dist + '/public/css/',
            ext: '.css'
          })))
          .pipe(using({path: 'relative', color: 'green', filesize: false}))
          .pipe(gulpif(!argv.production, sourcemaps.init()))
          .pipe(postcss(postcssPlugins))
          .pipe(gulpif(argv.production, cssmin()))
          .pipe(gulpif(!argv.production, sourcemaps.write('.', {
            mapSources: function (mapFilePath) {
              return '/public/css/' + mapFilePath
            }
          })))
          .pipe(gulp.dest(global.CONFIG.dist + '/public/css/'))
          .pipe(touch())
          .pipe(gulpif(argv.deploy, rsync(global.CONFIG.deploy)))
      }))
  })

  gulp.task('frontend:font', () => {
    return gulp.src('src/public/font/**/*.*')
      .pipe(plumber())
      .pipe(gulpif(!argv.all, newer(global.CONFIG.dist + '/public/font')))
      .pipe(using({path: 'relative', color: 'green', filesize: false}))
      .pipe(gulp.dest(global.CONFIG.dist + '/public/font'))
      .pipe(touch())
      .pipe(gulpif(argv.deploy, rsync(global.CONFIG.deploy)))
  })

  gulp.task('frontend:img', () => {
    return gulp.src('src/public/img/**/*.*')
      .pipe(plumber())
      .pipe(gulpif(!argv.all, newer(global.CONFIG.dist + '/public/img')))
      .pipe(using({path: 'relative', color: 'green', filesize: false}))
      .pipe(imagemin())
      .pipe(gulp.dest(global.CONFIG.dist + '/public/img'))
      .pipe(touch())
      .pipe(gulpif(argv.deploy, rsync(global.CONFIG.deploy)))
  })

  gulp.task('backend', (done) => {
    if (global.CONFIG.server) {
      return gulp.src([
        'src/lib/**/*.js',
        'src/routes/**/*.js',
        'src/index.js'
      ], { base: 'src' })
      .pipe(plumber())
      .pipe(gulpif(!argv.all, newer(global.CONFIG.dist + '/')))
      .pipe(using({path: 'relative', color: 'green', filesize: false}))
      .pipe(gulp.dest(global.CONFIG.dist + '/'))
      .pipe(touch())
      .pipe(gulpif(argv.deploy, rsync(global.CONFIG.deploy)))
    } else {
      done()
    }
  })

  gulp.task('views', () => {
    const pugFilter = filter(['**/*.pug'], {restore: true})
    const htmlFilter = filter(['**/*.html'], {restore: true})
    if (global.CONFIG.server) {
      return gulp.src(['src/views/*.*'], { base: 'src/views' })
        .pipe(flatmap(function (stream, file) {
          return stream
            .pipe(plumber())
            .pipe(gulpif(!argv.all, newer({
              extra: [
                'src/views/partials/**/*.*',
                'src/views/templates/**/*.*'
              ],
              dest: global.CONFIG.dist + '/views/',
              ext: '.html'
            })))
            .pipe(using({path: 'relative', color: 'green', filesize: false}))
            .pipe(pugFilter)
            .pipe(gulpif(!argv.production, pug({pretty: true})))
            .pipe(gulpif(argv.production, pug()))
            .pipe(pugFilter.restore)
            .pipe(htmlFilter)
            .pipe(include())
            .pipe(htmlFilter.restore)
            .pipe(gulp.dest(global.CONFIG.dist + '/views/'))
            .pipe(touch())
            .pipe(gulpif(argv.deploy, rsync(global.CONFIG.deploy)))
        }))
    } else {
      return gulp.src('src/views/**/*.*')
      .pipe(plumber())
      .pipe(gulpif(!argv.all, newer(global.CONFIG.dist + '/views/')))
      .pipe(using({path: 'relative', color: 'green', filesize: false}))
      .pipe(gulp.dest(global.CONFIG.dist + '/views/'))
      .pipe(touch())
      .pipe(gulpif(argv.deploy, rsync(global.CONFIG.deploy)))
    }
  })

  gulp.task('config', () => {
    return gulp.src('src/{package.json,bower.json,config.json}', { base: 'src' })
      .pipe(plumber())
      .pipe(gulpif(!argv.all, newer(global.CONFIG.dist + '/')))
      .pipe(using({path: 'relative', color: 'green', filesize: false}))
      .pipe(gulp.dest(global.CONFIG.dist + '/'))
      .pipe(touch())
      .pipe(gulpif(argv.deploy, rsync(global.CONFIG.deploy)))
  })
}
