'use strict'

module.exports = function (gulp, $, argv) {
  gulp.task('docs:readme', () => {
    const fs = require('fs')
    return gulp.src(`${global.CONFIG.src}/README.md`)
      .pipe($.remark()
        .use(require('remark-emoji'))
        .use(require('remark-highlight.js'))
        .use(require('remark-slug'))
        .use(require('remark-autolink-headings'))
        .use(require('remark-html'))
      )
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
