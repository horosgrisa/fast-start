'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('fix:json', () => {
    return gulp.src([`${global.CONFIG.src}/**/*.json`].concat(global.CONFIG.exclude))
    .pipe($.using(Object.assign(global.CONFIG.using, {
      color: 'yellow',
      prefix: 'Fixed'
    })))
    .pipe($.plumber())
    .pipe($.eslint({
      fix: true
    }))
    .pipe(gulp.dest(`${global.CONFIG.src}/`))
  })
}
