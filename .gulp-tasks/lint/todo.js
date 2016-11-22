'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('lint:todo', () => {
    const todo = require('gulp-todo')
    const print = require('gulp-print')
    return gulp.src([`${global.CONFIG.src}/**/*.{css,js,pug,html,njk}`].concat(global.CONFIG.exclude))
      .pipe(todo({reporter: 'raw'}))
      .pipe(print())
  })
}
