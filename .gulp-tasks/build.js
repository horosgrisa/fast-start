'use strict'

module.exports = function (gulp, $, argv) {
  require('./build/base')(gulp, $, argv)
  require('./build/css')(gulp, $, argv)
  require('./build/fonts')(gulp, $, argv)
  require('./build/img')(gulp, $, argv)
  require('./build/js')(gulp, $, argv)
  require('./build/pug')(gulp, $, argv)
  require('./build/html')(gulp, $, argv)
  require('./build/njk')(gulp, $, argv)
}

