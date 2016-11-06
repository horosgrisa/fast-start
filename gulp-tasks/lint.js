'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  require('./lint/css')(gulp)
  require('./lint/js')(gulp)
  require('./lint/json')(gulp)
  require('./lint/pug')(gulp)
  require('./lint/html')(gulp)
}
