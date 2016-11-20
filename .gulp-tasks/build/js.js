'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

const rollupPlugins = [
  require('rollup-plugin-json')(),
  require('rollup-plugin-babel')()]
if (argv.production) {
  rollupPlugins[rollupPlugins.length] = require('rollup-plugin-uglify')()
}

module.exports = function (gulp) {
  gulp.task('build:js', (done) => {
    return gulp.src([global.CONFIG.src + '/assets/js/*.*', global.CONFIG.src + '/assets/js/views/**/*.js'], {
      base: global.CONFIG.src + '/assets/js/'
    })
      .pipe($.if(!argv.all, $.changed(global.CONFIG.dist + '/public/js/')))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init({})))
      .pipe($.betterRollup({
        plugins: rollupPlugins
      }, {
        format: 'cjs',
        useStrict: true
      }))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: (mapFilePath) => {
          return mapFilePath.replace(global.CONFIG.src, '').replace('node_modules/', '/node_modules/')
        }
      })))
      .pipe(gulp.dest(global.CONFIG.dist + '/public/js/'))
      .pipe($.touch())
  })

  gulp.task('build:js:all', (done) => {
    return gulp.src([global.CONFIG.src + '/assets/js/*.js', global.CONFIG.src + '/assets/js/views/**/*.js'], {
      base: global.CONFIG.src + '/assets/js/'
    })
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init({})))
      .pipe($.betterRollup({
        plugins: rollupPlugins
      }, {
        format: 'cjs',
        useStrict: true
      }))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: (mapFilePath) => {
          return mapFilePath.replace(global.CONFIG.src, '').replace('node_modules/', '/node_modules/')
        }
      })))
      .pipe(gulp.dest(global.CONFIG.dist + '/public/js/'))
      .pipe($.touch())
  })
}

