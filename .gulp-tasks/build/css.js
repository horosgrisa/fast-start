module.exports = () => {
  gulp.task('build:css', (done) => gulp.src(`${global.CONFIG.src}/assets/*.css`)
    .pipe($.if(!global.argv.all, $.changed(`${global.CONFIG.dist}/public/`, {
      hasChanged: $.changedEnhancements.compareLastModifiedTimeCSSDeps
    })))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe($.if(!process.env.NODE_ENV==='production', $.sourcemaps.init()))
    .pipe($.postcss(global.CONFIG.postcssPlugins))
    .pipe($.if(!process.env.NODE_ENV==='production', $.sourcemaps.write('.', {
      mapSources (mapFilePath) {
        return `/assets/${mapFilePath}`
      }
    })))
    .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
    .pipe($.touchCmd())
  )
}
