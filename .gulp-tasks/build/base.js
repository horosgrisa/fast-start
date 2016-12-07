module.exports = (gulp, $, argv) => {
  gulp.task('build:base', (done) => gulp.src([
    `${global.CONFIG.src}/**`,
    `!${global.CONFIG.src}/views/**`,
    `!${global.CONFIG.src}/views`,
    `!${global.CONFIG.src}/assets/**`,
    `!${global.CONFIG.src}/assets`
  ].concat(global.CONFIG.exclude))
    .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/`)))
    .pipe($.using(global.CONFIG.using))
    .pipe($.plumber())
    .pipe(gulp.dest(global.CONFIG.dist))
    .pipe($.touch()))
}
