'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  require('./fix/backend')(gulp)
  require('./fix/css')(gulp)
  require('./fix/js')(gulp)
  require('./fix/views')(gulp)
}
