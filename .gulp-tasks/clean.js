module.exports = (gulp, $, argv) => {
  gulp.task('clean:files', (done) => gulp.src([
    `${global.CONFIG.dist}/**`
  ], { read: false })
    .pipe($.ignore('node_modules/**'))
    .pipe($.rimraf()))
}
