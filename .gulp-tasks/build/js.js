const browserify = require('browserify')
const buffer = require('vinyl-buffer')

module.exports = () => {
  global.gulp.task('build:js', (done) => gulp.src(`${global.CONFIG.src}/assets/*.{js,jsx,es6,babel}`)
      .pipe($.if(!global.argv.all, $.changed(`${global.CONFIG.dist}/public/`, {
        hasChanged: $.changedEnhancements.compareLastModifiedTimeJSDeps,
        extension: '.js'
      })))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.tap((file) => {
        file.contents = browserify(file.path, {
          buffer: true,
          extensions: ['.jsx'],
          debug: process.env.NODE_ENV !== 'production'
        })
        .transform('babelify')
        .transform('aliasify', {
          aliases: {
          }
        })
        .transform('envify')
        .plugin(require('babelify-external-helpers'))
        .bundle()
      }))
      .pipe(buffer())
      .pipe($.if(process.env.NODE_ENV === 'production', $.uglify()))
      .pipe($.if(process.env.NODE_ENV !== 'production', $.sourcemaps.init({loadMaps: true})))
      .pipe($.rename((path) => { path.extname = '.js' }))
      .pipe($.if(process.env.NODE_ENV !== 'production', $.sourcemaps.write('./', {
        mapSources: (sourcePath, file) => `${sourcePath.replace(global.CONFIG.src, '')}`
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touchCmd())
    )
}
