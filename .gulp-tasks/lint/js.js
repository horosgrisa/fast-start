module.exports = () => {
  global.gulp.task('lint:js', () =>
    gulp
      .src([`${global.CONFIG.src}/**/*.{js,jsx}`], {
        base: global.CONFIG.src,
      })
         .pipe(
        $.using({
          ...global.CONFIG.using,
          ...{
            color: 'red',
            prefix: 'Deploy',
            filesize: true,
          },
        }),
      )
      .pipe($.eslint())
      .pipe($.eslint.format('node_modules/eslint-formatter-pretty')),
  );
};
