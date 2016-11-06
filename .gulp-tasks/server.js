'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  require('./server/run')(gulp)
  require('./server/bs')(gulp)
}
