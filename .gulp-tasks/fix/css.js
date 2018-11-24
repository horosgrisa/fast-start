module.exports = () => {
  global.gulp.task('fix:css', () =>
    gulp
      .src([`${global.CONFIG.src}/**/*.css`])
      .pipe(
        $.using({
          ...global.CONFIG.using,
          ...{
            color: 'yellow',
            prefix: 'Fixed',
          },
        }),
      )
      .pipe($.plumber())
      .pipe(
        $.postcss([
          require('stylelint')({
            fix: true,
          }),
        ]),
      )
      .pipe(gulp.dest(global.CONFIG.src)),
  );
};
