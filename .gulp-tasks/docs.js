'use strict'

module.exports = function (gulp, $, argv) {
  require('./docs/todo')(gulp, $, argv)
  require('./docs/readme')(gulp, $, argv)
  // require('./docs/jsdoc')(gulp, $, argv)
}

