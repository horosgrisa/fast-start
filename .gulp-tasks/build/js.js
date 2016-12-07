module.exports = (gulp, $, argv) => {
  gulp.task('build:js', (done) => gulp.src(`${global.CONFIG.src}/assets/*.{js,jsx,es6,babel}`)
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/`, {
        hasChanged: $.changedEnhancements.compareLastModifiedTimeJSDeps,
        extension: '.js'
      })))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init({})))
      .pipe($.betterRollup({
        plugins: global.CONFIG.rollupPlugins
      }, {
        format: 'iife',
        useStrict: true
      }))
      .pipe($.rename((path) => { path.extname = '.js' }))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: (mapFilePath) => mapFilePath.replace(
          global.CONFIG.src, ''
         ).replace('node_modules/', '/node_modules/')
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touch()))
}

