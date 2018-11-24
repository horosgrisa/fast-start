module.exports = () => {
  global.gulp.task('build:public', done =>
    gulp
      .src([
        `${global.CONFIG.src}/public/**`,
        `!${global.CONFIG.src}/public/**/*.{js,jsx,css,png,jpg,jpeg,gif}`,
      ])
      .pipe($.if(!global.argv.all, $.changed(`${global.CONFIG.dist}/public/`)))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touchCmd()),
  );
};
