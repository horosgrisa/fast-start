'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('lint:todo', () => {
    const todo = require('gulp-todo')
    let todos = ''
    return gulp.src([`${global.CONFIG.src}/**/*.{css,js,pug,html,njk}`].concat(global.CONFIG.exclude))
      .pipe(todo({
        reporter: 'table'
      }))
      .on('data', (data) => {
        todos += data._contents.toString()
      })
      .on('end', function () {
        console.log(todos)
      })
  })
}
