'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('build:js', (done) => {
    const argv = require('yargs').argv
    const rollupPlugins = [
      require('rollup-plugin-json')(),
      require('rollup-plugin-babel')()]
    if (argv.production) {
      rollupPlugins[rollupPlugins.length] = require('rollup-plugin-uglify')()
    }
    const betterRollup = require('gulp-better-rollup')
    const sourcemaps = require('gulp-sourcemaps')
    const changed = require('gulp-changed')
    return gulp.src([`${global.CONFIG.src}/assets/js/*.*`, `${global.CONFIG.src}/assets/js/views/**/*.js`], {
      base: `${global.CONFIG.src}/assets/js/`
    })
      .pipe(gIf(!argv.all, changed(`${global.CONFIG.dist}/public/js/`)))
      .pipe(using(global.CONFIG.using))
      .pipe(plumber())
      .pipe(gIf(!argv.production, sourcemaps.init({})))
      .pipe(betterRollup({
        plugins: rollupPlugins
      }, {
        format: 'cjs',
        useStrict: true
      }))
      .pipe(gIf(!argv.production, sourcemaps.write('.', {
        mapSources: (mapFilePath) => {
          return mapFilePath.replace(global.CONFIG.src, '').replace('node_modules/', '/node_modules/')
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/js/`))
      .pipe(touch())
  })

  gulp.task('build:js:all', (done) => {
    const rollupPlugins = [
      require('rollup-plugin-json')(),
      require('rollup-plugin-babel')()]
    if (argv.production) {
      rollupPlugins[rollupPlugins.length] = require('rollup-plugin-uglify')()
    }
    const betterRollup = require('gulp-better-rollup')
    const sourcemaps = require('gulp-sourcemaps')
    return gulp.src([`${global.CONFIG.src}/assets/js/*.js`, `${global.CONFIG.src}/assets/js/views/**/*.js`], {
      base: `${global.CONFIG.src}/assets/js/`
    })
      .pipe(using(global.CONFIG.using))
      .pipe(plumber())
      .pipe(gIf(!argv.production, sourcemaps.init({})))
      .pipe(betterRollup({
        plugins: rollupPlugins
      }, {
        format: 'cjs',
        useStrict: true
      }))
      .pipe(gIf(!argv.production, sourcemaps.write('.', {
        mapSources: (mapFilePath) => {
          return mapFilePath.replace(global.CONFIG.src, '').replace('node_modules/', '/node_modules/')
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/js/`))
      .pipe(touch())
  })
}

