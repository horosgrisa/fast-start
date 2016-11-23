'use strict'
module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('lint:todo', () => {
    const todo = require('gulp-todo')
    let todos = ''
    return gulp.src([`${global.CONFIG.src}/**/*.{css,js,pug,html,njk}`].concat(global.CONFIG.exclude), {
      base: `${global.CONFIG.src}/../`
    })
      .pipe(todo({
        reporter: 'table'
      }))
      .on('data', (data) => {
        todos += data._contents.toString()
      })
      .on('end', function () {
        todos.indexOf('No todos/fixmes found') === -1 && console.log(todos)
      })
  })
}
