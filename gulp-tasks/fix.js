'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  require('./fix/css')(gulp)
  require('./fix/js')(gulp)
  require('./fix/json')(gulp)
  require('./fix/html')(gulp)
}
