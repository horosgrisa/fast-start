'use strict'

module.exports = function (gulp, $, argv) {
  require('./server/run')(gulp, $, argv)
  require('./server/bs')(gulp, $, argv)
}
