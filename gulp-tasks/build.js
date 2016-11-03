'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  require('./build/backend')(gulp)
  require('./build/configs')(gulp)
  require('./build/css')(gulp)
  require('./build/fonts')(gulp)
  require('./build/img')(gulp)
  require('./build/js')(gulp)
  require('./build/views')(gulp)
}
