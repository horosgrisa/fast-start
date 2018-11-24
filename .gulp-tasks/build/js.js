const browserify = require('browserify');
const buffer = require('vinyl-buffer');

module.exports = () => {
  global.gulp.task('build:js', () =>
    gulp
      .src(`${global.CONFIG.src}/public/*.{js,jsx}`)
      .pipe(
        $.if(
          !global.argv.all,
          $.changed(`${global.CONFIG.dist}/public/`, {
            hasChanged: $.changedEnhancements.compareLastModifiedTimeJSDeps,
            extension: '.js',
          }),
        ),
      )
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe(
        $.tap(file => {
          file.contents = browserify(file.path, {
            buffer: true,
            extensions: ['.jsx'],
            debug: process.env.NODE_ENV !== 'production',
          })
            .transform('babelify')
            .transform('envify')
            .bundle();
        }),
      )
      .pipe(buffer())
      .pipe($.if(process.env.NODE_ENV !== 'production', $.sourcemaps.init({ loadMaps: true })))
      .pipe(
        $.rename(path => {
          path.extname = '.js';
        }),
      )
      .pipe(
        $.if(
          process.env.NODE_ENV !== 'production',
          $.sourcemaps.write('./', {
            mapSources: (sourcePath, file) => sourcePath.replace(global.CONFIG.src, ''),
          }),
        ),
      )
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touchCmd()),
  );
};
