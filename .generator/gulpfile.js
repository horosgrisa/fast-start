'use strict'

const gulp = require('gulp')

gulp.task('prepublish', done => {
  done()
})

gulp.task('default', gulp.parallel('prepublish'))
