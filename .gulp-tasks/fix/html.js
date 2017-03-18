module.exports = () => {
  global.gulp.task('fix:html', () => gulp.src([`${global.CONFIG.src}/**/*.{html,njk}`])
    .pipe($.using(Object.assign(global.CONFIG.using, {
      color: 'yellow',
      prefix: 'Fixed'
    })))
    .pipe($.plumber())
    .pipe($.posthtml([require('posthtml-tidy')({
      indent: 'auto',
      'indent-spaces': 2,
      quiet: 'yes',
      'tidy-mark': 'no'
    })]))
    .pipe(gulp.dest(`${global.CONFIG.src}/`)))
}
