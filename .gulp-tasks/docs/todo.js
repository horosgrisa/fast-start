module.exports = (gulp, $, argv) => {
  gulp.task('docs:todo', () => {
    const fs = require('fs')
    return gulp.src([`${global.CONFIG.src}/**/*.{css,js,html,pug}`].concat(global.CONFIG.exclude))
      .pipe($.todo({}))
      .pipe($.remark().use(require('remark-html')))
      .pipe($.insert.prepend([
        '<style>',
        fs.readFileSync('./node_modules/markdown-splendor/css/splendor.min.css', 'utf8'),
        '</style>'
      ].join('\n')))
      .pipe($.rename((path) => {
        path.extname = '.html'
      }))
      .pipe(gulp.dest(`${global.CONFIG.src}/docs/`))
  })
}
