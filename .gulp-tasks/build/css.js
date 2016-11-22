'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('build:css', (done) => {
    const argv = require('yargs').argv
    const changed = require('gulp-changed')
    const postcss = require('gulp-postcss')
    const sourcemaps = require('gulp-sourcemaps')
    let postcssPlugins = [
      require('postcss-color-short'),
      require('postcss-clearfix'),
      require('precss')(),
      require('postcss-cssnext')()
    ]
    argv.production && postcssPlugins.concat(require('cssnano')())
    return gulp.src([`${global.CONFIG.src}/assets/css/*.css`, `${global.CONFIG.src}/assets/css/views/**/*.css`], {
      base: `${global.CONFIG.src}/assets/css/`
    })
      .pipe(gIf(!argv.all, changed(`${global.CONFIG.dist}/public/css/`)))
      .pipe(using(global.CONFIG.using))
      .pipe(plumber())
      .pipe(gIf(!argv.production, sourcemaps.init()))
      .pipe(postcss(postcssPlugins))
      .pipe(gIf(!argv.production, sourcemaps.write('.', {
        mapSources: function (mapFilePath) {
          return `/assets/css/${mapFilePath}`
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/css/`))
      .pipe(touch())
  })
  gulp.task('build:css:all', (done) => {
    const argv = require('yargs').argv
    const postcss = require('gulp-postcss')
    const sourcemaps = require('gulp-sourcemaps')
    let postcssPlugins = [
      require('postcss-color-short'),
      require('postcss-clearfix'),
      require('precss')(),
      require('postcss-cssnext')()
    ]
    argv.production && postcssPlugins.concat(require('cssnano')())
    argv.production && postcssPlugins.concat(require('cssnano')())
    return gulp.src([`${global.CONFIG.src}/assets/css/*.css`, `${global.CONFIG.src}/assets/css/views/**/*.css`], {
      base: `${global.CONFIG.src}/assets/css/`
    })
      .pipe(using(global.CONFIG.using))
      .pipe(plumber())
      .pipe(gIf(!argv.production, sourcemaps.init()))
      .pipe(postcss(postcssPlugins))
      .pipe(gIf(!argv.production, sourcemaps.write('.', {
        mapSources: function (mapFilePath) {
          return `/assets/css/${mapFilePath}`
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/css/`))
      .pipe(touch())
  })
}
