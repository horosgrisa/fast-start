module.exports = (gulp, $, argv) => {
  gulp.task('lint:todo', () => {
    let todos = ''
    return gulp.src([`${global.CONFIG.src}/**/*.{css,js,pug,html}`].concat(global.CONFIG.exclude), {
      base: `${global.CONFIG.src}/../`
    })
      .pipe($.todo({
        reporter: 'table'
      }))
      .on('data', (data) => {
        todos += data._contents.toString()
      })
      .on('end', () => todos.indexOf('No todos/fixmes found') < 0 && console.log(todos))
  })
}
