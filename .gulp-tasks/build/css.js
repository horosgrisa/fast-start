'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('build:css', (done) => {
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
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/css/`)))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init()))
      .pipe($.postcss(postcssPlugins))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: function (mapFilePath) {
          return `/assets/css/${mapFilePath}`
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/css/`))
      .pipe($.touch())
  })
  gulp.task('build:css:all', (done) => {
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
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init()))
      .pipe($.postcss(postcssPlugins))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: function (mapFilePath) {
          return `/assets/css/${mapFilePath}`
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/css/`))
      .pipe($.touch())
  })
}
