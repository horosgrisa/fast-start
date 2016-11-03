'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  require('./lint/backend')(gulp)
  require('./lint/css')(gulp)
  require('./lint/js')(gulp)
  require('./lint/views')(gulp)
}
