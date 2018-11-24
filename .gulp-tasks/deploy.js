module.exports = () => {
  global.gulp.task('deploy:rsync', () =>
    gulp
      .src([`${global.CONFIG.src}/../dist/**`])
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
      .pipe($.rsync(global.CONFIG.deploy)),
  );
};
