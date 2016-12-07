module.exports = (gulp, $, argv) => {
  gulp.task('build:css', (done) => gulp.src(`${global.CONFIG.src}/assets/*.css`)
    .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/`, {
      hasChanged: $.changedEnhancements.compareLastModifiedTimeCSSDeps
    })))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe($.if(!argv.production, $.sourcemaps.init()))
    .pipe($.postcss(global.CONFIG.postcssPlugins))
    .pipe($.if(!argv.production, $.sourcemaps.write('.', {
      mapSources (mapFilePath) {
        return `/assets/${mapFilePath}`
      }
    })))
    .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
    .pipe($.touch()))
}
