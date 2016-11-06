'use strict'
const $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  require('./build/base')(gulp)
  require('./build/css')(gulp)
  require('./build/fonts')(gulp)
  require('./build/img')(gulp)
  require('./build/js')(gulp)
  require('./build/pug')(gulp)
  require('./build/html')(gulp)
  require('./build/njk')(gulp)
}

