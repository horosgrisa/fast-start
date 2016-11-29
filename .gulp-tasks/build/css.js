'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('build:css', (done) => {
    return gulp.src([`${global.CONFIG.src}/assets/**/*.css`, `!${global.CONFIG.src}/assets/**/_*.css`], {
      base: `${global.CONFIG.src}/assets/`
    })
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/`)))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init()))
      .pipe($.postcss(global.CONFIG.postcssPlugins))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: function (mapFilePath) {
          return `/assets/${mapFilePath}`
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touch())
  })
  gulp.task('build:css:all', (done) => {
    return gulp.src([`${global.CONFIG.src}/assets/**/*.css`], {
      base: `${global.CONFIG.src}/assets/`
    })
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init()))
      .pipe($.postcss(global.CONFIG.postcssPlugins))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: function (mapFilePath) {
          return `/assets/${mapFilePath}`
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touch())
  })
}
