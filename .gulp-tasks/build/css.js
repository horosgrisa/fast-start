'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('build:css', (done) => {
    return gulp.src([`${global.CONFIG.src}/assets/css/**/*.css`, `!${global.CONFIG.src}/assets/css/**/_*.css`], {
      base: `${global.CONFIG.src}/assets/css/`
    })
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/css/`)))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init()))
      .pipe($.postcss(global.CONFIG.postcssPlugins))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: function (mapFilePath) {
          return `/assets/css/${mapFilePath}`
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/css/`))
      .pipe($.touch())
  })
  gulp.task('build:css:all', (done) => {
    return gulp.src([`${global.CONFIG.src}/assets/css/**/*.css`, `${global.CONFIG.src}/assets/css/**/_*.css`], {
      base: `${global.CONFIG.src}/assets/css/`
    })
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init()))
      .pipe($.postcss(global.CONFIG.postcssPlugins))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: function (mapFilePath) {
          return `/assets/css/${mapFilePath}`
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/css/`))
      .pipe($.touch())
  })
}
