module.exports = () => {
  global.gulp.task('build:css', done =>
    gulp
      .src(`${global.CONFIG.src}/public/*.css`)
      .pipe(
        $.if(
          !global.argv.all,
          $.changed(`${global.CONFIG.dist}/public/`, {
            hasChanged: $.changedEnhancements.compareLastModifiedTimeCSSDeps,
          }),
        ),
      )
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(process.env.NODE_ENV !== 'production', $.sourcemaps.init()))
      .pipe($.postcss(global.CONFIG.postcss.plugins))
      .pipe(
        $.if(
          process.env.NODE_ENV !== 'production',
          $.sourcemaps.write('.', {
            mapSources: mapFilePath => `/public/${mapFilePath}`,
          }),
        ),
      )
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touchCmd()),
  );
};
